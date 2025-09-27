import React from "react";

export const MortgageHeader = () => {
  return (
    <header className="w-full  py-6 shadow-md" id="hero">
      <div className="container mx-auto flex justify-center items-center">
        <h1
          className="text-5xl md:text-6xl font-light tracking-[0.25em] 
          text-transparent bg-clip-text 
          bg-gradient-to-r from-green-500 via-green-400 to-green-300 
          drop-shadow-[0_0_12px_rgba(0,255,100,0.7)] 
          suse-mono-header pt-5 mt-2"
        >
          MORTGAGE OPTIMIZER
        </h1>
      </div>
    </header>
  );
};
