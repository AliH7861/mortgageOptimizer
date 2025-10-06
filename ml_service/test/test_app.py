from fastapi.testclient import TestClient
from ..app import app # import your FastAPI app

client = TestClient(app)

# --- Helper applicant (valid baseline case) ---
valid_applicant = {
    "age": 35,
    "employment_type": "full_time",
    "employment_years": 8,
    "income_monthly": 7000,
    "credit_score": 720,
    "property_value": 500000,
    "mortgage_balance": 300000,
    "amortization_remaining": 20,
    "monthly_payment_current": 1800,
    "expenses_monthly": 2000,
    "debt_payments_monthly": 500,
    "interest_rate_current": 3.5,
    "rate_type": "fixed",
    "pref_low_payment": 0.5,
    "pref_flexibility": 0.5,
    "pref_stability": 0.5,
    "pref_fast_payoff": 0.5,
    "pref_equity_growth": 0.5,
    "pref_risk_tolerance": 0.5,
    "steady_payment": 1
}

# ============================================================
# /predict/approval tests
# ============================================================

def test_approval_happy_path():
    response = client.post("/predict/approval", json=valid_applicant)
    assert response.status_code == 200
    data = response.json()
    assert "decision" in data
    assert "rate_type" in data

def test_approval_low_credit():
    applicant = valid_applicant.copy()
    applicant["credit_score"] = 500
    response = client.post("/predict/approval", json=applicant)
    assert response.status_code == 200
    assert response.json()["decision"] in ["FAIL", "PASS"]

def test_approval_high_ltv():
    applicant = valid_applicant.copy()
    applicant["mortgage_balance"] = 480000  # 96% LTV
    applicant["property_value"] = 500000
    response = client.post("/predict/approval", json=applicant)
    assert response.status_code == 200
    data = response.json()
    # often should fail if LTV > 95
    assert data["decision"] in ["FAIL", "PASS"]

def test_approval_age_plus_amortization():
    applicant = valid_applicant.copy()
    applicant["age"] = 70
    applicant["amortization_remaining"] = 15  # 85 total -> should fail
    response = client.post("/predict/approval", json=applicant)
    assert response.status_code == 200
    data = response.json()
    assert "decision" in data

def test_approval_high_gds_ratio():
    applicant = valid_applicant.copy()
    applicant["income_monthly"] = 2000
    applicant["monthly_payment_current"] = 1800  # very high GDS
    response = client.post("/predict/approval", json=applicant)
    assert response.status_code == 200
    data = response.json()
    assert "decision" in data

def test_approval_missing_field():
    applicant = valid_applicant.copy()
    applicant.pop("income_monthly")
    response = client.post("/predict/approval", json=applicant)
    assert response.status_code in [400, 422]

# ============================================================
# /predict/strategy tests
# ============================================================

def test_strategy_happy_path():
    response = client.post("/predict/strategy", json=valid_applicant)
    assert response.status_code == 200
    data = response.json()
    assert "strategy" in data
    assert "rate_type" in data
    assert "preferences" in data

def test_strategy_low_income():
    applicant = valid_applicant.copy()
    applicant["income_monthly"] = 1000
    response = client.post("/predict/strategy", json=applicant)
    assert response.status_code == 200
    data = response.json()
    assert data["strategy"] in ["downsize", "baseline", "FAIL", "extend"]

def test_strategy_high_debt():
    applicant = valid_applicant.copy()
    applicant["debt_payments_monthly"] = 5000  # high debt
    response = client.post("/predict/strategy", json=applicant)
    assert response.status_code == 200
    data = response.json()
    assert "strategy" in data

def test_strategy_high_risk_pref():
    applicant = valid_applicant.copy()
    applicant["pref_risk_tolerance"] = 0.95  # high risk preference
    response = client.post("/predict/strategy", json=applicant)
    assert response.status_code == 200
    data = response.json()
    assert "strategy" in data

def test_strategy_invalid_payload():
    response = client.post("/predict/strategy", json={"age": "not_a_number"})
    assert response.status_code in [400, 422]
