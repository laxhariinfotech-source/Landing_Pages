export default function CTABanner() {
  return (
    <section className="section cta-banner parallax-bg" id="cta-banner" data-reveal="scale" style={{ backgroundImage: 'radial-gradient(circle at center, var(--brand-dark) 0%, #111 100%)', color: 'white' }}>
      <div className="container" data-reveal="fade-up">
        <h2 style={{ color: 'white' }}>Ready to Create Your First Flyer?</h2>
        <p style={{ color: 'var(--neutral-300)' }}>Join 10 million creators. Free forever — no design skills needed.</p>
        <a href="#" className="btn btn-glow btn-lg" id="final-cta">
          Create a Free Flyer
        </a>
        <div className="cta-note" style={{ color: 'var(--neutral-400)' }}>No credit card required · Cancel anytime</div>
      </div>
    </section>
  );
}
