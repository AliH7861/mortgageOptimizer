import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle"; // Update path as needed

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Shadow effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav
        className={cn(
          "fixed w-full z-40 transition-all duration-300",
          isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <a
            className="text-xl font-bold text-primary flex items-center"
            href="#hero"
          >
            <span className="relative z-10">
              <span className="text-glow text-foreground"> 𝕬 </span>
              <span className="text-red">𝕳 </span>
            </span>
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* NAVBAR ACTIONS: ThemeToggle + Hamburger/Menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {/* Hamburger menu is only visible on mobile */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-foreground z-50"
              aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE NAV OVERLAY (outside .container, fills screen) */}
      <div
        className={cn(
          "fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col justify-center items-center",
          "transition-all duration-300 lg:hidden",
          isMenuOpen
            ? "opacity-80 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        {/* X Close Button in top-right */}
        <button
          className="absolute top-6 right-6 text-white text-3xl p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Close Menu"
          tabIndex={isMenuOpen ? 0 : -1}
        >
          <X size={36} />
        </button>
        {/* Centered Links */}
        <div className="flex flex-col items-center gap-8 text-2xl font-bold w-full">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="text-white hover:text-red-400 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};
