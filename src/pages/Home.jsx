import { Footer } from "../components/Footer";
import { BinaryOutput } from "../components/BinaryOutput";
import { MortgageHeader } from "../components/MortgageHeader";
import { FormA_NewBuyers } from "../components/FormA_NewBuyers";
import { FormB_ReturningBuyers } from "../components/FormB_ReturningBuyers";
import { MortgageOption } from "../components/MortgageOption";

// import {MortgageOption} from "../components/MortgageOption"



export const Home = () => {
  return (
    <>
      {/* Background Effects */}
      
      <div className="min-h-screen bg-black text-foreground overflow-x-hidden ">
        
        
        {/* Navbar */}
    
        <MortgageHeader/>
        {/* Main Content */}
        <main>
         <MortgageOption/> 
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

