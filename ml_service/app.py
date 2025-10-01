from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
from pydantic import BaseModel
import os 
import os
import joblib



# Always resolve path relative to app.py location (ml_service/)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

approval_pipeline = joblib.load(os.path.join(BASE_DIR, "approval_pipeline.pkl"))
strategy_pipeline = joblib.load(os.path.join(BASE_DIR, "strategy_pipeline.pkl"))


# ========= Import from approval.py (all) =========
from .approval import (
    rule_based_predict,
    enrich_features as enrich_approval,   # <- alias to avoid name clash
    inspect_applicant_row,
    predict_applicant
)

# ========= Import from strategy.py (all) =========
from .strategy import (
    check_feasibility,
    apply_preferences,
    score_strategies,
    recommend_strategy,
    rule_based_recommend,
    build_strategy_reasons,
    build_rate_reasons,
    enrich_features as enrich_strategy,   # <- alias to avoid name clash
    StrategyPipelineWrapper,
    predict_applicant_with_rules
)

# =====================================================
# Applicant schema
# =====================================================
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
    steady_payment: int = 1   # default to steady unless UI provides it


# =====================================================
# Helpers
# =====================================================
def _safe_classes_from_pipeline(pipeline):
    # Try final estimator in the pipeline first
    try:
        for name, step in reversed(pipeline.named_steps.items()):
            if hasattr(step, "classes_"):
                return list(step.classes_)
    except Exception:
        pass
    # Fallback: sometimes set directly on pipeline (rare)
    return getattr(pipeline, "classes_", None)


def _safe_feature_names_from_pipeline(pipeline):
    # 1) scikit >=1.0 often provides feature_names_in_
    names = getattr(pipeline, "feature_names_in_", None)
    if names is not None:
        return list(names)
    # 2) common: preprocessor step exposes get_feature_names_out()
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

# Wrapper for strategy (uses the robustly extracted metadata)
wrapper = StrategyPipelineWrapper(
    pipeline=strategy_pipeline,
    classes=_strategy_classes,
    X_train_columns=_strategy_feature_names,
    encoders=None,
    label_encoder=None
)

# =====================================================
# FastAPI app
# =====================================================
app = FastAPI(title="Mortgage Copilot API", version="1.0.0")

# CORS (tune origins for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # replace with your frontend origin(s) in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "FastAPI is running 🚀"}

import traceback

# =====================================================
# Routes (2 total: Approval + Strategy) with debugging
# =====================================================

# 1) Approval Decision (Approval + Fixed/Variable)
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
            "details": str(e)
        }

    # Build user-facing sentence
    if result["decision"] == "PASS":
        message = f"Approved mortgage. Chosen rate: {result['rate_type']}." + _reasons_text(result.get("approval_reasons", []))
    else:
        message = "Not approved for a mortgage." + _reasons_text(result.get("approval_reasons", []))

    # Return message + full result dict
    return {
        "message": message,
        "decision": result["decision"],
        "approval_probability": result["approval_probability"],
        "rate_type": result["rate_type"],
        "approval_reasons": result["approval_reasons"],
        "rate_reasons": result["rate_reasons"]
    }


# 2) Strategy Decision (Best Strategy)
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
            "details": str(e)
        }

    # Build user-facing sentence
    message = f"Best strategy: {result['strategy']}." + _reasons_text(result.get("reasons", []))

    # Return message + full result dict
    return {
        "message": message,
        "strategy": result["strategy"],
        "rate_type": result["rate_type"],
        "adjusted_probabilities": result["adjusted_probabilities"],
        "feasibility": result["feasibility"],
        "preferences": result["preferences"],
        "rate_reasons": result["rate_reasons"],
        "reasons": result["reasons"]
    }




# Optional: run via `python app.py` during local dev
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
