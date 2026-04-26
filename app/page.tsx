import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import WhyUs from "./components/WhyUs";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Team from "./components/Team";
import FAQ from "./components/FAQ";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <About />
      <WhyUs />
      <Projects />
      <Testimonials />
      <Team />
      <FAQ />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
}
