import WaitlistForm from "./WaitlistForm";

type CTASectionProps = {
  onSignupSuccess: () => void;
};

const CTASection: React.FC<CTASectionProps> = ({ onSignupSuccess }) => {
  return (
    <section className="lp-wrap lp-section">
      <div className="lp-final">
        <h2 className="lp-section-title" style={{ marginBottom: 8 }}>Get <span className="lp-accent-word">Early Access</span> to <span className="lp-accent-word">BlinkChart</span></h2>
        <p className="lp-sub" style={{ maxWidth: 860 }}>
          Lock in $9/month forever (launch price $19/month) — save $120/year + 3x chart limits
        </p>
        <p className="lp-urgency" style={{ marginTop: 4 }}>Founding member pricing closes at launch</p>

        <div style={{ marginTop: 12, maxWidth: 720 }}>
          <WaitlistForm source="final_cta" buttonLabel="Get Early Access" onSuccess={onSignupSuccess} />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
