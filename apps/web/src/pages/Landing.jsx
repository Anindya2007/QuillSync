import Navbar from "../components/layout/Navbar";
import Hero from "../components/ui/Hero";
import Features from "../components/ui/Features";
import Footer from "../components/layout/Footer";

export default function Landing() {
  return (
    <>
      <Navbar />

      <div
        className="bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
        }}
      >
        <Hero />
      </div>

      <Features />

      <Footer />
    </>
  );
}