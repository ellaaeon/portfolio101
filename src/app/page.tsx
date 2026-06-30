import AppProviders from "@/components/providers/AppProviders";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Dashboard from "@/components/Dashboard";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SectionObserver from "@/components/ui/SectionObserver";

export default function Home() {
  return (
    <AppProviders>
      <Navbar />
      <main>
        <Hero />
        <SectionObserver id="about">
          <About />
        </SectionObserver>
        <SectionObserver id="dashboard">
          <Dashboard />
        </SectionObserver>
        <SectionObserver id="experience">
          <Experience />
        </SectionObserver>
        <SectionObserver id="projects">
          <Projects />
        </SectionObserver>
        <SectionObserver id="skills">
          <Skills />
        </SectionObserver>
        <SectionObserver id="contact">
          <Contact />
        </SectionObserver>
      </main>
      <Footer />
    </AppProviders>
  );
}
