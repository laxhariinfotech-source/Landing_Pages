
import { trackEvent } from "../../../lib/analytics";
import { Link } from "react-router-dom";

type PricingProps = {
  plan: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
};

export default function PricingCard({
  plan,
  price,
  description,
  features,
  popular
}: PricingProps) {
  const defaultFeatures = [
    "Unlimited Chart Creation",
    "100+ Premium Chart Templates",
    "AI-Powered Data-to-Chart Structuring",
    "Built-In Data Cleanup Tools",
    "Export in PNG, SVG, and PDF",
    "Social-Ready Visual Content",
    "Advanced Visualization Beyond Basic Charts"
  ];
  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <div className={`pricing-card ${popular ? "popular" : ""}`}>
      {popular && <div className="badge">MOST POPULAR</div>}

      <h3>{plan}</h3>
      <div className="price">
        {price}
        <span>/mo</span>
      </div>

      <p className="desc">{description}</p>
      <div className="annual-note">
        🔥 Save More with Annual — Get 1 Month Free
      </div>

      <ul>
        {displayFeatures.map((item, index) => (
          <li key={index} className="pricing-feature-item">
            <span className="feature-check">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <Link
        className={popular ? "primary-btn" : "outline-btn"}
        to="/joinwaitlist"
        onClick={() => trackEvent({ action: "click_waitlist_cta", category: "engagement", label: `pricing_${plan.toLowerCase()}` })}
      >
        Join Waitlist
      </Link>

    </div>
  );
}