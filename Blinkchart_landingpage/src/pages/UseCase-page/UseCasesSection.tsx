import { useEffect, useState } from "react";
import "./UseCasesSection.css";

const useCases = [
  {
    title: "Students & Learners",
    who: "School & college students, online learners, bootcamp participants, interns",
    data: "CSV/Excel assignments, surveys, experiments",
    charts: "Bar, line, pie, trend visuals",
    use: "Assignments, projects, presentations",
  },
  {
    title: "Teachers & Educators",
    who: "Teachers, professors, tutors",
    data: "Student performance, attendance, feedback",
    charts: "Class dashboards, performance trends",
    use: "Classroom teaching, academic reviews",
  },
  {
    title: "Business Analysts & Managers",
    who: "Founders, managers, strategy teams",
    data: "Sales, KPIs, cost & revenue sheets",
    charts: "Revenue growth, KPI dashboards",
    use: "Internal reviews, board decks",
  },
  {
    title: "Marketing & Growth Teams",
    who: "Marketers, growth teams",
    data: "Campaign metrics, engagement data",
    charts: "ROI, conversion trends",
    use: "Marketing reports, client presentations",
  },
  {
    title: "Finance & Operations",
    who: "Finance managers, accountants",
    data: "Expenses, budgets, forecasts",
    charts: "Expense breakdowns, cash flow trends",
    use: "Financial reviews, compliance",
  },
  {
    title: "Founders, Investors & Advisors",
    who: "Founders, angels, VCs",
    data: "Traction, CAC/LTV, forecasts",
    charts: "Growth trajectories, scenarios",
    use: "Pitch decks, fundraising",
  },
  {
    title: "Freelancers & Consultants",
    who: "Consultants, agencies",
    data: "Client performance datasets",
    charts: "Comparative analysis, before/after",
    use: "Client deliverables, proposals",
  },
];

const UseCases = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // 🔁 Auto tab change every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % useCases.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="usecase-section">
      <h2 className="usecase-title">Who Uses BlinkChart?</h2>
      <p className="usecase-subtitle">
        Built for real-world users and real business decisions.
      </p>

      <div className="usecase-container">
        {/* LEFT TABS */}
        <div className="usecase-tabs">
          {useCases.map((item, index) => (
            <button
              key={index}
              className={`usecase-tab ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              {item.title}
            </button>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="usecase-content">
          <h3>{useCases[activeIndex].title}</h3>

          <div className="usecase-detail">
            <strong>Who:</strong>
            <p>{useCases[activeIndex].who}</p>
          </div>

          <div className="usecase-detail">
            <strong>Data:</strong>
            <p>{useCases[activeIndex].data}</p>
          </div>

          <div className="usecase-detail">
            <strong>Charts:</strong>
            <p>{useCases[activeIndex].charts}</p>
          </div>

          <div className="usecase-detail">
            <strong>Use:</strong>
            <p>{useCases[activeIndex].use}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
