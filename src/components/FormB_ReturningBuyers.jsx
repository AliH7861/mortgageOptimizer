import React, { useState } from "react";

// === Floating Input (number/text with arrows) ===
const FloatingInput = ({ label, type, name, step, value, onChange, increment, decrement }) => (
  <div className="relative">
    <input
      type={type}
      step={step}
      name={name}
      value={value}
      onChange={onChange}
      placeholder=" "
      className="peer w-full rounded-full bg-black/30 backdrop-blur-md 
        border border-green-500/30 text-white px-4 py-3 
        focus:outline-none focus:ring-2 focus:ring-green-400 
        focus:border-green-500 placeholder-transparent
        shadow-[0_0_10px_rgba(0,255,100,0.3)] pr-10"
    />
    <label
      className="absolute left-4 -top-2 text-sm font-semibold text-green-400 
        transition-all peer-placeholder-shown:top-3 
        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
        peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-400"
    >
      {label}
    </label>
    {type === "number" && (
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
        <button
          type="button"
          onClick={increment}
          className="w-4 h-3 text-green-400 hover:text-green-300 text-xs leading-none flex items-center justify-center"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={decrement}
          className="w-4 h-3 text-green-400 hover:text-green-300 text-xs leading-none flex items-center justify-center"
        >
          ▼
        </button>
      </div>
    )}
  </div>
);

// === Floating Stepper (enum fields) ===
const FloatingStepper = ({ label, name, options, value, setValue }) => {
  const currentIndex = Math.max(0, options.indexOf(value));
  const increment = () => setValue(options[(currentIndex + 1) % options.length]);
  const decrement = () => setValue(options[(currentIndex - 1 + options.length) % options.length]);

  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        readOnly
        placeholder=" "
        className="peer w-full rounded-full bg-black/30 backdrop-blur-md 
          border border-green-500/30 text-white px-4 py-3 
          focus:outline-none focus:ring-2 focus:ring-green-400 
          focus:border-green-500 placeholder-transparent
          shadow-[0_0_10px_rgba(0,255,100,0.3)] pr-10"
      />
      <label
        className="absolute left-4 -top-2 text-sm font-semibold text-green-400 
          transition-all peer-placeholder-shown:top-3 
          peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
          peer-focus:-top-2 peer-focus:text-sm peer-focus:text-green-400"
      >
        {label}
      </label>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col">
        <button
          type="button"
          onClick={increment}
          className="w-4 h-3 text-green-400 hover:text-green-300 text-xs leading-none flex items-center justify-center"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={decrement}
          className="w-4 h-3 text-green-400 hover:text-green-300 text-xs leading-none flex items-center justify-center"
        >
          ▼
        </button>
      </div>
    </div>
  );
};

// === Preference Slider ===
const PreferenceSlider = ({ name, label, value, onChange }) => (
  <div className="flex flex-col pb-4 border-b border-green-500/30 last:border-none">
    <div className="flex justify-between items-center mb-1">
      <label className="text-sm font-semibold tracking-widest uppercase text-green-300">
        {label}
      </label>
      <span className="text-xs text-green-400 font-mono">
        {parseFloat(value).toFixed(2)}
      </span>
    </div>
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full accent-green-400 focus:accent-green-500"
    />
    <div className="flex justify-between text-xs text-gray-500">
      <span>Low</span>
      <span>High</span>
    </div>
  </div>
);

// === Binary Output for Strategy ===
const BinaryOutput = ({ decision, confidence, rateType, rate }) => {
  const hasConf = Number.isFinite(confidence);
  const hasRate = Number.isFinite(rate);

  return (
    <section id="binaryOutput" className="w-full max-w-7xl mx-auto mt-12">
      <div className="bg-black/60 border border-green-500/30 rounded-t-2xl px-6 py-3 
        text-xs tracking-[0.25em] uppercase text-green-300 text-center
        shadow-[0_0_12px_rgba(0,255,100,0.2)]">
        Model Output Results
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 
        bg-black/40 border border-green-500/30 rounded-b-2xl p-6">
        <div className="bg-black/60 rounded-xl border border-green-500/20 p-6 text-center">
          <h3 className="text-sm uppercase tracking-widest text-green-300 mb-3">
            Strategy Decision
          </h3>
          <p className="text-green-400 font-mono text-lg">
            {decision ? `The model recommends → ${decision}` : "Waiting for strategy decision..."}
          </p>
          {hasConf && (
            <p className="text-xs text-gray-400 mt-2">Confidence: {(confidence * 100).toFixed(1)}%</p>
          )}
        </div>
        <div className="bg-black/60 rounded-xl border border-green-500/20 p-6 text-center">
          <h3 className="text-sm uppercase tracking-widest text-green-300 mb-3">
            Rate Decision
          </h3>
          <p className="text-green-400 font-mono text-lg">
            {rateType ? `The model chose ${rateType}${hasRate ? ` at ${rate}%` : ""}` : "Waiting for rate decision..."}
          </p>
        </div>
      </div>
    </section>
  );
};

// === Main Form (Returning Buyers) ===
export const FormB_ReturningBuyers = () => {
  const [formData, setFormData] = useState({
    age: "",
    employmentType: "",
    employmentYears: "",
    creditScore: "",
    incomeMonthly: "",
    expensesMonthly: "",
    debtPaymentsMonthly: "",
    currentPropertyValue: "",
    currentMortgageBalance: "",
    currentInterestRate: "",
    currentRateType: "",
    mortgageTermYears: "",
    remainingAmortizationYears: "",
    currentMonthlyPayment: "",
    pref_low_payment: 0.5,
    pref_stability: 0.5,
    pref_risk_tolerance: 0.5,
    pref_fast_payoff: 0.5,
    pref_equity_growth: 0.5,
    pref_flexibility: 0.5,
  });

  const [apiResult, setApiResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const increment = (name, step = 1) => {
    setFormData((prev) => {
      const current = parseFloat(prev[name]) || 0;
      return { ...prev, [name]: String(current + step) };
    });
  };

  const decrement = (name, step = 1) => {
    setFormData((prev) => {
      const current = parseFloat(prev[name]) || 0;
      return { ...prev, [name]: String(Math.max(0, current - step)) };
    });
  };

  const handleSubmit = async () => {
    try {
      const toNum = (v, fallback = 0) => {
        const n = typeof v === "string" ? v.trim() : v;
        const p = Number(n);
        return Number.isFinite(p) ? p : fallback;
      };

      const payload = {
        age: toNum(formData.age),
        employment_type: formData.employmentType,
        employment_years: toNum(formData.employmentYears),
        credit_score: toNum(formData.creditScore),
        income_monthly: toNum(formData.incomeMonthly),
        expenses_monthly: toNum(formData.expensesMonthly),
        debt_payments_monthly: toNum(formData.debtPaymentsMonthly),
        property_value: toNum(formData.currentPropertyValue),
        mortgage_balance: toNum(formData.currentMortgageBalance),
        interest_rate_current: toNum(formData.currentInterestRate),
        rate_type: formData.currentRateType,
        amortization_remaining: toNum(formData.remainingAmortizationYears),
        monthly_payment_current: toNum(formData.currentMonthlyPayment),
        pref_low_payment: toNum(formData.pref_low_payment, 0.5),
        pref_stability: toNum(formData.pref_stability, 0.5),
        pref_risk_tolerance: toNum(formData.pref_risk_tolerance, 0.5),
        pref_fast_payoff: toNum(formData.pref_fast_payoff, 0.5),
        pref_equity_growth: toNum(formData.pref_equity_growth, 0.5),
        pref_flexibility: toNum(formData.pref_flexibility, 0.5),
      };

      const API_BASE = "http://localhost:8080/api/mortgage";
      const res = await fetch(`${API_BASE}/strategy`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || `Request failed (${res.status})`);

      setApiResult(data);
      setApiError(null);
    } catch (err) {
      console.error("Strategy error:", err);
      setApiError(String(err));
      setApiResult(null);
    }
  };

  return (
    <div className="flex justify-center px-4 mt-10">
      <div className="w-full max-w-7xl space-y-9">
        {/* === Top Layout === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* === Left Column === */}
          <div className="space-y-10">
            {/* Personal & Employment */}
            <div className="rounded-2xl bg-black/40 backdrop-blur-lg p-6 
              shadow-[0_0_25px_rgba(0,255,100,0.15)] border border-white/30">
              <h2 className="tracking-[0.25em] uppercase text-green-400 text-base font-bold mb-6">
                Personal & Employment
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput type="number" name="age" label="Age" value={formData.age}
                  onChange={handleChange} increment={() => increment("age")} decrement={() => decrement("age")} />
                <FloatingStepper label="Employment Type" name="employmentType"
                  value={formData.employmentType}
                  setValue={(val) => setFormData((prev) => ({ ...prev, employmentType: val }))}
                  options={["full-time", "contract", "seasonal", "self-employed", "unemployed"]} />
                <FloatingInput type="number" name="employmentYears" label="Employment Years" value={formData.employmentYears}
                  onChange={handleChange} increment={() => increment("employmentYears")} decrement={() => decrement("employmentYears")} />
                <FloatingInput type="number" name="creditScore" label="Credit Score" value={formData.creditScore}
                  onChange={handleChange} increment={() => increment("creditScore")} decrement={() => decrement("creditScore")} />
              </div>
            </div>

            {/* Property & Mortgage (Current) */}
            <div className="rounded-2xl bg-black/40 backdrop-blur-lg p-6 
              shadow-[0_0_25px_rgba(0,255,100,0.15)] border border-white/30">
              <h2 className="tracking-[0.25em] uppercase text-green-400 text-base font-bold mb-6">
                Property & Mortgage (Current)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput type="number" name="currentPropertyValue" label="Current Property Value"
                  value={formData.currentPropertyValue} onChange={handleChange}
                  increment={() => increment("currentPropertyValue")} decrement={() => decrement("currentPropertyValue")} />
                <FloatingInput type="number" name="currentMortgageBalance" label="Current Mortgage Balance"
                  value={formData.currentMortgageBalance} onChange={handleChange}
                  increment={() => increment("currentMortgageBalance")} decrement={() => decrement("currentMortgageBalance")} />
                <FloatingInput type="number" step="0.01" name="currentInterestRate" label="Current Interest Rate (%)"
                  value={formData.currentInterestRate} onChange={handleChange}
                  increment={() => increment("currentInterestRate", 0.01)} decrement={() => decrement("currentInterestRate", 0.01)} />
                <FloatingStepper label="Rate Type" name="currentRateType"
                  value={formData.currentRateType}
                  setValue={(val) => setFormData((prev) => ({ ...prev, currentRateType: val }))}
                  options={["Fixed", "Variable"]} />
                <FloatingInput type="number" name="mortgageTermYears" label="Mortgage Term(Yrs)"
                  value={formData.mortgageTermYears} onChange={handleChange}
                  increment={() => increment("mortgageTermYears")} decrement={() => decrement("mortgageTermYears")} />
                <FloatingInput type="number" name="remainingAmortizationYears" label="Remaining Amortization (Years)"
                  value={formData.remainingAmortizationYears} onChange={handleChange}
                  increment={() => increment("remainingAmortizationYears")} decrement={() => decrement("remainingAmortizationYears")} />
                <FloatingInput type="number" name="currentMonthlyPayment" label="Current Monthly Payment"
                  value={formData.currentMonthlyPayment} onChange={handleChange}
                  increment={() => increment("currentMonthlyPayment")} decrement={() => decrement("currentMonthlyPayment")} />
              </div>
            </div>
          </div>

          {/* === Right Column === */}
          <div className="rounded-2xl bg-black/40 backdrop-blur-lg p-7 
            shadow-[0_0_25px_rgba(0,255,100,0.15)] border border-white/30">
            <h2 className="tracking-[0.25em] uppercase text-green-400 text-base font-bold mb-6">
              Preferences
            </h2>
            <div className="flex flex-col space-y-2.5">
              <PreferenceSlider name="pref_low_payment" label="Low Payment"
                value={formData.pref_low_payment} onChange={handleChange} />
              <PreferenceSlider name="pref_stability" label="Stability"
                value={formData.pref_stability} onChange={handleChange} />
              <PreferenceSlider name="pref_risk_tolerance" label="Risk Tolerance"
                value={formData.pref_risk_tolerance} onChange={handleChange} />
              <PreferenceSlider name="pref_fast_payoff" label="Fast Payoff"
                value={formData.pref_fast_payoff} onChange={handleChange} />
              <PreferenceSlider name="pref_equity_growth" label="Equity Growth"
                value={formData.pref_equity_growth} onChange={handleChange} />
              <PreferenceSlider name="pref_flexibility" label="Flexibility"
                value={formData.pref_flexibility} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* === Financial Section === */}
        <div className="rounded-2xl bg-black/40 backdrop-blur-lg p-6 
          shadow-[0_0_25px_rgba(0,255,100,0.15)] border border-white/30">
          <h2 className="tracking-[0.25em] uppercase text-green-400 text-base font-bold mb-6">
            Financial
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FloatingInput type="number" name="incomeMonthly" label="Income"
              value={formData.incomeMonthly} onChange={handleChange}
              increment={() => increment("incomeMonthly")} decrement={() => decrement("incomeMonthly")} />
            <FloatingInput type="number" name="expensesMonthly" label="Expenses"
              value={formData.expensesMonthly} onChange={handleChange}
              increment={() => increment("expensesMonthly")} decrement={() => decrement("expensesMonthly")} />
            <FloatingInput type="number" name="debtPaymentsMonthly" label="Debt Payments"
              value={formData.debtPaymentsMonthly} onChange={handleChange}
              increment={() => increment("debtPaymentsMonthly")} decrement={() => decrement("debtPaymentsMonthly")} />
          </div>
        </div>

        {/* === Submit Button === */}
        <div className="mt-12 flex justify-center mb-5">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-12 py-3 rounded-full font-semibold text-black 
              bg-gradient-to-r from-green-400 via-green-500 to-lime-400 
              hover:from-green-500 hover:via-green-600 hover:to-lime-500 
              shadow-[0_0_25px_rgba(0,255,100,0.6)] transition-all hover:scale-105">
            Run Strategy
          </button>
        </div>

        {/* === Output === */}
        {apiResult && (
          <BinaryOutput
            decision={apiResult?.strategy}
            confidence={apiResult?.confidence}
            rateType={apiResult?.rate_type}
            rate={apiResult?.rate_percent}
          />
        )}

        {apiError && (
          <div className="mt-6 p-4 bg-red-900/40 border border-red-500/30 rounded-xl w-full max-w-xl text-red-300 font-mono text-sm">
            Error: {apiError}
          </div>
        )}
      </div>
    </div>
  );
};
