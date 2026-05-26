import Hero from "@/components/home-components/Hero";
import AboutSection from "@/components/home-components/AboutSection";
import ContactSection from "@/components/home-components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
