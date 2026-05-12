// HeroDemo.tsx

import "./herodemo.css";

export default function HeroDemo() {
  return (
    <section className="hero-demo">

      <div className="hero-badge">
        LIVE DEMO · INSTALL BLINKCHART TO ACTIVATE
      </div>

      <div className="hero-content">

        <div className="hero-left">
          <h1>
            See the AI <br />
            <span>in action.</span>
          </h1>

          <p>
            Five real datasets. Five different chart types.
            BlinkChart auto-detects each table and recommends
            the optimal visualization instantly.
          </p>

          <button>
            Install Free on Chrome →
          </button>
        </div>

        <div className="hero-right">

          <div className="metric-card">
            <h2>5</h2>
            <span>Live datasets</span>
          </div>

          <div className="metric-card">
            <h2>28</h2>
            <span>Chart types</span>
          </div>

          <div className="metric-card">
            <h2>22</h2>
            <span>AI rules</span>
          </div>

          <div className="metric-card">
            <h2>&lt;2s</h2>
            <span>Time to recommend</span>
          </div>

        </div>

      </div>

    </section>
  );
}