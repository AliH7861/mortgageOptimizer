import React, { useState } from "react";

/* ======================================================
   BinaryOutput (two simple sentence boxes)
   ====================================================== */
const BinaryOutput = ({ decision, confidence, rateType, rate }) => {
  const hasConf = Number.isFinite(confidence);
  const hasRate = Number.isFinite(rate);
  const approved = (decision || "").toUpperCase() === "PASS";

  return (
    <section id="binaryOutput" className="w-full max-w-7xl mx-auto mt-12">
      {/* Header */}
      <div className="bg-black/60 border border-green-500/30 rounded-t-2xl px-6 py-3 
        text-xs tracking-[0.25em] uppercase text-green-300 text-center
        shadow-[0_0_12px_rgba(0,255,100,0.2)]">
        Model Output Results
      </div>

      {/* Two boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 
        bg-black/40 border border-green-500/30 rounded-b-2xl 
        p-6 shadow-[0_0_20px_rgba(0,255,100,0.25)]">
        
        {/* Box 1: Mortgage Decision */}
        <div className="bg-black/60 rounded-xl border border-green-500/20 
          shadow-[0_0_15px_rgba(0,255,100,0.15)] p-6 text-center">
          <h3 className="text-sm uppercase tracking-widest text-green-300 mb-3">
            Mortgage Decision
          </h3>
          <p className="text-green-400 font-mono text-lg">
            {decision
              ? `The model decided to ${decision}.`
              : "Waiting for mortgage decision..."}
          </p>
          {hasConf && (
            <p className="text-xs text-gray-400 mt-2">
              Confidence: {(confidence * 100).toFixed(1)}%
            </p>
          )}
        </div>

        {/* Box 2: Rate Decision */}
        <div className="bg-black/60 rounded-xl border border-green-500/20 
          shadow-[0_0_15px_rgba(0,255,100,0.15)] p-6 text-center">
          <h3 className="text-sm uppercase tracking-widest text-green-300 mb-3">
            Rate Decision
          </h3>
          <p className="text-green-400 font-mono text-lg">
            {!decision
              ? "Waiting for rate decision..."
              : !approved
              ? "The model cannot recommend a rate because the application was not approved."
              : rateType
              ? `The model decided to give you a ${rateType} rate${hasRate ? ` at ${rate}%` : ""}.`
              : "Waiting for rate decision..."}
          </p>
        </div>
      </div>
    </section>
  );
};

/* ======================================================
   Floating Label Input with +/- buttons (numbers)
   ====================================================== */
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
        shadow-[0_0_10px_rgba(0,255,100,0.3)] pr-14"
    />
    <label
      className="absolute left-4 -top-2 text-xs text-green-400 
        transition-all peer-placeholder-shown:top-3 
        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
        peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-400"
    >
      {label}
    </label>

    {type === "number" && (
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col space-y-1">
        <button
          type="button"
          onClick={increment}
          className="w-5 h-3 rounded text-green text-xs leading-none flex items-center justify-center"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={decrement}
          className="w-5 h-3 rounded text-green text-xs leading-none flex items-center justify-center"
        >
          ▼
        </button>
      </div>
    )}
  </div>
);

/* ======================================================
   Floating Stepper (enum values)
   ====================================================== */
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
          border border-green-500/30 text-gray-300 px-4 py-3 
          focus:outline-none focus:ring-2 focus:ring-green-400 
          focus:border-green-500 placeholder-transparent
          shadow-[0_0_10px_rgba(0,255,100,0.3)] pr-14
          peer-focus:text-white"
      />
      <label
        className="absolute left-4 -top-2 text-xs text-green-400 
          transition-all peer-placeholder-shown:top-3 
          peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
          peer-focus:-top-2 peer-focus:text-xs peer-focus:text-green-400"
      >
        {label}
      </label>

      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col space-y-1">
        <button
          type="button"
          onClick={increment}
          className="w-5 h-3 text-green-400 hover:text-green-300 text-xs leading-none flex items-center justify-center"
        >
          ▲
        </button>
        <button
          type="button"
          onClick={decrement}
          className="w-5 h-3 text-green-400 hover:text-green-300 text-xs leading-none flex items-center justify-center"
        >
          ▼
        </button>
      </div>
    </div>
  );
};

/* ======================================================
   Preference Slider
   ====================================================== */
const PreferenceSlider = ({ name, label, value, onChange }) => (
  <div className="flex flex-col pb-3 border-b border-green-500/10 last:border-none">
    <div className="flex justify-between items-center mb-1">
      <label className="text-xs tracking-widest uppercase text-green-300">{label}</label>
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

/* ======================================================
   FormA_NewBuyers (FULL)
   ====================================================== */
export const FormA_NewBuyers = () => {
  const [formData, setFormData] = useState({
    age: "",
    employmentType: "",
    employmentYears: "",
    creditScore: "",
    incomeMonthly: "",
    expensesMonthly: "",
    debtPaymentsMonthly: "",
    propertyValue: "",
    mortgageBalance: "",
    amortizationYears: "",
    interestRate: "",
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
        employment_type: formData.employmentType || "full_time",
        employment_years: toNum(formData.employmentYears),
        income_monthly: toNum(formData.incomeMonthly),
        credit_score: toNum(formData.creditScore),
        property_value: toNum(formData.propertyValue),
        mortgage_balance: toNum(formData.mortgageBalance),
        amortization_remaining: toNum(formData.amortizationYears),
        monthly_payment_current: 0, // new buyers
        expenses_monthly: toNum(formData.expensesMonthly),
        debt_payments_monthly: toNum(formData.debtPaymentsMonthly),
        interest_rate_current: toNum(formData.interestRate),
        rate_type: "fixed", // initial choice; backend can override
        pref_low_payment: toNum(formData.pref_low_payment, 0.5),
        pref_flexibility: toNum(formData.pref_flexibility, 0.5),
        pref_stability: toNum(formData.pref_stability, 0.5),
        pref_fast_payoff: toNum(formData.pref_fast_payoff, 0.5),
        pref_equity_growth: toNum(formData.pref_equity_growth, 0.5),
        pref_risk_tolerance: toNum(formData.pref_risk_tolerance, 0.5),
        steady_payment: 1,
      };

      const API_BASE = "http://localhost:8080/api/mortgage";
      const res = await fetch(`${API_BASE}/approval`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || data?.error || `Request failed (${res.status})`);

      setApiResult(data);
      setApiError(null);
    } catch (err) {
      console.error("Approval error:", err);
      setApiError(String(err));
      setApiResult(null);
    }
  };

  return (
    <div className="flex justify-center px-4 mt-10">
      <div className="w-full max-w-7xl">
        {/* =================== Main Layout =================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left column */}
          <div className="space-y-7">
            {/* Personal & Employment */}
            <div className="rounded-2xl bg-black/40 backdrop-blur-lg p-6 shadow-[0_0_25px_rgba(0,255,200,0.15)] border border-white/34">
              <h2 className="tracking-[0.25em] uppercase text-green-400 text-base font-bold mb-6">
                Personal & Employment
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <FloatingInput
                  type="number"
                  name="age"
                  label="Age"
                  value={formData.age}
                  onChange={handleChange}
                  increment={() => increment("age")}
                  decrement={() => decrement("age")}
                />
                <FloatingStepper
                  label="Employment Type"
                  name="employmentType"
                  value={formData.employmentType}
                  setValue={(val) => setFormData((prev) => ({ ...prev, employmentType: val }))}
                  options={["self_employed", "unemployed", "contract", "full_time"]}
                />
                <FloatingInput
                  type="number"
                  name="employmentYears"
                  label="Employment Years"
                  value={formData.employmentYears}
                  onChange={handleChange}
                  increment={() => increment("employmentYears")}
                  decrement={() => decrement("employmentYears")}
                />
                <FloatingInput
                  type="number"
                  name="creditScore"
                  label="Credit Score"
                  value={formData.creditScore}
                  onChange={handleChange}
                  increment={() => increment("creditScore")}
                  decrement={() => decrement("creditScore")}
                />
              </div>
            </div>

            {/* Property & Mortgage */}
            <div className="rounded-2xl bg-black/40 backdrop-blur-lg p-6 shadow-[0_0_25px_rgba(0,255,100,0.15)] border border-white/34">
              <h2 className="tracking-[0.25em] uppercase text-green-400 text-base font-bold mb-6">
                Property & Mortgage
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <FloatingInput
                  type="number"
                  name="propertyValue"
                  label="Property Value"
                  value={formData.propertyValue}
                  onChange={handleChange}
                  increment={() => increment("propertyValue")}
                  decrement={() => decrement("propertyValue")}
                />
                <FloatingInput
                  type="number"
                  name="mortgageBalance"
                  label="Desired Mortgage Balance"
                  value={formData.mortgageBalance}
                  onChange={handleChange}
                  increment={() => increment("mortgageBalance")}
                  decrement={() => decrement("mortgageBalance")}
                />
                <FloatingInput
                  type="number"
                  name="amortizationYears"
                  label="Amortization (Years)"
                  value={formData.amortizationYears}
                  onChange={handleChange}
                  increment={() => increment("amortizationYears")}
                  decrement={() => decrement("amortizationYears")}
                />
                <FloatingInput
                  type="number"
                  step="0.01"
                  name="interestRate"
                  label="Interest Rate (%)"
                  value={formData.interestRate}
                  onChange={handleChange}
                  increment={() => increment("interestRate", 0.01)}
                  decrement={() => decrement("interestRate", 0.01)}
                />
              </div>
            </div>

            {/* Financial */}
            <div className="rounded-2xl bg-black/40 backdrop-blur-lg p-6 shadow-[0_0_25px_rgba(0,255,100,0.15)] border border-white/34">
              <h2 className="tracking-[0.25em] uppercase text-green-400 text-base font-bold mb-6">
                Financial
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput
                  type="number"
                  name="incomeMonthly"
                  label="Income"
                  value={formData.incomeMonthly}
                  onChange={handleChange}
                  increment={() => increment("incomeMonthly")}
                  decrement={() => decrement("incomeMonthly")}
                />
                <FloatingInput
                  type="number"
                  name="expensesMonthly"
                  label="Expenses"
                  value={formData.expensesMonthly}
                  onChange={handleChange}
                  increment={() => increment("expensesMonthly")}
                  decrement={() => decrement("expensesMonthly")}
                />
                <div className="md:col-span-2">
                  <FloatingInput
                    type="number"
                    name="debtPaymentsMonthly"
                    label="Debt Payments"
                    value={formData.debtPaymentsMonthly}
                    onChange={handleChange}
                    increment={() => increment("debtPaymentsMonthly")}
                    decrement={() => decrement("debtPaymentsMonthly")}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-12">
            {/* Preferences A */}
            <div className="rounded-2xl bg-black/40 backdrop-blur-lg p-6 shadow-[0_0_25px_rgba(0,255,100,0.15)] border border-white/34">
              <h2 className="tracking-[0.25em] uppercase text-green-400 text-base font-bold mb-6">
                Preferences A
              </h2>
              <div className="flex flex-col space-y-4">
                <PreferenceSlider
                  name="pref_low_payment"
                  label="Low Payment"
                  value={formData.pref_low_payment}
                  onChange={handleChange}
                />
                <PreferenceSlider
                  name="pref_stability"
                  label="Stability"
                  value={formData.pref_stability}
                  onChange={handleChange}
                />
                <PreferenceSlider
                  name="pref_risk_tolerance"
                  label="Risk Tolerance"
                  value={formData.pref_risk_tolerance}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Preferences B */}
            <div className="rounded-2xl bg-black/40 backdrop-blur-lg p-6 shadow-[0_0_25px_rgba(0,255,100,0.15)] border border-white/34">
              <h2 className="tracking-[0.25em] uppercase text-green-400 text-base font-bold mb-6">
                Preferences B
              </h2>
              <div className="flex flex-col space-y-4">
                <PreferenceSlider
                  name="pref_fast_payoff"
                  label="Fast Payoff"
                  value={formData.pref_fast_payoff}
                  onChange={handleChange}
                />
                <PreferenceSlider
                  name="pref_equity_growth"
                  label="Equity Growth"
                  value={formData.pref_equity_growth}
                  onChange={handleChange}
                />
                <PreferenceSlider
                  name="pref_flexibility"
                  label="Flexibility"
                  value={formData.pref_flexibility}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>

        {/* =================== Submit + Output =================== */}
        <div className="mt-12 flex flex-col items-center mb-5">
          <button
            type="button"
            className="px-12 py-3 rounded-full font-semibold text-black 
              bg-gradient-to-r from-green-400 via-green-500 to-lime-400 
              hover:from-green-500 hover:via-green-600 hover:to-lime-500 
              shadow-[0_0_25px_rgba(0,255,100,0.6)] 
              transition-all hover:scale-105"
            onClick={handleSubmit}
          >
            Run Optimization
          </button>

          {/* Output boxes (no raw JSON) */}
          {apiResult && (
            <BinaryOutput
              decision={apiResult?.decision}
              confidence={apiResult?.approval_probability}
              rateType={apiResult?.rate_type}
              rate={apiResult?.rate_percent ?? null}
            />
          )}

          {apiError && (
            <div className="mt-6 p-4 bg-red-900/40 border border-red-500/30 rounded-xl w-full max-w-xl text-red-300 font-mono text-sm">
              Error: {apiError}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
