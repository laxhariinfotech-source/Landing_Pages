const testimonials = [
  {
    quote:
      "BlinkChart helped us turn weekly spreadsheets into stakeholder-ready visuals in minutes.",
    name: "Swetlana Petrova",
    role: "Head of Analytics"
  },
  {
    quote:
      "Our analysts now spend more time on decisions and less time formatting charts.",
    name: "Daniel Klein",
    role: "Senior Business Analyst"
  },
  {
    quote:
      "The templates made our client reports look polished from day one.",
    name: "Gabani Mehta",
    role: "Management Consultant"
  }
];

const audienceTags = [
  "Used by founders",
  "Trusted by analysts",
  "Loved by consultants",
  "Adopted by students",
  "Preferred by product teams",
  "Built for marketing teams"
];

export default function SocialProofSection() {
  return (
    <section
      className="social-proof-section"
      aria-labelledby="social-proof-title"
      style={{
        padding: "72px 20px",
        background: "#fff7f1"
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto"
        }}
      >
        <h2
          id="social-proof-title"
          style={{
            fontSize: "34px",
            lineHeight: 1.25,
            margin: 0,
            textAlign: "center",
            color: "#1f2937"
          }}
        >
          Teams Already Building Better Reports With BlinkChart
        </h2>

        <p
          style={{
            margin: "12px auto 34px",
            maxWidth: "760px",
            textAlign: "center",
            color: "#4b5563"
          }}
        >
          Early users rely on BlinkChart to create presentation-ready visuals faster, with less manual work.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "18px",
            marginBottom: "28px"
          }}
        >
          {testimonials.map((item, index) => (
            <article
              key={index}
              className="social-proof-card"
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "14px",
                padding: "20px"
              }}
            >
              <p
                style={{
                  margin: "0 0 12px",
                  color: "#374151",
                  lineHeight: 1.6
                }}
              >
                "{item.quote}"
              </p>
              <p
                style={{
                  margin: 0,
                  fontWeight: 600,
                  color: "#111827"
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "14px",
                  color: "#6b7280"
                }}
              >
                {item.role}
              </p>
            </article>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px"
          }}
        >
          {audienceTags.map((tag, index) => (
            <span
              key={index}
              className="social-proof-tag"
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "999px",
                background: "#ffffff",
                border: "1px solid #fed7aa",
                color: "#9a3412",
                fontSize: "13px",
                fontWeight: 600
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
