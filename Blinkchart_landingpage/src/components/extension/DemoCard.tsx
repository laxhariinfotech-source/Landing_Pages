// ==========================================
// DemoCard.tsx (CLEAN + DYNAMIC VERSION)
// ==========================================

import "./democard.css";
import ChoroplethMap from "./ChoroplethMap";

type Props = {
  title: string;
  chart: string;
  confidence: string;
  scenario: string;
  type?: "line" | "waterfall" | "donut" | "scatter" | "map";
  children: React.ReactNode;
};

export default function DemoCard({
  title,
  chart,
  confidence,
  scenario,
  type = "line",
  children
}: Props) {

  // 🔥 dynamic AI reasoning
  const getWhyText = () => {
    switch (type) {
      case "line":
        return [
          "Time-series pattern detected",
          "Trend progression is the key insight",
          "Multiple metrics over time"
        ];

      case "waterfall":
        return [
          "Positive + negative contributions detected",
          "Sequential financial flow structure",
          "Net value aggregation required"
        ];

      case "donut":
        return [
          "Part-to-whole relationship detected",
          "Values sum to 100%",
          "Categorical comparison required"
        ];

      case "scatter":
        return [
          "Two continuous numeric variables",
          "Correlation pattern detected",
          "No time dimension present"
        ];

      case "map":
        return [
          "Geographic column detected",
          "Regional distribution required",
          "Spatial comparison insight"
        ];

      default:
        return [];
    }
  };

  const alternatives = () => {
    switch (type) {
      case "line":
        return "Area Chart • Column Chart";
      case "waterfall":
        return "Bar Chart • Funnel Chart";
      case "donut":
        return "Pie Chart • Treemap";
      case "scatter":
        return "Bubble Chart • Line Chart";
      case "map":
        return "Bar Chart • Bubble Map";
      default:
        return "";
    }
  };

  return (
    <section className="demo-card">

      {/* LEFT */}
      <div className="demo-left">

        <div className="demo-header">
          <span className="demo-number">AI</span>

          <div className="demo-header-content">
            <h2>{title}</h2>
            <p>{scenario}</p>
          </div>
        </div>

        <div className="demo-table">{children}</div>
      </div>

      {/* RIGHT */}
      <div className="demo-right">

        <div className="ai-card">

          {/* HEADER */}
          <span className="ai-tag">AI RECOMMENDATION</span>
          <h3>{chart}</h3>

          <p className="ai-desc">
            BlinkChart analyzes structure, relationships, trends, and
            semantic patterns to recommend optimal visualization instantly.
          </p>

          {/* CHART */}
          <div className="chart-preview">

            {/* LINE */}
            {type === "line" && (
              <svg viewBox="0 0 320 180" className="chart-svg">
                <defs>
                  <linearGradient id="lineGlow" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ff6a00"/>
                    <stop offset="100%" stopColor="#ffb067"/>
                  </linearGradient>
                </defs>

                <polyline
                  fill="none"
                  stroke="url(#lineGlow)"
                  strokeWidth="5"
                  points="20,140 80,110 140,85 200,55 260,30"
                />
              </svg>
            )}

            {/* WATERFALL */}
            {type === "waterfall" && (
              <div className="waterfall-chart">
                <div className="wf-bar positive" style={{height:"120px"}} />
                <div className="wf-bar positive" style={{height:"80px"}} />
                <div className="wf-bar negative" style={{height:"60px"}} />
                <div className="wf-bar negative" style={{height:"40px"}} />
                <div className="wf-bar total" style={{height:"150px"}} />
              </div>
            )}

            {/* DONUT */}
            {type === "donut" && (
              <div className="donut-chart">
                <div className="donut-center">
                  <strong>34%</strong>
                  <span>{chart}</span>
                </div>
              </div>
            )}

            {/* SCATTER */}
            {type === "scatter" && (
              <div className="scatter-chart">
                <span style={{left:"16%",bottom:"70%"}} />
                <span style={{left:"40%",bottom:"56%"}} />
                <span style={{left:"64%",bottom:"38%"}} />
              </div>
            )}

            {/* MAP */}
            {type === "map" && (
              <div className="choropleth-chart">
                <ChoroplethMap />
              </div>
            )}
          </div>

          {/* CONFIDENCE */}
          <div className="confidence">
            <div className="confidence-top">
              <span>AI Confidence</span>
              <span>{confidence}</span>
            </div>

            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: confidence }}
              />
            </div>
          </div>

          {/* WHY (DYNAMIC) */}
          <div className="why-box">
            <h4>WHY THIS CHART</h4>
            <ul>
              {getWhyText().map((item, i) => (
                <li key={i}>✓ {item}</li>
              ))}
            </ul>
          </div>

          {/* ALTERNATIVES */}
          <div className="alt-box">
            <h4>ALSO CONSIDER</h4>
            <p>{alternatives()}</p>
          </div>

        </div>
      </div>
    </section>
  );
}

