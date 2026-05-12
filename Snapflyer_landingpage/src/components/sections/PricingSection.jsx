import { Check } from 'lucide-react';
import { plans } from '../../data/pricing';

function PricingCard({ name, price, period, features, cta, highlighted }) {
  return (
    <div className={`pricing-card ${highlighted ? 'highlighted' : ''}`}>
      {highlighted && <span className="pricing-badge">Most Popular</span>}
      <h3 className="pricing-plan-name">{name}</h3>
      <div className="pricing-price">
        {price === 0 ? (
          '$0'
        ) : (
          <>
            ${price}
            <span>{period}</span>
          </>
        )}
      </div>
      {price === 0 && (
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Free forever
        </div>
      )}
      <div className="pricing-features">
        {features.map((f, i) => (
          <div className="pricing-feature" key={i}>
            <Check size={18} /> {f}
          </div>
        ))}
      </div>
      <a
        href="#"
        className={`btn ${highlighted ? 'btn-primary' : 'btn-outline'}`}
        id={`pricing-cta-${name.toLowerCase()}`}
      >
        {cta}
      </a>
    </div>
  );
}

export default function PricingSection() {
  return (
    <section className="section pricing" id="pricing">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Simple, Transparent Pricing.
          </h2>
          <p className="section-subtitle">
            No hidden fees. Cancel anytime.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
