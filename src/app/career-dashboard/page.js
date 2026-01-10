import "./styles.css";
import Hero from "./components/Hero";
import WhyMatters from "./components/WhyMatters";
import Goals from "./components/Goals";
import Education from "./components/Education";
import Skills from "./components/Skills";
import ExtraCurricular from "./components/ExtraCurricular";
import Opportunities from "./components/Opportunities";
import Earnings from "./components/Earnings";
import UXHighlight from "./components/UXHighlight";
import CTA from "./components/CTA";

export default function Page() {
  return (
    <div className="dashboard-wrapper">
      <Hero />
      <WhyMatters />
      <Goals />
      <Education />
      <Skills />
      <ExtraCurricular />
      <Opportunities />
      <Earnings />
      <UXHighlight />
      <CTA />
    </div>
  );
}
