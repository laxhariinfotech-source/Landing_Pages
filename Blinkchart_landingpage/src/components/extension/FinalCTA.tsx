// ===============================
// FinalCTA.tsx
// ===============================

import "./finalcta.css";

export default function FinalCTA() {
  return (
    <section className="final-cta">

      <div className="final-box">

        <span>READY TO TRY?</span>

        <h2>
          Install BlinkChart
          <br />
          on your own data.
        </h2>

        <p>
          Works on Excel Online, Google Sheets,
          Airtable, and any webpage with a table.
        </p>

        <div className="final-actions">

          <button className="final-btn primary">
            Install Free on Chrome
          </button>

          <button className="final-btn secondary">
            View Pricing
          </button>

        </div>

      </div>

    </section>
  );
}