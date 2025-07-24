import { Navbar } from "../components/Navbar";
import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { PersonalGrid } from "../components/personalGrid";
import { ExperienceTree } from "../components/ExperienceTree";
import { Testimonial } from "../components/TestimonialList";


export const Home = () => {
  return (
    <>
      {/* Background Effects */}
      <StarBackground />
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        
        
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutSection />
          <PersonalGrid />
          <ExperienceTree/>
          <SkillsSection />
          <ProjectsSection />
          <Testimonial />
          <ContactSection />
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

