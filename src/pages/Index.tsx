import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PersonasSection from "@/components/PersonasSection";
import TrustSection from "@/components/TrustSection";
import NewsSection from "@/components/NewsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <PersonasSection />
      <TrustSection />
      <NewsSection />
      <Footer />
    </div>
  );
};

export default Index;
