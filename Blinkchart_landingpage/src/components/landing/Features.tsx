import { FiClock, FiFileText, FiStar, FiZap } from "react-icons/fi";

const benefits = [
  {
    title: "Save 30+ minutes per chart",
    detail: "Generate client-ready visuals before your meeting starts.",
    icon: FiClock,
  },
  {
    title: "No design skills needed",
    detail: "Get polished styles instantly from built-in smart templates.",
    icon: FiStar,
  },
  {
    title: "Instant output",
    detail: "Upload, customize, and export in seconds, not hours.",
    icon: FiZap,
  },
  {
    title: "Works with any Excel file",
    detail: "Built for finance, ops, and analyst workflows.",
    icon: FiFileText,
  },
];

const Features: React.FC = () => {
  return (
    <section className="lp-wrap lp-section">
      <h2 className="lp-section-title" style={{ textAlign: "center" }}>What you get with <span className="lp-accent-word">BlinkChart</span></h2>
      <div className="lp-grid-2">
        {benefits.map(({ title, detail, icon: Icon }) => (
          <article key={title} className="lp-box">
            <div className="lp-icon-pill">
              <Icon style={{ width: 24, height: 24 }} />
            </div>
            <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a" }}>{title}</h3>
            <p style={{ marginTop: 8, color: "#4b5563" }}>{detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Features;
