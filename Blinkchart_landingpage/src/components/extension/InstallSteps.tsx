// ===============================
// InstallSteps.tsx
// ===============================

import "./InstallSteps.css";

const steps = [
  "Install the BlinkChart extension",
  "Return to the live demo page",
  "Click Analyze Chart on any dataset",
  "Watch the AI recommend instantly"
];

export default function InstallSteps() {
  return (
    <section className="install-strip">

      {steps.map((step, i) => (
        <div className="install-item" key={i}>

          <div className="install-number">
            {i + 1}
          </div>

          <p>{step}</p>

        </div>
      ))}

    </section>
  );
}