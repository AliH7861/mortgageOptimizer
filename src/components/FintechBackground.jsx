import React from "react";

export const FintechBackground = () => {
  return (
    <div className="absolute inset-0 z-0 bg-black overflow-hidden">
      {/* Glowing grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.15),transparent)]" />

      {/* Floating cubes */}
      {Array.from({ length: 60 }).map((_, i) => (
        <div
          key={`cube-${i}`}
          className="absolute w-6 h-6 bg-green-400/20 animate-cubeGlow rounded-sm"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Binary data stream */}
      {Array.from({ length: 40 }).map((_, i) => (
        <span
          key={`bit-${i}`}
          className="absolute text-green-400/40 font-mono text-xs animate-fall"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * -100}%`,
            animationDuration: `${3 + Math.random() * 4}s`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          {Math.random() > 0.5 ? "0" : "1"}
        </span>
      ))}
    </div>
  );
};
