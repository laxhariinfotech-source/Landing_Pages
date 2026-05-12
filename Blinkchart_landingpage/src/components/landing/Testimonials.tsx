import WaitlistForm from "./WaitlistForm";

const testimonials = [
  {
    quote: "I used to spend 45 minutes polishing each chart for board decks. BlinkChart got that down to 5.",
    name: "Arnes Doss",
    role: "Senior Solution Analyst-Everstage",
  },
  {
    quote: "Our finance updates look cleaner and more consistent now. Huge time saver before leadership reviews.",
    name: "Vincent Mark",
    role: " Chartered Accountant ",
  },
  {
    quote: "Best part is I do not need to touch design tools anymore. Excel in, polished charts out.",
    name: "Rock Antony",
    role: "VP- BNY",
  },
];

type TestimonialsProps = {
  waitlistCount: number;
  onSignupSuccess: () => void;
};

const Testimonials: React.FC<TestimonialsProps> = ({ waitlistCount, onSignupSuccess }) => {
  return (
    <section className="lp-wrap lp-section">
      <div className="lp-card">
        <p style={{ fontSize: 12, fontWeight: 700, color: "#ff6600", textTransform: "uppercase" }}>Trusted by early adopters</p>
        <h2 className="lp-section-title" style={{ marginTop: 8, marginBottom: 12 }}>Join <span className="lp-accent-word">{waitlistCount}+</span> professionals already on the <span className="lp-accent-word">waitlist</span></h2>

        <div className="lp-grid-3">
          {testimonials.map((item) => (
            <article key={item.name} className="lp-box">
              <p style={{ color: "#334155" }}>{item.quote}</p>
              <p style={{ marginTop: 10, fontWeight: 700, color: "#0f172a" }}>{item.name}</p>
              <p style={{ fontSize: 14, color: "#64748b" }}>{item.role}</p>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap", gap: 8, fontSize: 12, color: "#6b7280", fontWeight: 700, textTransform: "uppercase" }}>
          <span className="lp-badge" style={{ background: "#f8fafc", color: "#475569", borderColor: "#e2e8f0" }}>Secure payments at launch</span>
          <span className="lp-badge" style={{ background: "#f8fafc", color: "#475569", borderColor: "#e2e8f0" }}>Cancel anytime</span>
          <span className="lp-badge" style={{ background: "#f8fafc", color: "#475569", borderColor: "#e2e8f0" }}>GDPR-conscious data handling</span>
        </div>

        <div style={{ marginTop: 12, maxWidth: 720 }}>
          <WaitlistForm source="testimonials_section" buttonLabel="Join the Waitlist" compact onSuccess={onSignupSuccess} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
