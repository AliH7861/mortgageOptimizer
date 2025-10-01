# approval.py
import pandas as pd

# --- Rules engine: approval + rate recommendation (no ML args) ---
def rule_based_predict(case):
    """
    Underwriting rules (approval + rate type).
    Preferences can override if feasible.
    """
    # === Hard Fail Rules ===
    if case["credit_score"] < 600:
        return "FAIL", 0.0, ["Credit score below 600"], "N/A", []
    if case["loan_to_value"] > 0.95:
        return "FAIL", 0.0, ["Loan-to-Value exceeds 95%"], "N/A", []
    if case["age_plus_amort"] > 80:
        return "FAIL", 0.0, ["Age plus amortization exceeds 80"], "N/A", []
    if case["gds_ratio"] > 0.5:
        return "FAIL", 0.0, ["GDS ratio above 50%"], "N/A", []
    if case["tds_ratio"] > 0.65:
        return "FAIL", 0.0, ["TDS ratio above 65%"], "N/A", []
    if case["income_monthly"] <= 0:
        return "FAIL", 0.0, ["No income reported"], "N/A", []

    # === Approval Reasons ===
    reasons = []
    if case["credit_score"] >= 700: reasons.append("Good credit score")
    if case["loan_to_value"] < 0.8: reasons.append("Healthy loan-to-value ratio")
    if case["gds_ratio"] < 0.35:   reasons.append("Affordable GDS ratio")
    if case["tds_ratio"] < 0.45:   reasons.append("Sustainable TDS ratio")
    if case["equity"] > 100000:    reasons.append("Strong equity position")
    if not reasons: reasons.append("Meets minimum approval requirements")

    # === Preference Overrides ===
    if case.get("pref_stability", 0) >= 0.7:
        return "PASS", 0.95, reasons[:5], "Fixed", ["High stability preference → Fixed chosen"]

    if max(case.get("pref_flexibility", 0), case.get("pref_risk_tolerance", 0)) >= 0.7:
        if case["surplus_share"] > 0.1 and case.get("steady_payment", 0) == 1:
            return "PASS", 0.95, reasons[:5], "Variable", ["High flexibility/risk preference → Variable chosen"]

    # === Weighted Scoring (fallback logic) ===
    fixed_score, variable_score = 0, 0
    fixed_reasons, variable_reasons = [], []

    # Medium-weight preferences
    fixed_score    += case.get("pref_stability", 0) * 15
    variable_score += (case.get("pref_flexibility", 0) + case.get("pref_risk_tolerance", 0)) * 12

    # Budget / surplus
    if case["surplus_share"] > 0.2:
        variable_score += 10
        variable_reasons.append("Surplus income supports handling variable spikes")
    else:
        fixed_score += 8
        fixed_reasons.append("Tighter budget favors fixed stability")

    # Debt stress
    if case["gds_ratio"] > 0.4 or case["tds_ratio"] > 0.55:
        fixed_score += 7
        fixed_reasons.append("High debt ratios suggest fixed for predictability")

    # Employment stability
    if str(case.get("employment_type", "")).lower() in ["full_time", "permanent"] and case.get("steady_payment", 0) == 1:
        variable_score += 6
        variable_reasons.append("Stable job and steady payments support variable")
    else:
        fixed_score += 5
        fixed_reasons.append("Uncertain income favors fixed for safety")

    # Equity cushion
    if case["equity"] > 150000:
        variable_score += 5
        variable_reasons.append("Strong equity cushion allows variable option")

    # Age + amortization
    if case["age_plus_amort"] > 65:
        fixed_score += 6
        fixed_reasons.append("Older borrower profile prefers fixed stability")

    # === Decide Rate Type ===
    if fixed_score >= variable_score:
        rate_type, rate_reasons = "Fixed", fixed_reasons
    else:
        rate_type, rate_reasons = "Variable", variable_reasons

    # === Dynamic Approval Probability ===
    diff = abs(fixed_score - variable_score)
    if diff >= 15: base_conf = 0.9
    elif diff >= 8: base_conf = 0.8
    else: base_conf = 0.7

    alignment_bonus = 0
    if rate_type == "Fixed" and case.get("pref_stability", 0) >= 0.7: alignment_bonus = 0.05
    elif rate_type == "Variable" and max(case.get("pref_flexibility", 0), case.get("pref_risk_tolerance", 0)) >= 0.7: alignment_bonus = 0.05

    conflict_penalty = 0
    if rate_type == "Fixed" and max(case.get("pref_flexibility", 0), case.get("pref_risk_tolerance", 0)) >= 0.7: conflict_penalty = 0.1
    elif rate_type == "Variable" and case.get("pref_stability", 0) >= 0.7: conflict_penalty = 0.1

    conf = min(0.99, max(0.6, base_conf + alignment_bonus - conflict_penalty))

    return "PASS", conf, reasons[:5], rate_type, rate_reasons[:3]


# --- Feature Engineering ---
def enrich_features(applicant_raw: dict) -> dict:
    applicant = applicant_raw.copy()

    applicant["loan_to_value"] = applicant["mortgage_balance"] / max(applicant["property_value"], 1)
    applicant["equity"] = applicant["property_value"] - applicant["mortgage_balance"]
    applicant["gds_ratio"] = applicant["monthly_payment_current"] / max(applicant["income_monthly"], 1)
    applicant["tds_ratio"] = (
        applicant["monthly_payment_current"] + applicant["debt_payments_monthly"]
    ) / max(applicant["income_monthly"], 1)
    applicant["age_plus_amort"] = applicant["age"] + applicant["amortization_remaining"]

    surplus = applicant["income_monthly"] - (
        applicant["monthly_payment_current"]
        + applicant["expenses_monthly"]
        + applicant["debt_payments_monthly"]
    )
    applicant["surplus_share"] = surplus / max(applicant["income_monthly"], 1)

    return applicant


# --- Debugging Helper ---
def inspect_applicant_row(applicant_raw, pipeline=None):
    applicant = enrich_features(applicant_raw)
    row = pd.DataFrame([applicant])
    
    print("=== Applicant Features ===")
    for k, v in applicant.items():
        print(f"{k:25} {v}")
    
    if pipeline is not None:
        pred = pipeline.predict(row)[0]
        prob = pipeline.predict_proba(row)[0]
        print("\n=== Model Prediction ===")
        print(f"Predicted class: {pred}")
        print(f"Probabilities: {dict(zip(pipeline.classes_, prob))}")
    
    return row


# --- Main Entry ---
def predict_applicant(applicant_raw, pipeline=None):
    applicant = enrich_features(applicant_raw)

    # Optional ML probability
    model_prob = None
    if pipeline is not None:
        try:
            row = pd.DataFrame([applicant])
            model_prob = float(pipeline.predict_proba(row)[:, 1][0])
        except Exception:
            model_prob = None

    # Apply rules
    decision, rules_prob, reasons, rate_type, rate_reasons = rule_based_predict(applicant)

    # Choose probability
    prob = model_prob if model_prob is not None else rules_prob
    if decision == "FAIL":
        prob = 0.0

    return {
        "decision": decision,
        "approval_probability": float(round(prob, 3)),
        "rate_type": rate_type,
        "approval_reasons": reasons,
        "rate_reasons": rate_reasons
    }
