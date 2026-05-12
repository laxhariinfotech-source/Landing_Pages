import { FiClock, FiTrendingUp } from "react-icons/fi";
import WaitlistForm from "./WaitlistForm";

type HeroSectionProps = {
  waitlistCount: number;
  onSignupSuccess: () => void;
};

const HeroSection: React.FC<HeroSectionProps> = ({ waitlistCount, onSignupSuccess }) => {
  return (
    <section className="lp-wrap lp-section">
      <div className="lp-card">
        <div className="lp-badge">
          <FiTrendingUp style={{ width: 16, height: 16 }} />
          <span>{waitlistCount}+ founders already joined</span>
        </div>

        <h1 className="lp-section-title" style={{ marginTop: 10, maxWidth: 980 }}>
          Turn Excel data into <span className="lp-accent-word">professional</span> charts in <span className="lp-accent-word">seconds</span> — no design skills needed
        </h1>

        <p className="lp-sub" style={{ maxWidth: 900 }}>
          Paste your spreadsheet, pick a chart style, and export a presentation-ready visual instantly. BlinkChart is built for analysts who need speed without sacrificing quality.
        </p>

        <div className="lp-hero-conversion-box">
          <div className="lp-offer lp-offer--hero">
            <p className="lp-offer-main">
              Lock in $9/month forever (launch price $19/month) — save $120/year + 3x chart limits
            </p>
            <p className="lp-urgency" style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <FiClock style={{ width: 16, height: 16 }} />
              Founding member pricing closes at launch
            </p>
          </div>

          <div style={{ marginTop: 10, maxWidth: 700 }}>
            <WaitlistForm source="hero_section" buttonLabel="Join the Waitlist" onSuccess={onSignupSuccess} />
          </div>

          <p className="lp-note">No spam. Early-access invites only.</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
