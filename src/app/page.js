import FireflyBackground from './components/FireflyBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsBanner from './components/StatsBanner';
import ProblemSolution from './components/ProblemSolution';
import GigWorkSteps from './components/GigWorkSteps';
import PhygitalSection from './components/PhygitalSection';
import TrainingSection from './components/TrainingSection';
import PricingSection from './components/PricingSection';
import BlogsSection from './components/BlogsSection';
import FAQSection from './components/FAQSection';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <FireflyBackground />
      <Header />
      <Hero />
      <StatsBanner />
      <ProblemSolution />
      <GigWorkSteps />
      <PhygitalSection />
      <TrainingSection />
      <PricingSection />
      <BlogsSection />
      <FAQSection />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  );
}