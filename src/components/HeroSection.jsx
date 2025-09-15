import { useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

const titles = [
  "a Machine Learning Engineer",
  "a Software Engineer",
  "a Developer",
  "a Model Builder",
  "a Researcher",
  "a Problem Solver",
  "a Tech Innovator",
  "a Creative Coder",
  "an AI Enthusiast",
];

export const HeroSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % titles.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          {/* Main header: Hi I'm Ali Hakkani */}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight flex flex-wrap items-center justify-center gap-2">
            <span className="opacity-0 animate-fade-in">Hi, I'm</span>
            <span className="text-red opacity-0 animate-fade-in-delay-1 ml-2">
              Ali
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              Hakkani
            </span>
          </h1>
          
          {/* Animated subtitle: cycling through roles */}
          <div
            className="relative w-full flex justify-center mb-10"
            style={{ minHeight: "1.4em" }}
          >
            {titles.map((title, i) => (
              <span
                key={i}
                className={`
                  absolute left-1/2 top-0 text-xl md:text-3xl font-semibold
                  transition-opacity duration-500
                  ${i === index ? "opacity-100" : "opacity-0"}
                  text-gradient
                `}
                style={{
                  transition: "opacity 0.5s",
                  whiteSpace: "nowrap",
                  transform: "translateX(-50%)",
                }}
              >
                {title}
              </span>
            ))}
          </div>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Software engineering student passionate about machine learning and AI.
            Building skills in data science, model development, and AI applications to solve real-world problems.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button bg-red m-5">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2 text-dark dark:text-white"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary text-red" />
      </div>
    </section>
  );
};
