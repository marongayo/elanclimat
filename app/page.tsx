import Hero from "@/components/home-components/Hero";
import AboutSection from "@/components/home-components/AboutSection";
import ContactSection from "@/components/home-components/ContactSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
