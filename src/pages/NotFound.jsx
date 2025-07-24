import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";

export const NotFound = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-0 bg-background text-foreground">
        {/* Theme Toggle */}
        <StarBackground />
        <ThemeToggle />
        <div className="container mx-auto max-w-5xl flex flex-col items-center justify-center h-screen">
          <h1 className="text-6xl font-bold mb-4 text-red-500">404</h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Oops! The page you are looking for does not exist.
          </p>
          <h2 className="text-4xl font-bold flex justify-center items-center text-red-500">
            Not Found
          </h2>
        </div>
      </div>
    </div>
  );
};
