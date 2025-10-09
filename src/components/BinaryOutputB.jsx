export const BinaryOutputB = ({ decision, confidence, rate, scenarios }) => {
  return (
    <section
      id="binaryOutput"
      className="w-full max-w-7xl mx-auto mt-12"
    >
      
      <div className="bg-black/60 border border-green-500/30 rounded-t-2xl px-6 py-3 
        text-xs tracking-[0.25em] uppercase text-green-300 text-center
        shadow-[0_0_12px_rgba(0,255,100,0.2)]">
        Model Output Results
      </div>

      {/* Main Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 
        bg-black/40 border border-green-500/30 rounded-b-2xl 
        p-6 shadow-[0_0_20px_rgba(0,255,100,0.25)]">
        
        {/* Left Box */}
        <div className="bg-black/60 rounded-xl border border-green-500/20 
          shadow-[0_0_15px_rgba(0,255,100,0.15)] p-6 text-center">
          <h3 className="text-sm uppercase tracking-widest text-green-300 mb-3">
            Fixed vs Variable
          </h3>
          <div className="text-green-400 font-mono text-lg">
            {decision ? (
              <>
                <span className="text-green-300">Decision →</span>{" "}
                <span className="font-bold">{decision}</span>{" "}
                <span className="text-gray-400">
                  ({(confidence * 100).toFixed(1)}%) @ {rate}%
                </span>
              </>
            ) : (
              <span className="text-gray-500 italic">Waiting for model output...</span>
            )}
          </div>
        </div>

        {/* Right Box */}
        <div className="bg-black/60 rounded-xl border border-green-500/20 
          shadow-[0_0_15px_rgba(0,255,100,0.15)] p-6 text-center">
          <h3 className="text-sm uppercase tracking-widest text-green-300 mb-3">
            Top 2 Recommendation
          </h3>
          <div className="text-green-400 font-mono space-y-2">
            {scenarios && scenarios.length > 0 ? (
              scenarios.map((s, idx) => (
                <div
                  key={idx}
                  className="flex justify-center space-x-2 text-green-300"
                >
                  <span className="font-bold text-green-400">{idx + 1}.</span>
                  <span className="font-semibold">{s.name}</span>
                  <span className="text-gray-400">@ {s.rate}%</span>
                  <span className="text-sm text-gray-500">
                    ({(s.confidence * 100).toFixed(1)}%)
                  </span>
                </div>
              ))
            ) : (
              <span className="text-gray-500 italic">Waiting for model output...</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
