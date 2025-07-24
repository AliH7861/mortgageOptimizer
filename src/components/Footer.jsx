import { ArrowUp } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
      {" "}
      <p className="text-sm text-muted-foreground">
        {" "}
        &copy; {new Date().getFullYear()} 𝕬𝕳.co. All rights reserved.
      </p>
      <a
        href="#hero"
        className="p-2 rounded-full bg-red/10 hover:bg-redy/20 text-red transition-colors"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};