import React, { useState } from "react";
import "./faq.css";

const faqs = [
  {
    question: "Is my data uploaded to servers?",
    answer:
      "No. All processing happens locally in your browser. Your data never leaves your device, ensuring complete privacy and security."
  },
  {
    question: "What file formats does BlinkChart support?",
    answer:
      "BlinkChart supports CSV (.csv) and Excel (.xls, .xlsx) files. Files must have unique column names, numeric Y-axis values, and 10,000 rows or fewer."
  },
  {
    question: "Do I need design skills to create charts with BlinkChart?",
    answer:
      "No. BlinkChart automatically formats charts and selects the best layout so anyone can create presentation-ready visuals without design skills."
  },
  {
    question: "Can I export charts as PNG, SVG, or PDF?",
    answer:
      "Yes. Export charts in PNG, SVG, or PDF formats. Perfect for client presentations, reports, and dashboards."
  },
  {
    question: "Can I use BlinkChart for business presentations or reports?",
    answer:
      "Yes. BlinkChart is built for creating clean charts that can be used in business presentations, investor decks, reports, and dashboards."
  },
  {
    question: "Is BlinkChart suitable for teams?",
    answer:
      "Yes. Teams can use BlinkChart to quickly generate consistent charts for reports, presentations, and internal documentation."
  },
  {
    question: "Are there usage limits?",
    answer:
      "Yes. 10 dashboard saves per month and 20 PNG exports per month. Limits reset monthly."
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. BlinkChart uses secure authentication and Row-Level Security (RLS) to protect your data."
  },
  {
    question: "Does BlinkChart support large datasets?",
    answer:
      "BlinkChart is optimized to handle structured datasets and generate charts quickly without manual formatting."
  },
  {
    question: "Do I need to install any software to use BlinkChart?",
    answer:
      "No installation is required. BlinkChart runs directly in your browser."
  }
];

const testimonials = [
  {
    name: "Arnes Nasreena",
    role: "Solutions Analyst, Everstage",
    quote:
      "BlinkChart helps us turn raw spreadsheet data into clean, presentation-ready visuals much faster. It has reduced manual formatting work significantly for our team."
  },
  {
    name: "Arock Antony",
    role: "VP, BNY",
    quote:
      "The workflow is straightforward and efficient. We can move from uploaded data to polished charts quickly, which makes reporting and internal reviews much smoother."
  }
];

const FAQSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">

      {/* FAQ */}
      <div className="faq-container">

        <h2 className="faq-title">
          Frequently Asked Questions
        </h2>

        <p className="faq-subtitle">
          Everything you need to know about BlinkChart.
        </p>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? "active" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                {faq.question}
                <span className="faq-icon">
                  {activeIndex === index ? "−" : "+"}
                </span>
              </div>

              {activeIndex === index && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>


      {/* TESTIMONIALS */}
      <div className="testimonial-container">

        <h2 className="testimonial-title">
          Trusted by Early Users
        </h2>

        <div className="testimonial-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">

              <p className="testimonial-quote">
                “{t.quote}”
              </p>

              <div className="testimonial-user">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
};

export default FAQSection;
