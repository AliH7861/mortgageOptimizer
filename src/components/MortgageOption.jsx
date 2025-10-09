import React, { useState } from "react";
import { FormA_NewBuyers } from "./FormA_NewBuyers";
import { FormB_ReturningBuyers } from "./FormB_ReturningBuyers";
import { BinaryOutput } from "./BinaryOutput";
import { BinaryOutputB } from "./BinaryOutputB";

export const MortgageOption = () => {
  const [selected, setSelected] = useState("new");

  const options = [
    { key: "new", label: "New Mortgage" },
    { key: "renew", label: "Renew Mortgage" },
  ];

  return (
    <div className="w-full flex flex-col items-center py-8 space-y-10">
      <div className="flex bg-black/40 backdrop-blur-md p-1 rounded-full shadow-[0_0_15px_#10b981]">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setSelected(opt.key)}
            className={`px-6 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
              selected === opt.key
                ? "bg-green-400 text-black shadow-[0_0_15px_#10b981]"
                : "text-gray-300 hover:text-emerald-400"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="w-full max-w-7xl">
        {selected === "new" ? <FormA_NewBuyers /> : <FormB_ReturningBuyers />}
        
      </div>
    </div>
  );
};
