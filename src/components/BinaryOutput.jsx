export const BinaryOutput = ({ decision, confidence, rate, scenarios }) => {
  return (
    <section
      id="binaryOutput"
      className="w-full max-w-7xl mx-auto mt-12"
    >
      {/* === Shared Header === */}
      <div className="bg-black/60 border border-green-500/30 rounded-t-2xl px-6 py-3 
        text-xs tracking-[0.25em] uppercase text-green-300 text-center
        shadow-[0_0_12px_rgba(0,255,100,0.2)]">
        Model Output Results
      </div>

      {/* === Two Column Outputs === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 
        bg-black/40 border border-green-500/30 rounded-b-2xl 
        p-6 shadow-[0_0_20px_rgba(0,255,100,0.25)]">
        
        {/* Left Box (Binary Decision) */}
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
          {confidence !== undefined && (
            <p className="text-xs text-gray-400 mt-2">
              Confidence: {(confidence * 100).toFixed(1)}%
            </p>
          )}
        </div>

        {/* Right Box (Rate Recommendation) */}
        <div className="bg-black/60 rounded-xl border border-green-500/20 
          shadow-[0_0_15px_rgba(0,255,100,0.15)] p-6 text-center">
          <h3 className="text-sm uppercase tracking-widest text-green-300 mb-3">
            Rate Decision
          </h3>
          <p className="text-green-400 font-mono text-lg">
            {rate
              ? `The model decided to give you a ${decision?.toLowerCase() === "fail" ? "N/A" : "Fixed/Variable"} rate at ${rate}%.`
              : "Waiting for rate decision..."}
          </p>
        </div>
      </div>
    </section>
  );
};
