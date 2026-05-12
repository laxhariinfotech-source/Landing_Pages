import React from 'react';

export default function About() {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">About SnapFlyer</h1>
          <p className="about-hero-subtitle">
            Empowering creators with AI-driven design tools to make stunning visuals effortlessly.
          </p>
        </div>
      </section>

      {/* Incubated By */}
      <section className="section about-incubator">
        <div className="container">
          <div className="about-card">
            <span className="about-label">INCUBATED BY</span>
            <h2 className="about-company-name">LH IdeaCraft Inc.</h2>
            <p className="about-company-desc">
              Snapflyer is developed and backed by LH IdeaCraft Inc., a product innovation lab
              focused on building next-generation productivity tools that help people work smarter
              with AI.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section about-contact-cta">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-subtitle" style={{ marginBottom: '24px' }}>
            Have questions or want to collaborate?
          </p>
          <a
            href="mailto:founder@lhideacraft.com"
            className="btn btn-primary btn-lg"
          >
            founder@lhideacraft.com
          </a>
        </div>
      </section>
    </div>
  );
}
