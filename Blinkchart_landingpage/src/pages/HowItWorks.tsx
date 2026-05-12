import React, { useRef } from "react";
import { HiOutlineArrowUpTray, HiOutlineChartBar, HiOutlineArrowDownTray } from "react-icons/hi2";
import "../components/hero.css";

const HowItWorks: React.FC = () => {
  const howCardsRef = useRef<HTMLDivElement | null>(null);
  const scrollHowCards = (direction: number) => {
    if (howCardsRef.current) {
      howCardsRef.current.scrollBy({ left: direction * 280, behavior: "smooth" });
    }
  };

  return (
    <section className="how-container" id="how">
      <h2 className="how-title">How It Works</h2>
      <p className="how-subtitle">Four steps. Zero complexity.</p>

      <div className="how-cards-wrapper">
        <button className="how-arrow how-arrow-left" onClick={() => scrollHowCards(-1)} aria-label="Scroll left">‹</button>
        <div className="how-cards" ref={howCardsRef}>
        {/* STEP 1 */}
        <div className="how-card">
          <div className="how-icon">
            <HiOutlineArrowUpTray />
          </div>
          <h3>Upload CSV or Excel File</h3>
          <p>
            Drag &amp; drop any CSV or Excel file. We support only CSV and Excel files.
          </p>
          <div className="how-step">1</div>
        </div>

        {/* STEP 2 */}
        <div className="how-card">
          <div className="how-icon">
            <HiOutlineArrowUpTray />
          </div>
          <h3>Clean Data</h3>
          <p>
            Remove duplicates, normalize formats, and fix invalid entries for accurate results.
          </p>
          <div className="how-step">2</div>
        </div>

        {/* STEP 3 (HIGHLIGHTED) */}
        <div className="how-card active">
          <div className="how-icon">
            <HiOutlineChartBar />
          </div>
          <h3>Structuring &amp; Chart Generation</h3>
          <p>
            BlinkChart detects headers, values, and categories automatically.
            It selects the best chart type and generates a clean visual in
            seconds.
          </p>
          <div className="how-step">3</div>
        </div>

        {/* STEP 4 */}
        <div className="how-card">
          <div className="how-icon">
            <HiOutlineArrowDownTray />
          </div>
          <h3>Export Your Chart</h3>
          <p>
            Download charts as PNG, SVG, or PDF, ready for reports, slides, or analysis.
            No formatting needed.
          </p>
          <div className="how-step">4</div>
        </div>
      </div>
      <button className="how-arrow how-arrow-right" onClick={() => scrollHowCards(1)} aria-label="Scroll right">›</button>
    </div>
    </section>
  );
};

export default HowItWorks;
