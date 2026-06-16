import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustedBy from "@/components/landing/TrustedBy";
import Features from "@/components/landing/Features";
import ProductShowcase from "@/components/landing/ProductShowcase";
import AgentSection from "@/components/landing/AgentSection";
import WorkflowSection from "@/components/landing/WorkflowSection";
import Testimonials from "@/components/landing/Testimonials";
import FAQ from "@/components/landing/FAQ";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white">
      <Navbar />

      <Hero />

      <TrustedBy />

      <Features />

      <ProductShowcase />

      <AgentSection />

      <WorkflowSection />

      <Testimonials />

      <FAQ />

      <CTA />

      <Footer />
    </main>
  );
}
