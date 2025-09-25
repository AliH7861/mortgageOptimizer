export const Form = () => {
  return (
    <section
      id="main-form"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-50  mt-20"
    >
      <div
        id="container"
        className="w-full max-w-7xl bg-white rounded-2xl shadow-lg p-8 "
      >
        {/* Upper Bar */}
        <div
          id="upper-bar"
          className="flex justify-center gap-6 mb-6"
        >
          <button
            id="firsttime"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            First Time
          </button>
          <button
            id="oldmember"
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Returning
          </button>
        </div>

        {/* Form */}
        <form
          id="form"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-5"
        >
          {/* Demographics */}
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              name="age"
              className="w-full border rounded-lg p-2"
              placeholder="Enter your age"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Employment Type</label>
            <select
              name="employment_type"
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select</option>
              <option value="full-time">Full-Time</option>
              <option value="contract">Contract</option>
              <option value="self-employed">Self-Employed</option>
              <option value="seasonal">Seasonal</option>
              <option value="unemployed">Unemployed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Employment Years</label>
            <input
              type="number"
              name="employment_years"
              className="w-full border rounded-lg p-2"
              placeholder="Years employed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Monthly Income ($)</label>
            <input
              type="number"
              name="income_monthly"
              className="w-full border rounded-lg p-2"
              placeholder="e.g. 5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Monthly Expenses ($)</label>
            <input
              type="number"
              name="expenses_monthly"
              className="w-full border rounded-lg p-2"
              placeholder="e.g. 2000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Monthly Debt Payments ($)</label>
            <input
              type="number"
              name="debt_payments_monthly"
              className="w-full border rounded-lg p-2"
              placeholder="e.g. 500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Credit Score</label>
            <input
              type="number"
              name="credit_score"
              className="w-full border rounded-lg p-2"
              placeholder="e.g. 720"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Property Value ($)</label>
            <input
              type="number"
              name="property_value"
              className="w-full border rounded-lg p-2"
              placeholder="e.g. 400000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mortgage Balance ($)</label>
            <input
              type="number"
              name="mortgage_balance"
              className="w-full border rounded-lg p-2"
              placeholder="e.g. 250000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Amortization Remaining (years)</label>
            <input
              type="number"
              name="amortization_remaining"
              className="w-full border rounded-lg p-2"
              placeholder="e.g. 20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mortgage Term (years)</label>
            <input
              type="number"
              name="mortgage_term_years"
              className="w-full border rounded-lg p-2"
              placeholder="e.g. 5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Current Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              name="interest_rate_current"
              className="w-full border rounded-lg p-2"
              placeholder="e.g. 5.25"
            />
          </div>

          {/* Preferences */}
          <div className="col-span-4 mt-4">
            <h3 className="text-lg font-semibold mb-2">Preferences</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                "Low Payment",
                "Fast Payoff",
                "Equity Growth",
                "Flexibility",
                "Stability",
                "Risk Tolerance",
              ].map((pref) => (
                <div key={pref}>
                  <label className="block text-sm font-medium">{pref}</label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    name={`pref_${pref.toLowerCase().replace(" ", "_")}`}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Submit */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mr-5"
          >
            Reset 
          </button>
           <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit
          </button>




        </div>
      </div>
    </section>
  );
};

