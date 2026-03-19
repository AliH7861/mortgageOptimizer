import os
import traceback

import joblib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


BASE_DIR = os.path.dirname(os.path.abspath(__file__))

approval_pipeline = joblib.load(os.path.join(BASE_DIR, "approval_pipeline.pkl"))
strategy_pipeline = joblib.load(os.path.join(BASE_DIR, "strategy_pipeline.pkl"))

try:
    from .approval import predict_applicant
    from .strategy import StrategyPipelineWrapper
except ImportError:
    # Support running from either the repo root or the ml_service directory.
    from approval import predict_applicant
    from strategy import StrategyPipelineWrapper


class Applicant(BaseModel):
    age: int
    employment_type: str
    employment_years: int
    income_monthly: float
    credit_score: int
    property_value: float
    mortgage_balance: float
    amortization_remaining: int
    monthly_payment_current: float
    expenses_monthly: float
    debt_payments_monthly: float
    interest_rate_current: float
    rate_type: str
    pref_low_payment: float
    pref_flexibility: float
    pref_stability: float
    pref_fast_payoff: float
    pref_equity_growth: float
    pref_risk_tolerance: float
    steady_payment: int = 1


def _safe_classes_from_pipeline(pipeline):
    try:
        for _, step in reversed(pipeline.named_steps.items()):
            if hasattr(step, "classes_"):
                return list(step.classes_)
    except Exception:
        pass
    return getattr(pipeline, "classes_", None)


def _safe_feature_names_from_pipeline(pipeline):
    names = getattr(pipeline, "feature_names_in_", None)
    if names is not None:
        return list(names)
    try:
        return list(pipeline.named_steps["preprocess"].get_feature_names_out())
    except Exception:
        return None


def _reasons_text(reasons):
    if not reasons:
        return ""
    return f" Reasons: {', '.join(reasons)}"


_strategy_classes = _safe_classes_from_pipeline(strategy_pipeline)
_strategy_feature_names = _safe_feature_names_from_pipeline(strategy_pipeline)

if _strategy_classes is None:
    raise RuntimeError(
        "Could not infer strategy classes from the pipeline. "
        "Ensure the final estimator has .classes_ or pass classes explicitly."
    )
if _strategy_feature_names is None:
    raise RuntimeError(
        "Could not infer feature names for the strategy pipeline. "
        "Ensure there is a 'preprocess' step with get_feature_names_out() "
        "or the pipeline exposes feature_names_in_."
    )


wrapper = StrategyPipelineWrapper(
    pipeline=strategy_pipeline,
    classes=_strategy_classes,
    X_train_columns=_strategy_feature_names,
    encoders=None,
    label_encoder=None,
)


app = FastAPI(title="Mortgage Copilot API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("FASTAPI_CORS_ORIGINS", "*").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"status": "FastAPI is running"}


@app.post("/predict/approval")
def approval(applicant: Applicant):
    data = applicant.dict()
    print("DEBUG /predict/approval - Incoming data:", data)

    try:
        result = predict_applicant(data, approval_pipeline)
        print("DEBUG /predict/approval - Prediction result:", result)
    except Exception as e:
        print("ERROR in /predict/approval:", str(e))
        traceback.print_exc()
        return {
            "error": "Prediction failed",
            "details": str(e),
        }

    if result["decision"] == "PASS":
        message = (
            f"Approved mortgage. Chosen rate: {result['rate_type']}."
            + _reasons_text(result.get("approval_reasons", []))
        )
    else:
        message = "Not approved for a mortgage." + _reasons_text(
            result.get("approval_reasons", [])
        )

    return {
        "message": message,
        "decision": result["decision"],
        "approval_probability": result["approval_probability"],
        "rate_type": result["rate_type"],
        "approval_reasons": result["approval_reasons"],
        "rate_reasons": result["rate_reasons"],
    }


@app.post("/predict/strategy")
def strategy(applicant: Applicant):
    data = applicant.dict()
    print("DEBUG /predict/strategy - Incoming data:", data)

    try:
        result = wrapper.predict_with_rules(data)
        print("DEBUG /predict/strategy - Prediction result:", result)
    except Exception as e:
        print("ERROR in /predict/strategy:", str(e))
        traceback.print_exc()
        return {
            "error": "Prediction failed",
            "details": str(e),
        }

    message = f"Best strategy: {result['strategy']}." + _reasons_text(
        result.get("reasons", [])
    )

    return {
        "message": message,
        "strategy": result["strategy"],
        "rate_type": result["rate_type"],
        "adjusted_probabilities": result["adjusted_probabilities"],
        "feasibility": result["feasibility"],
        "preferences": result["preferences"],
        "rate_reasons": result["rate_reasons"],
        "reasons": result["reasons"],
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", "8000")), reload=True)
