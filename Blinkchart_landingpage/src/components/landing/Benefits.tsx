import React, { memo } from "react";

const benefits = [
  {
    icon: "⚡",
    title: "Save 30+ minutes per chart",
    desc: "What used to take an hour now takes 10 seconds. Seriously. Upload, generate, export — done.",
    color: "#6366f1",
  },
  {
    icon: "🚫",
    title: "No design skills needed",
    desc: "BlinkChart AI handles color, layout, typography, and chart type selection automatically. You just bring the data.",
    color: "#8b5cf6",
  },
  {
    icon: "🎯",
    title: "Instant, export-ready output",
    desc: "Every chart is immediately ready to download as PNG, SVG, or PDF — no touching up required.",
    color: "#06b6d4",
  },
  {
    icon: "📁",
    title: "Works with any Excel or CSV file",
    desc: "Drag & drop any spreadsheet. BlinkChart reads headers, values, and categories automatically.",
    color: "#10b981",
  },
  {
    icon: "🔒",
    title: "Privacy-first processing",
    desc: "All data processing happens locally in your browser. Your files never leave your device.",
    color: "#f59e0b",
  },
  {
    icon: "📈",
    title: "100+ professional templates",
    desc: "From bar charts to complex composed charts — choose a template built for reports, decks, and dashboards.",
    color: "#ec4899",
  },
];

const Benefits: React.FC = memo(() => {
  return (
    <section className="lp-benefits" id="benefits" aria-label="Benefits">
      <div className="lp-benefits__inner">
        <div className="lp-benefits__label">Why BlinkChart</div>
        <h2 className="lp-benefits__title">
          Everything you need.{" "}
          <span className="lp-benefits__accent">Nothing you don't.</span>
        </h2>
        <p className="lp-benefits__sub">
          Built specifically for data analysts, finance teams, and business professionals who need beautiful charts — fast.
        </p>

        <div className="lp-benefits__grid">
          {benefits.map(({ icon, title, desc, color }) => (
            <article key={title} className="lp-benefits__card">
              <div className="lp-benefits__icon-wrap" style={{ "--benefit-color": color } as React.CSSProperties}>
                <span className="lp-benefits__icon" aria-hidden="true">{icon}</span>
              </div>
              <h3 className="lp-benefits__card-title">{title}</h3>
              <p className="lp-benefits__card-desc">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

Benefits.displayName = "Benefits";
export default Benefits;
