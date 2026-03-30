import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import AiDemoSection from "@/components/sections/AiDemoSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import VibeCodingSection from "@/components/sections/VibeCodingSection";
import WhoItsForSection from "@/components/sections/WhoItsForSection";
import CtaSection from "@/components/sections/CtaSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between w-full overflow-hidden relative">
      {/* Global Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
        <div className="absolute top-1/4 -left-20 w-[40rem] h-[40rem] bg-marmot-orange/10 rounded-full blur-[100px] animate-blob" />
        <div className="absolute top-3/4 right-0 w-[50rem] h-[50rem] bg-marmot-orange/5 rounded-full blur-[120px] animate-blob" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-[#F5E6D3]/40 rounded-full blur-[150px] animate-blob block mix-blend-multiply" style={{ animationDelay: '5s' }} />
      </div>

      <Navbar />
      <div className="w-full relative z-0">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <AiDemoSection />
        <FeaturesSection />
        <ComparisonSection />
        <VibeCodingSection />
        <WhoItsForSection />
        <CtaSection />
      </div>
      <div className="w-full bg-marmot-card">
         <Footer />
      </div>
    </main>
  );
}
