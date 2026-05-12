import { useMemo, useState } from "react";
import HeroSection from "./HeroSection";
import DemoSection from "./DemoSection";
import BeforeAfter from "./BeforeAfter";
import PainPoints from "./PainPoints";
import Features from "./Features";
import Testimonials from "./Testimonials";
import CTASection from "./CTASection";
import "./landing.css";

const LandingPage: React.FC = () => {
  const [waitlistCount, setWaitlistCount] = useState(142);

  const incrementWaitlist = () => {
    setWaitlistCount((current) => current + 1);
  };

  const dynamicCount = useMemo(() => waitlistCount, [waitlistCount]);

  return (
    <main className="lp-root">
      <HeroSection waitlistCount={dynamicCount} onSignupSuccess={incrementWaitlist} />
      <DemoSection />
      <BeforeAfter />
      <PainPoints />
      <Features />
      <Testimonials waitlistCount={dynamicCount} onSignupSuccess={incrementWaitlist} />
      <CTASection onSignupSuccess={incrementWaitlist} />
    </main>
  );
};

export default LandingPage;
