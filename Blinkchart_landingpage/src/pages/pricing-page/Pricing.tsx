import { useState } from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../../../lib/analytics";
import "./pricing.css";

export default function Pricing() {
  // ...existing code...
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section className="pricing-page">

      <h1 className="pricing-main-title">
        Simple Pricing, Massive Value.
      </h1>

      <p className="pricing-main-subtitle">
        Join the waitlist to get early access.
      </p>

      {/* Toggle */}
      <div className="billing-toggle">
        <button
          className={!isAnnual ? "billing-btn active" : "billing-btn"}
          onClick={() => setIsAnnual(false)}
        >
          Monthly
        </button>

        <button
          className={isAnnual ? "billing-btn annual active" : "billing-btn annual"}
          onClick={() => setIsAnnual(true)}
        >
          Annual
          <span className="best-badge">BEST VALUE</span>
        </button>
      </div>

      {/* Center Card */}
      <div className="pricing-center">
        <div className="pricing-card">

          <div className="standard-badge">
            STANDARD PLAN
          </div>

          <div className="price-row">
            <div className="price-main">
              ${isAnnual ? "209" : "19"}
            </div>
            <div className="price-duration">
              / {isAnnual ? "year" : "month"}
            </div>
          </div>

          {isAnnual && (
                <div style={{ fontSize: "14px", fontWeight: "700", marginTop: "8px", color: "#000" }}>
              Billed annually
            </div>
          )}

          <div className="annual-note">
            🔥 Save More with Annual — Get 1 Month Free
          </div>

          <Link
            className="waitlist-button"
            to="/joinwaitlist"
            onClick={() => trackEvent({ action: "click_waitlist_cta", category: "engagement", label: "pricing_featured" })}
          >
            Join Waitlist
          </Link>


          <div className="pricing-features-grid">
            <div className="pricing-feature">Unlimited Chart Creation</div>
            <div className="pricing-feature">100+ Premium Chart Templates</div>
            <div className="pricing-feature">AI-Powered Data-to-Chart Structuring</div>
            <div className="pricing-feature">Built-In Data Cleanup Tools</div>
            <div className="pricing-feature">Export in PNG, SVG, and PDF</div>
            <div className="pricing-feature">Social-Ready Visual Content</div>
            <div className="pricing-feature">Advanced Visualization Beyond Basic Charts</div>
          </div>

        </div>
      </div>

    </section>
  );
}
