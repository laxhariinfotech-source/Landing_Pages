const painPoints = [
  {
    title: "Hours lost formatting charts",
    detail: "Teams spend meeting time fixing labels, colors, and layout instead of discussing insights.",
  },
  {
    title: "Slides still look inconsistent",
    detail: "Different chart styles across decks make reports look rushed and reduce trust in the data.",
  },
  {
    title: "Analysts become part-time designers",
    detail: "Skilled data people end up tweaking visuals manually instead of shipping analysis faster.",
  },
  {
    title: "Last-minute report pressure",
    detail: "Before stakeholder reviews, chart cleanup becomes a bottleneck that delays decisions.",
  },
];

const PainPoints: React.FC = () => {
  return (
    <section className="lp-wrap lp-section">
      <h2 className="lp-section-title" style={{ textAlign: "center" }}>
        Why Teams <span className="lp-accent-word">Choose</span> <span className="lp-accent-word">BlinkChart</span>
      </h2>
      <p className="lp-sub" style={{ textAlign: "center", maxWidth: 860, margin: "0 auto 16px" }}>
        These are the everyday problems that slow reporting down and make insights harder to present with confidence.
      </p>
      <div className="lp-grid-4">
        {painPoints.map((point) => (
          <article key={point.title} className="lp-box">
            <p style={{ fontWeight: 800, color: "#111827", marginBottom: 8 }}>{point.title}</p>
            <p style={{ color: "#4b5563", lineHeight: 1.45 }}>{point.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PainPoints;
