import { Footer } from "../components/Footer";
import { MortgageHeader } from "../components/MortgageHeader";
import { MortgageOption } from "../components/MortgageOption";
import { FintechBackground } from "../components/FintechBackground"; 

export const Home = () => {
  return (
    <>
      
      <div className="relative min-h-screen bg-black text-white overflow-hidden">
        <FintechBackground />
        <div className="relative z-10">
          <MortgageHeader />
          <main className="px-6 py-12">
            <MortgageOption />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};


