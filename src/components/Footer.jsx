import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer
      className="py-8 px-6 bg-black/20 border-t border-green-500/20 mt-16 
      flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left"
    >
      <p className="text-sm text-gray-400 mb-3">
        &copy; {new Date().getFullYear()} MortgageOptimizer.co — All rights reserved.
      </p>

      <a
        href="#hero"
        className="p-2 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-400 
        transition-colors shadow-[0_0_12px_rgba(0,255,100,0.4)] 
        hover:shadow-[0_0_20px_rgba(0,255,100,0.6)]"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};

