from __future__ import annotations
import numpy as np
import pandas as pd


#Feasibility Checks 
def check_feasibility(case: dict) -> dict:
    """
    Return feasibility booleans for each strategy based on *hard* constraints.
    Preferences and soft effects are handled later.
    """
    eq      = case.get("equity", 0.0)
    bal     = case.get("mortgage_balance", 0.0)
    inc     = case.get("income_monthly", 0.0)
    age     = case.get("age", 0)
    savings = case.get("savings_available", 0.0)

    dti = case.get("debt_payments_monthly", 0.0) / (inc + 1e-6)
    aff_gap_severe = bool(case.get("aff_gap_severe", 0))
    near_ret       = (age >= 65) or bool(case.get("near_retirement", 0))

    # Downsize 
    downsize_valid = bool(eq >= 50_000 and (inc < 3000 or (age > 65 and dti > 0.45)))

    # Lump Sum e
    lump_sum_valid = (savings >= 0.02 * bal) or (savings >= 5_000)
    if case.get("pref_fast_payoff", 0.0) >= 0.8:
        lump_sum_valid = True

    # Extend 
    extend_valid = bool(bal > 0 and age < 67)

    # Baseline 
    baseline_valid = bool(inc > 0)

    
    if near_ret and (aff_gap_severe or dti >= 0.5):
        baseline_valid = False
    if age >= 67:
        extend_valid = False

    # Fallback
    if not any([baseline_valid, extend_valid, lump_sum_valid, downsize_valid]):
        downsize_valid = True

    return {
        "baseline": baseline_valid,
        "extend": extend_valid,
        "lump_sum": lump_sum_valid,
        "downsize": downsize_valid,
    }

#Preference Adjustment
def apply_preferences(base_scores: dict, case: dict, feasibility: dict, pref_threshold: float = 0.5):
    """
    Multiply/penalize scores based on preferences for *feasible* strategies.
    Strong prefs can boost up to ×3; competing options get lightly penalized.
    """
    prefs = {
        "baseline": case.get("pref_stability", 0),
        "extend":   max(case.get("pref_low_payment", 0), case.get("pref_flexibility", 0)),
        "lump_sum": case.get("pref_fast_payoff", 0),
        "downsize": case.get("pref_equity_growth", 0),
    }
    adjusted = base_scores.copy()

    for strat, pref_val in prefs.items():
        if feasibility.get(strat, False) and pref_val >= pref_threshold:
            
            boost_factor = 1.0 + 2.0 * pref_val
            adjusted[strat] *= boost_factor

            for other in adjusted:
                if other != strat:
                    adjusted[other] *= (1 - 0.3 * pref_val)

        if feasibility.get(strat, False) and pref_val >= 0.85:
            adjusted[strat] *= 3.0

    return adjusted, prefs

#Weighted Scoring 
def score_strategies(
    model_probs, classes, feasibility: dict, case: dict, pref_threshold: float = 0.5, temperature: float = 1.5
):
    """
    Combine model probabilities with feasibility + preferences and return:
      - adjusted probs (softmax w/ temperature)
      - best decision (feasible winner)
    """
    classes_list = list(classes)
    adjusted = {c: float(model_probs[i]) for i, c in enumerate(classes_list)}

    
    for c in classes_list:
        adjusted[c] *= 1.0 if feasibility.get(c, False) else 0.05

    # Preference weighting
    prefs = {
        "baseline": case.get("pref_stability", 0),
        "extend":   max(case.get("pref_low_payment", 0), case.get("pref_flexibility", 0)),
        "lump_sum": case.get("pref_fast_payoff", 0),
        "downsize": case.get("pref_equity_growth", 0),
    }
    for c, pref_val in prefs.items():
        if feasibility.get(c, False) and pref_val >= pref_threshold:
            adjusted[c] *= (1 + 1.5 * pref_val)

    # Edge-cases
    age = case.get("age", 0)
    inc = case.get("income_monthly", 0)
    eq  = case.get("equity", 0)

    if feasibility.get("downsize", False) and age >= 65 and inc < 3000 and eq > 80_000:
        adjusted["downsize"] *= 1.5
        adjusted["baseline"] *= 0.7
    if feasibility.get("lump_sum", False) and case.get("savings_available", 0) >= 10_000:
        adjusted["lump_sum"] *= 1.3


    raw = np.array([adjusted[c] for c in classes_list], dtype=float)
    if raw.sum() == 0:
        adjusted = {c: (1.0 if c == "baseline" else 0.0) for c in classes_list}
    else:
        scaled = np.exp(np.log(raw + 1e-6) / temperature)
        scaled /= scaled.sum()
        adjusted = {c: float(scaled[i]) for i, c in enumerate(classes_list)}

    # Decision 
    decision = max(adjusted, key=adjusted.get)
    if not feasibility.get(decision, False):
        feasibles = [c for c in classes_list if feasibility.get(c, False)]
        if feasibles:
            decision = max(feasibles, key=lambda c: adjusted[c])

    return adjusted, decision


#Smarter Explanations 
def build_strategy_reasons(case: dict, decision: str, feasibility: dict, prefs: dict) -> dict:
    """
    Produce beginner-friendly reasons tied to concrete thresholds and inputs.
    """
    reasons = {}
    r = 1

    
    reasons[f"Reason {r}"] = f"The model and rules together pointed to {decision.title()} as the best fit."
    r += 1

    
    for strat, feas in feasibility.items():
        if not feas:  
            if strat == "extend":
                reasons[f"Reason {r}"] = (
                    "Extending wasn’t possible because there aren’t enough working years left "
                    "or debt-to-income is too high."
                )
            elif strat == "lump_sum":
                savings = case.get("savings_available", 0)
                reasons[f"Reason {r}"] = (
                    f"A Lump Sum wasn’t possible because your available savings (${savings:,.0f}) "
                    "were below the minimum threshold."
                )
            elif strat == "downsize":
                eq = case.get("equity", 0)
                reasons[f"Reason {r}"] = (
                    f"Downsizing wasn’t realistic since equity (${eq:,.0f}) wasn’t high enough "
                    "to safely sell and relocate."
                )
            elif strat == "baseline":
                reasons[f"Reason {r}"] = (
                    "Staying with your current mortgage wasn’t safe because the payment burden is too high."
                )
        else:
            if strat != decision:
                reasons[f"Reason {r}"] = (
                    f"{strat.title()} was feasible, but preferences and financial balance favored {decision.title()}."
                )
        r += 1

    # Affordability 
    inc = case.get("income_monthly", 0)
    if case.get("aff_gap_positive"):
        reasons[f"Reason {r}"] = (
            f"Payments are affordable at your income (${inc:,}), so stability options were viable."
        )
    elif case.get("aff_gap_mild"):
        reasons[f"Reason {r}"] = (
            f"Payments are a bit tight at your income (${inc:,}); options that reduce stress scored higher."
        )
    elif case.get("aff_gap_severe"):
        reasons[f"Reason {r}"] = (
            f"Payments are far too heavy for your income (${inc:,}); major changes are typically required."
        )
    r += 1

    # Debt-to-income
    if case.get("dti_high"):
        reasons[f"Reason {r}"] = "Debt-to-income is high, so safer strategies ranked higher."
    elif case.get("dti_low"):
        reasons[f"Reason {r}"] = "Debt-to-income is comfortable, keeping multiple options open."
    r += 1

    # Equity
    eq = case.get("equity", 0)
    if eq < 20_000:
        reasons[f"Reason {r}"] = "Low home equity made downsizing less attractive."
    elif eq >= 100_000:
        reasons[f"Reason {r}"] = f"Strong equity (${eq:,.0f}) allowed flexibility, but {decision.title()} still fit best."
    r += 1

    # Age
    age = case.get("age", 0)
    if age >= 60:
        reasons[f"Reason {r}"] = f"Near-retirement (age {age}) limits long horizons; {decision.title()} was safer."
    else:
        reasons[f"Reason {r}"] = f"Working age (age {age}) kept options open; {decision.title()} matched your profile."
    r += 1

    # Employment
    emp = str(case.get("employment_type", "")).lower()
    if emp == "full-time":
        reasons[f"Reason {r}"] = "Stable full-time income supports the chosen path."
    elif emp in {"contract", "self-employed"}:
        reasons[f"Reason {r}"] = "Contract/self-employed income adds variability, favoring safer choices."
    elif emp == "seasonal":
        reasons[f"Reason {r}"] = "Seasonal income is less predictable, so safer options rank higher."
    elif emp in {"unemployed", "retired"}:
        reasons[f"Reason {r}"] = "Limited employment income narrows to the most practical option."
    r += 1

    # Credit
    credit = case.get("credit_score", 0)
    if credit >= 750:
        reasons[f"Reason {r}"] = f"Excellent credit ({credit}) gives options; {decision.title()} still fits best."
    elif credit >= 680:
        reasons[f"Reason {r}"] = f"Solid credit ({credit}) keeps choices open."
    elif credit >= 600:
        reasons[f"Reason {r}"] = f"Fair credit ({credit}) limited some paths, favoring {decision.title()}."
    else:
        reasons[f"Reason {r}"] = f"Low credit ({credit}) blocked many lenders; {decision.title()} was realistic."
    r += 1

    
    if prefs.get(decision, 0) >= 0.5:
        reasons[f"Reason {r}"] = f"Your preference for {decision.title()} influenced the outcome."

    return reasons


# Rate Choice Explanations 
def build_rate_reasons(case: dict):
    """
    Pick fixed vs variable rate with clear, user-friendly reasons.
    """
    reasons = {}
    inc = case.get("income_monthly", 0)
    emp_type = str(case.get("employment_type", "")).lower()
    credit = case.get("credit_score", 0)

    #Stress signals(prefer fixed)
    if case.get("aff_gap_severe") or case.get("dti_high") or inc < 3000:
        rate_type = "fixed"
        reasons["RateReason 1"] = (
            f"Finances under stress (income ${inc:,} or high debt), so a fixed rate is safer."
        )
    else:
        #Preference-led
        if case.get("pref_low_payment", 0) > case.get("pref_stability", 0):
            rate_type = "variable"
            reasons["RateReason 1"] = "Preference for lower initial payments → variable rate."
        elif case.get("pref_flexibility", 0) > 0.6:
            rate_type = "variable"
            reasons["RateReason 1"] = "High flexibility preference → variable rate."
        else:
            rate_type = "fixed"
            reasons["RateReason 1"] = "Preference for stability → fixed rate."

    # Employment stability
    if emp_type in {"contract", "self-employed", "seasonal"}:
        reasons["RateReason 2"] = f"{emp_type.capitalize()} income is less predictable → fixed adds protection."
    elif emp_type == "full-time":
        reasons["RateReason 2"] = "Full-time income is steady; either fixed or variable is viable."
    elif emp_type in {"retired", "unemployed"}:
        reasons["RateReason 2"] = "Limited employment income → fixed rate helps budgeting."

    # Credit score
    if credit < 600:
        reasons["RateReason 3"] = f"Low credit ({credit}) limits offers; fixed is more predictable."
    elif 600 <= credit < 680:
        reasons["RateReason 3"] = (
            f"Fair credit ({credit}); if variable chosen, risk is higher, otherwise fixed is stable."
        )
    elif 680 <= credit < 750:
        reasons["RateReason 3"] = f"Solid credit ({credit}) → competitive offers; {rate_type} still reasonable."
    else:
        reasons["RateReason 3"] = f"Excellent credit ({credit}) → strong lender options; {rate_type} chosen confidently."

    return rate_type, reasons


# 5) High-level Strategy Selectors
def recommend_strategy(case: dict, model_probs, classes, pref_threshold: float = 0.5) -> dict:
    """
    Final recommender that ties everything together.
    Returns a dict with decision, scores, feasibility, preferences, and model suggestion.
    """
    feasibility = check_feasibility(case)
    feasible = [k for k, v in feasibility.items() if v]
    if not feasible:
        return {
            "decision": "no_valid_strategy",
            "scores": {c: 0.0 for c in classes},
            "feasibility": feasibility,
            "preferences": {},
            "model_suggestion": max(classes, key=lambda c: model_probs[classes.index(c)]),
        }

    # Preferences
    prefs = {
        "baseline": float(case.get("pref_stability", 0.0)),
        "extend":   float(max(case.get("pref_low_payment", 0.0), case.get("pref_flexibility", 0.0))),
        "lump_sum": float(case.get("pref_fast_payoff", 0.0)),
        "downsize": float(case.get("pref_equity_growth", 0.0)),
    }

    # Strong preference override
    STRONG_PREF = 0.8
    top_pref, top_val = max(((s, prefs.get(s, 0.0)) for s in feasible), key=lambda kv: kv[1])
    if top_val >= STRONG_PREF:
        return {
            "decision": top_pref,
            "scores": {c: (1.0 if c == top_pref else 0.0) for c in classes},
            "feasibility": feasibility,
            "preferences": prefs,
            "model_suggestion": max(classes, key=lambda c: model_probs[classes.index(c)]),
        }

    # Baseline safeguard
    if feasibility.get("baseline", False) and prefs["baseline"] >= 0.7:
        return {
            "decision": "baseline",
            "scores": {c: (1.0 if c == "baseline" else 0.0) for c in classes},
            "feasibility": feasibility,
            "preferences": prefs,
            "model_suggestion": max(classes, key=lambda c: model_probs[classes.index(c)]),
        }

    # Weighted scoring
    scores = {}
    bal = case.get("mortgage_balance", 0.0)
    savings = case.get("savings_available", 0.0)
    for s in feasible:
        pref = prefs.get(s, 0.0)
        prob = float(model_probs[classes.index(s)])
        if s == "lump_sum":
            savings_ratio = savings / (bal + 1e-6)
            base = (0.6 + pref + 0.3 * savings_ratio) if (savings_ratio >= 0.05 or savings >= 10_000) else pref
            scores[s] = base + 0.1 * prob
        else:
            scores[s] = pref + 0.1 * prob + 0.05

    top_score = max(scores.values())
    tied = [s for s, sc in scores.items() if abs(sc - top_score) < 1e-6]
    if len(tied) > 1:
        rank = {"downsize": 0, "lump_sum": 1, "extend": 2, "baseline": 3}
        decision = min(tied, key=lambda s: rank[s])
    else:
        decision = max(scores, key=scores.get)

    return {
        "decision": decision,
        "scores": scores,
        "feasibility": feasibility,
        "preferences": prefs,
        "model_suggestion": max(classes, key=lambda c: model_probs[classes.index(c)]),
    }


def rule_based_recommend(case: dict, model_probs, classes, pref_threshold: float = 0.7) -> dict:
    feasibility = check_feasibility(case)
    candidates = [c for c in classes if feasibility.get(c, False)] or ["baseline"]

    
    scores = {c: float(model_probs[classes.index(c)]) for c in candidates}

    # Preferences
    prefs = {
        "baseline": case.get("pref_stability", 0),
        "extend":   max(case.get("pref_low_payment", 0), case.get("pref_flexibility", 0)),
        "lump_sum": case.get("pref_fast_payoff", 0),
        "downsize": case.get("pref_equity_growth", 0),
    }

    for c in candidates:
        scores[c] *= (1.0 + 2.0 * prefs.get(c, 0))  
        if feasibility[c] and prefs.get(c, 0) >= 0.7:
            scores[c] = max(scores[c], 0.5 + 0.5 * prefs[c])
        elif feasibility[c]:
            scores[c] += 0.2 * prefs[c]
        else:
            scores[c] = 0.0

   
    age = case.get("age", 0)
    eq  = case.get("equity", 0)
    bal = case.get("mortgage_balance", 0)
    savings = case.get("savings_available", 0)
    dti = case.get("debt_payments_monthly", 0) / (case.get("income_monthly", 0) + 1e-6)
    aff_gap_severe = bool(case.get("aff_gap_severe", 0))

    
    if age >= 65 and (dti > 0.5 or aff_gap_severe) and eq >= 50_000:
        return {
            "decision": "downsize",
            "scores": {"baseline": 0, "extend": 0, "lump_sum": 0, "downsize": 1.0},
            "feasibility": feasibility,
            "preferences": prefs,
            "override": "Retiree under stress with equity → forced downsize",
    }

    # Lump Sum handling
    if "lump_sum" in candidates:
        if savings < 0.02 * bal and savings < 5_000 and prefs["lump_sum"] < 0.85:
            scores["lump_sum"] = 0.0  # effectively blocked
        else:
            if savings >= 0.25 * bal or savings >= 50_000:
                scores["lump_sum"] *= 1.5
            elif savings >= 0.05 * bal or savings >= 10_000:
                scores["lump_sum"] *= 1.2
            if prefs["lump_sum"] >= 0.85:
                scores["lump_sum"] *= 1.5
            if feasibility["lump_sum"]:
                if savings >= 0.05 * bal:
                    scores["lump_sum"] = max(scores["lump_sum"], 0.6 + prefs["lump_sum"])
                if savings >= 0.25 * bal:
                    scores["lump_sum"] = max(scores["lump_sum"], 0.8 + prefs["lump_sum"])

    
    if "downsize" in candidates:
        if age >= 65 and (dti > 0.5 or eq >= 200_000):
            scores["downsize"] *= 1.2
        elif eq < 50_000:
            scores["downsize"] = 0.0

    
    decision = "baseline" if all(v == 0 for v in scores.values()) else max(scores, key=scores.get)

    # Normalize 
    total = sum(scores.values()) + 1e-6
    scores = {k: v / total for k, v in scores.items()}

    return {
        "decision": decision,
        "scores": scores,
        "feasibility": feasibility,
        "preferences": prefs,
    }



# enrich
def enrich_features(applicant: dict) -> dict:
    case = applicant.copy()

    case["amortization_remaining"] = case.get("amortization_remaining", 20)
    case["equity"] = case.get("property_value", 0) - case.get("mortgage_balance", 0)
    case["loan_to_value"] = (
        case.get("mortgage_balance", 0) / case.get("property_value", 1e-6)
        if case.get("property_value", 0) > 0 else 1.0
    )

    
    est_payment = (
        (case.get("mortgage_balance", 0) * (case.get("interest_rate_current", 0) / 100.0)) / 12.0
    ) if case.get("interest_rate_current", 0) > 0 else 1.0

    case["disposable_income"] = (
        case.get("income_monthly", 0) - case.get("expenses_monthly", 0) - case.get("debt_payments_monthly", 0)
    )
    affordability_gap = case["disposable_income"] - est_payment
    case["aff_gap_severe"]   = int(affordability_gap < -1000)
    case["aff_gap_mild"]     = int(-1000 <= affordability_gap < 0)
    case["aff_gap_positive"] = int(affordability_gap >= 0)

    dti = (case.get("expenses_monthly", 0) + case.get("debt_payments_monthly", 0)) / (case.get("income_monthly", 0) + 1e-6)
    case["dti_high"] = int(dti > 0.6)
    case["dti_low"]  = int(dti < 0.4)

    case["retirement_risk"]   = int((case.get("age", 0) + case["amortization_remaining"]) > 75)
    case["near_retirement"]   = int(case.get("age", 0) >= 60)

    return case


#Pipeline Wrapper 
class StrategyPipelineWrapper:
    def __init__(self, pipeline, classes, X_train_columns, encoders=None, label_encoder=None):
        self.pipeline = pipeline
        self.classes = [str(c) for c in classes]
        self.X_train_columns = X_train_columns
        self.encoders = encoders or {}
        self.label_encoder = label_encoder

    def prepare_row(self, applicant_raw: dict):
        row = pd.DataFrame([applicant_raw])
        for col in self.X_train_columns:
            if col not in row.columns:
                row[col] = 0
        return row[self.X_train_columns]

    def predict(self, applicant_raw: dict) -> str:
        row = self.prepare_row(applicant_raw)
        pred = self.pipeline.predict(row)[0]
        return str(self.classes[pred])

    def predict_proba(self, applicant_raw: dict) -> dict:
        row = self.prepare_row(applicant_raw)
        probs = self.pipeline.predict_proba(row)[0]
        return {str(cls): round(float(p), 6) for cls, p in zip(self.classes, probs)}

    def predict_with_rules(self, applicant_raw: dict, pref_threshold: float = 0.7) -> dict:
        applicant = enrich_features(applicant_raw)
        row = self.prepare_row(applicant)

        model_probs_arr = self.pipeline.predict_proba(row)[0]
        prob_dict = {str(cls): round(float(p), 6) for cls, p in zip(self.classes, model_probs_arr)}

        feas = check_feasibility(applicant)
        valid_strats = [s for s, ok in feas.items() if ok]

        prefs = {
            "baseline": float(applicant.get("pref_stability", 0.0)),
            "extend":   float(max(applicant.get("pref_low_payment", 0.0), applicant.get("pref_flexibility", 0.0))),
            "lump_sum": float(applicant.get("pref_fast_payoff", 0.0)),
            "downsize": float(applicant.get("pref_equity_growth", 0.0)),
        }

       
        if len(valid_strats) == 1:
            decision = valid_strats[0]
        elif len(valid_strats) > 1:
            decision = max(valid_strats, key=lambda s: prefs.get(s, 0.0))
        else:
            decision = "baseline"

        rate_type, rate_reasons = build_rate_reasons(applicant)
        reasons = build_strategy_reasons(applicant, decision, feas, prefs)

        return {
            "strategy": decision,
            "rate_type": rate_type,
            "adjusted_probabilities": prob_dict,
            "feasibility": feas,
            "preferences": prefs,
            "rate_reasons": rate_reasons,
            "reasons": reasons,
        }


def predict_applicant_with_rules(
    applicant_raw: dict, model, classes, encoders, X_train_columns, pref_threshold: float = 0.7
) -> dict:
    wrapper = StrategyPipelineWrapper(model, classes, X_train_columns, encoders)
    return wrapper.predict_with_rules(applicant_raw, pref_threshold)
