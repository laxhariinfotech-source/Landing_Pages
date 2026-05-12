import React, { useEffect } from 'react';
import HeroSection from '../sections/HeroSection';
import TemplateGallery from '../sections/TemplateGallery';
import HowItWorks from '../sections/HowItWorks';
import FeaturesGrid from '../sections/FeaturesGrid';
import TestimonialsSection from '../sections/TestimonialsSection';
import PricingSection from '../sections/PricingSection';
import CTABanner from '../sections/CTABanner';

export default function Home() {
  // Scroll-reveal with IntersectionObserver
  useEffect(() => {
    const elementsToReveal = document.querySelectorAll('.section, [data-reveal]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    elementsToReveal.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky-scroll-wrapper">
      <HeroSection />
      <TemplateGallery />
      <HowItWorks />
      <FeaturesGrid />
      <TestimonialsSection />
      <PricingSection />
      <CTABanner />
    </div>
  );
}
