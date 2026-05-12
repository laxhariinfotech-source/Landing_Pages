import { useEffect, useMemo, useState } from "react";

type Slide = {
  id: string;
  title: string;
  messyRows: Array<[string, string, string]>;
  chartType: "bar" | "line" | "area";
  chartValues: number[];
  chartLabels: string[];
  chartColors: string[];
};

const slides: Slide[] = [
  {
    id: "sales",
    title: "Monthly Revenue",
    messyRows: [
      ["Jan", "12234", "usd"],
      ["FEB", "15500", "USD"],
      ["Mar", "9800", "usd"],
      ["Apr", "17420", "USD"],
      ["May", "16030", "usd"],
    ],
    chartType: "bar",
    chartValues: [58, 74, 46, 83, 77],
    chartLabels: ["Jan", "Feb", "Mar", "Apr", "May"],
    chartColors: ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"],
  },
  {
    id: "pipeline",
    title: "Deal Pipeline",
    messyRows: [
      ["Lead", "43", "cnt"],
      ["Qualified", "27", "count"],
      ["Proposal", "15", "cnt"],
      ["Negot.", "9", "count"],
      ["Won", "6", "cnt"],
    ],
    chartType: "line",
    chartValues: [86, 66, 45, 30, 20],
    chartLabels: ["Lead", "Qual.", "Prop.", "Neg.", "Won"],
    chartColors: ["#f97316", "#14b8a6", "#3b82f6", "#22c55e", "#eab308"],
  },
  {
    id: "marketing",
    title: "Campaign Performance",
    messyRows: [
      ["Email", "2.9", "% ctr"],
      ["Paid", "3.4", "ctr%"],
      ["Social", "1.8", "%CTR"],
      ["SEO", "4.2", "ctr %"],
      ["Referral", "2.6", "% ctr"],
    ],
    chartType: "area",
    chartValues: [55, 64, 34, 79, 48],
    chartLabels: ["Email", "Paid", "Social", "SEO", "Referral"],
    chartColors: ["#ec4899", "#8b5cf6", "#0ea5e9", "#10b981", "#f97316"],
  },
];

const toPlotPoints = (values: number[]) => {
  const width = 380;
  const height = 170;
  const padding = 18;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const yRange = Math.max(max - min, 1);

  return values.map((value, idx) => {
    const x = padding + (idx * (width - padding * 2)) / Math.max(values.length - 1, 1);
    const normalized = (value - min) / yRange;
    const y = height - padding - normalized * (height - padding * 2);
    return { x, y };
  });
};

const renderChart = (slide: Slide) => {
  if (slide.chartType === "bar") {
    return (
      <div className="lp-viz-bars" role="img" aria-label={`${slide.title} bar chart`}>
        {slide.chartValues.map((value, chartIndex) => (
          <div className="lp-viz-bar-wrap" key={`${slide.id}-bar-${chartIndex}`}>
            <div
              className="lp-viz-bar"
              style={{
                height: `${Math.max(value, 8)}%`,
                background: slide.chartColors[chartIndex % slide.chartColors.length],
              }}
            />
            <span className="lp-viz-x-label">{slide.chartLabels[chartIndex]}</span>
          </div>
        ))}
      </div>
    );
  }

  const points = toPlotPoints(slide.chartValues);
  const polylinePoints = points.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPath = `M ${points[0].x} 152 ${points
    .map((point) => `L ${point.x} ${point.y}`)
    .join(" ")} L ${points[points.length - 1].x} 152 Z`;

  return (
    <svg className="lp-viz-svg" viewBox="0 0 380 170" role="img" aria-label={`${slide.title} ${slide.chartType} chart`}>
      <defs>
        <linearGradient id={`lp-gradient-${slide.id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={slide.chartColors[0]} stopOpacity="0.35" />
          <stop offset="100%" stopColor={slide.chartColors[0]} stopOpacity="0.04" />
        </linearGradient>
      </defs>

      <line x1="18" y1="152" x2="362" y2="152" className="lp-viz-axis" />

      {slide.chartType === "area" && <path d={areaPath} fill={`url(#lp-gradient-${slide.id})`} />}

      <polyline points={polylinePoints} className="lp-viz-line" style={{ stroke: slide.chartColors[0] }} />

      {points.map((point, chartIndex) => (
        <g key={`${slide.id}-pt-${chartIndex}`}>
          <circle cx={point.x} cy={point.y} r="4" fill={slide.chartColors[chartIndex % slide.chartColors.length]} />
          <text x={point.x} y="164" textAnchor="middle" className="lp-viz-label">
            {slide.chartLabels[chartIndex]}
          </text>
        </g>
      ))}
    </svg>
  );
};

const BeforeAfter: React.FC = () => {
  const [index, setIndex] = useState(0);

  const active = useMemo(() => slides[index], [index]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
    }, 3800);

    return () => window.clearInterval(timer);
  }, []);

  const goPrev = () => setIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  const goNext = () => setIndex((current) => (current === slides.length - 1 ? 0 : current + 1));

  return (
    <section className="lp-wrap lp-section">
      <h2 className="lp-section-title" style={{ textAlign: "center" }}>
        Before vs <span className="lp-accent-word">After</span>
      </h2>

      <p className="lp-sub" style={{ textAlign: "center", marginTop: 2 }}>
        Same data. Vastly better output quality.
      </p>

      <div className="lp-slide-toolbar">
        <button className="lp-slide-btn" onClick={goPrev} aria-label="Previous comparison slide">
          {'\u2039'}
        </button>

        <div className="lp-slide-meta">{active.title}</div>

        <button className="lp-slide-btn" onClick={goNext} aria-label="Next comparison slide">
          {'\u203A'}
        </button>
      </div>

      <div className="lp-grid-2" style={{ marginTop: 10 }}>
        <div className="lp-box lp-before lp-compare-box">
          <p className="lp-compare-label">Before: Messy Excel data</p>

          <div className="lp-messy-table">
            <div className="lp-messy-row lp-messy-head">
              <span>Channel</span>
              <span>Value</span>
              <span>Format</span>
            </div>
            {active.messyRows.map((row) => (
              <div className="lp-messy-row" key={row[0]}>
                <span>{row[0]}</span>
                <span>{row[1]}</span>
                <span>{row[2]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lp-box lp-after lp-compare-box">
          <p className="lp-compare-label lp-compare-label--after">After: BlinkChart polished output</p>

          <div className="lp-chart-panel">
            <div className="lp-chart-title">{active.title}</div>
            {renderChart(active)}
          </div>
        </div>
      </div>

      <div className="lp-slide-dots" aria-label="Comparison slides">
        {slides.map((slide, dotIndex) => (
          <button
            key={slide.id}
            type="button"
            className={`lp-dot ${dotIndex === index ? "active" : ""}`}
            onClick={() => setIndex(dotIndex)}
            aria-label={`Show ${slide.title} comparison`}
          />
        ))}
      </div>
    </section>
  );
};

export default BeforeAfter;
