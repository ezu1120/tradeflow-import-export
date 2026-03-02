import Hero from "./sections/hero";
import TrustBar from "./sections/trust-bar";
import FeaturedServices from "./sections/featured-services";
import ImpactStats from "./sections/impact-stats";
import About from "./sections/about";
import Services from "./sections/services";
import Certifications from "./sections/certifications";
import { StatsContainer } from "./sections/stats-container";
import QuoteForm from "./sections/quote-form";
import TestimonialMarquee from "./sections/testmonial";
import Products from "./sections/products";
import FAQ from "./sections/faq";

export default function Home() {
  return (
    <main className="overflow-hidden">
      <Hero />
      <TrustBar />
      <FeaturedServices />
      <ImpactStats />
      <About />
      <Certifications />
      <Products />
      <FAQ />
      <QuoteForm />
      <TestimonialMarquee />
    </main>
  );
}
