
import {
  Bar,
  Area,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  PieChart,
  Cell,
  LineChart,
  ComposedChart,
  CartesianGrid,
  Line
} from "recharts";

import "./hero.css";
import React, {
  Suspense,
  lazy,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Link } from "react-router-dom";
import { trackEvent } from "../../lib/analytics";

// ...existing code...

import demoVideo from "../assets/video3.mp4";
import { HiOutlineArrowUpTray, HiOutlineChartBar, HiOutlineArrowDownTray } from "react-icons/hi2";

const SocialProofSection = lazy(() => import("./SocialProofSection"));


const charts = ["BAR", "LINE", "PIE", "DONUT"] as const;


const weightData = [
  { week: "Week 1", weight: 185 },
  { week: "Week 2", weight: 183 },
  { week: "Week 3", weight: 181 },
  { week: "Week 4", weight: 180 },
  { week: "Week 5", weight: 178 },
  { week: "Week 6", weight: 176 },
  { week: "Week 7", weight: 175 },
  { week: "Week 8", weight: 173 }
];

const GOAL_WEIGHT = 170;

type PieLabelProps = {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  value?: number | string;
};

const renderDonutLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value
}: PieLabelProps) => {
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    innerRadius === undefined ||
    outerRadius === undefined ||
    value === undefined
  ) {
    return null;
  }

  const numericValue = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(numericValue)) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const percent = ((numericValue / TOTAL) * 100).toFixed(1);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      ${Math.round(numericValue / 1000)}K
      <tspan x={x} y={y + 14}>
        ({percent}%)
      </tspan>
    </text>
  );
};

const fundraisingData = [
  { name: "Individual Donors", value: 35000, color: "#6366F1" },
  { name: "Corporate Sponsors", value: 45000, color: "#22C55E" },
  { name: "Grant Funding", value: 60000, color: "#F59E0B" },
  { name: "Fundraising Events", value: 28000, color: "#EF4444" },
  { name: "Online Campaigns", value: 22000, color: "#06B6D4" }
];

const businessPerformance = [
  { name: "Revenue", value: 120000, color: "#6366F1" },
  { name: "Marketing", value: 25000, color: "#22C55E" },
  { name: "Product", value: 40000, color: "#F59E0B" },
  { name: "Operations", value: 20000, color: "#EF4444" },
  { name: "Profit", value: 35000, color: "#06B6D4" }
];

const BUSINESS_TOTAL = businessPerformance.reduce(
  (sum, item) => sum + item.value,
  0
);


const TOTAL = fundraisingData.reduce((s, d) => s + d.value, 0);
 
const renderInsideLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  value
}: PieLabelProps) => {
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    innerRadius === undefined ||
    outerRadius === undefined ||
    value === undefined
  ) {
    return null;
  }

  const numericValue = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(numericValue)) {
    return null;
  }

  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const percent = ((numericValue / BUSINESS_TOTAL) * 100).toFixed(1);

 return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      ${Math.round(numericValue / 1000)}K
      <tspan x={x} y={y + 14}>
        ({percent}%)
      </tspan>
    </text>
  );
};



const youtubeData = [
  { video: "Travel Vlog", views: 45000, likes: 2800 },
  { video: "Tech Review", views: 120000, likes: 8500 },
  { video: "Cooking Tutorial", views: 38000, likes: 2200 },
  { video: "Gaming Stream", views: 95000, likes: 6200 },
  { video: "Unboxing", views: 67000, likes: 4300 }
];

const DemoChart = memo(function DemoChart() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const [isInView, setIsInView] = useState(true);
  const chartRootRef = useRef<HTMLDivElement | null>(null);

  const memoizedCharts = useMemo(() => charts, []);
  const memoizedYoutubeData = useMemo(() => youtubeData, []);
  const memoizedWeightData = useMemo(() => weightData, []);
  const memoizedFundraisingData = useMemo(() => fundraisingData, []);
  const memoizedBusinessPerformance = useMemo(() => businessPerformance, []);

  const currentChart = useMemo(() => memoizedCharts[index], [index, memoizedCharts]);
  const chartClassName = useMemo(
    () =>
      `demo-chart ${
        currentChart === "DONUT"
          ? "donut-active"
          : currentChart === "PIE"
          ? "pie-active"
          : ""
      }`,
    [currentChart]
  );

  const handleResize = useCallback(() => {
    const nextIsMobile = window.innerWidth <= 768;
    setIsMobile((previousValue) =>
      previousValue === nextIsMobile ? previousValue : nextIsMobile
    );
  }, []);

  useEffect(() => {
    if (isPaused || !isInView) {
      return undefined;
    }

    const interval = setInterval(() => {
      setIndex((previousIndex) => (previousIndex + 1) % memoizedCharts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused, isInView, memoizedCharts.length]);

  useEffect(() => {
    if (!chartRootRef.current) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.35
      }
    );

    observer.observe(chartRootRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const prevChart = useCallback(() => {
    setIndex((currentIndex) =>
      currentIndex === 0 ? memoizedCharts.length - 1 : currentIndex - 1
    );
  }, [memoizedCharts.length]);

  const nextChart = useCallback(() => {
    setIndex((currentIndex) =>
      currentIndex === memoizedCharts.length - 1 ? 0 : currentIndex + 1
    );
  }, [memoizedCharts.length]);

  const pauseRotation = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeRotation = useCallback(() => {
    setIsPaused(false);
  }, []);

  const selectChart = useCallback((nextIndex: number) => {
    setIndex(nextIndex);
  }, []);

  return (
    <div className="demo big-demo" ref={chartRootRef}>
      <div className="demo-header"></div>

      <div className="chart-wrapper">
        <button className="chart-nav left" onClick={prevChart} aria-label="Previous chart">{"\u2039"}</button>
        <div
          className={chartClassName}
          onMouseEnter={pauseRotation}
          onMouseLeave={resumeRotation}
        >
          {currentChart === "BAR" && (
            <div className="bar-image-wrapper performance-wrapper">
              <div className="performance-title">
                <h3>YouTube Video Performance</h3>
                <p>{"\u2013"} Last 5 Uploads</p>
              </div>

              <div className="performance-chart">
                <ResponsiveContainer>
                  <ComposedChart
                    data={memoizedYoutubeData}
                    margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="video" />
                    <YAxis
                      yAxisId="left"
                      tickFormatter={(value) => `${value / 1000}K`}
                      label={{ value: "Views", angle: -90, position: "insideLeft" }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tickFormatter={(value) => `${value / 1000}K`}
                      label={{ value: "Likes", angle: 90, position: "insideRight" }}
                    />
                    <Tooltip
                      formatter={(value) =>
                        typeof value === "number" ? value.toLocaleString() : value
                      }
                    />
                    <Legend verticalAlign="bottom" />
                    <Bar
                      yAxisId="left"
                      dataKey="views"
                      name="Views"
                      fill="#FF6600"
                      radius={[4, 4, 0, 0]}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="likes"
                      name="Likes"
                      stroke="#00e676"
                      strokeWidth={3}
                      strokeDasharray="6 4"
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {currentChart === "LINE" && (
            <div className="bar-image-wrapper chart-column">
              <div className="chart-title">
                <h3>My Weight Loss Journey</h3>
                <p>{"\u2013"} 12 lbs Lost!</p>
              </div>

              <div className="chart-body">
                <ResponsiveContainer>
                  <LineChart
                    data={memoizedWeightData}
                    margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis
                      domain={[165, 190]}
                      label={{ value: "Weight (lbs)", angle: -90, position: "insideLeft" }}
                    />
                    <Tooltip
                      formatter={(value) =>
                        typeof value === "number" ? `${value} lbs` : value
                      }
                    />
                    <Legend />
                    <ReferenceLine
                      y={GOAL_WEIGHT}
                      stroke="#2ecc71"
                      strokeDasharray="6 4"
                      label="Goal: 170 lbs"
                    />
                    <Area
                      type="monotone"
                      dataKey="weight"
                      fill="#FF6600"
                      fillOpacity={0.2}
                      stroke="none"
                    />
                    <Line
                      type="monotone"
                      dataKey="weight"
                      name="Current Weight"
                      stroke="#FF6600"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {currentChart === "PIE" && (
            <div className="pie-safe-wrapper pie-only pie-mobile-fix">
              <div className="pie-safe-title">
                <h3>Annual Fundraising Results</h3>
                <p>Total Raised: ${TOTAL.toLocaleString()}</p>
              </div>

              <div className="pie-row-fix">
                <div className="pie-chart-box">
                  <PieChart width={320} height={320}>
                    <Tooltip
                      formatter={(value) =>
                        typeof value === "number" ? `$${value.toLocaleString()}` : value
                      }
                    />
                    <Pie
                      data={memoizedFundraisingData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      outerRadius={isMobile ? 110 : 130}
                      innerRadius={isMobile ? 55 : 65}
                      label={isMobile ? false : renderInsideLabel}
                      labelLine={false}
                    >
                      {memoizedFundraisingData.map((item, chartIndex) => (
                        <Cell key={chartIndex} fill={item.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>

                <div className="chart-generated-note">
                  Generated automatically from raw CSV using BlinkChart AI
                </div>

                <div className="pie-legend-box">
                  {memoizedFundraisingData.map((item, chartIndex) => (
                    <div key={chartIndex} className="pie-legend-item">
                      <span
                        className="pie-legend-dot"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <strong>{item.name}</strong>
                        <span>${item.value.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentChart === "DONUT" && (
            <div className="donut-safe-wrapper donut-only donut-mobile-fix">
              <div className="donut-safe-title">
                <h2>Quarterly Business Performance Overview</h2>
                <p>Total: ${BUSINESS_TOTAL.toLocaleString()}</p>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#888",
                    marginTop: "6px",
                    display: "block"
                  }}
                ></span>
              </div>

              <div className="pie-row">
                <div className="pie-left">
                  <PieChart width={isMobile ? 300 : 320} height={isMobile ? 300 : 320}>
                    <Tooltip
                      formatter={(value) =>
                        typeof value === "number" ? `$${value.toLocaleString()}` : value
                      }
                    />
                    <Pie
                      data={memoizedBusinessPerformance}
                      dataKey="value"
                      outerRadius={isMobile ? 135 : 150}
                      label={renderDonutLabel}
                      labelLine={false}
                    >
                      {memoizedBusinessPerformance.map((item, chartIndex) => (
                        <Cell key={chartIndex} fill={item.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </div>

                <div className="chart-generated-note">
                  Generated automatically from raw CSV using BlinkChart AI
                </div>

                <div className="mobile-pie-details">
                  {memoizedBusinessPerformance.map((item, chartIndex) => (
                    <div key={chartIndex} className="pie-detail-item">
                      <span
                        className="pie-color-dot"
                        style={{
                          backgroundColor: item.color,
                          borderRadius: "2px"
                        }}
                      />
                      <div>
                        <strong>{item.name}</strong>
                        <span>${item.value.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="chart-nav right" onClick={nextChart} aria-label="Next chart">{"\u203A"}</button>
      </div>

      <div className="chart-dots">
        {memoizedCharts.map((_, chartIndex) => (
          <span
            key={chartIndex}
            className={`dot ${index === chartIndex ? "active" : ""}`}
            onClick={() => selectChart(chartIndex)}
          />
        ))}
      </div>
    </div>
  );
});


const HeroSection: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const howCardsRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  const openVideoModal = () => {
    const active = document.activeElement;
    if (active instanceof HTMLElement) {
      lastFocusedElementRef.current = active;
    }
    setShowVideo(true);
  };

  const closeVideoModal = () => {
    setShowVideo(false);
    // Restore focus to the CTA trigger after modal close.
    requestAnimationFrame(() => {
      lastFocusedElementRef.current?.focus();
    });
  };

  const scrollHowCards = (direction: number) => {
    if (howCardsRef.current) {
      howCardsRef.current.scrollBy({ left: direction * 280, behavior: "smooth" });
    }
  };

   //const handleJoinWaitlist = () => {
   // navigate("/joinwaitlist");
 // };


  return (
    <section className="hero">

  {/* ANNOUNCEMENT BAR */}
  <div className="announcement-bar">
    <span className="announcement-badge">{"\u{1F680}"} Launching Soon</span>
  </div>


  {/* MAIN HERO CONTENT */}
  <div className="hero-content">

    <h1 className="hero-title">
      Turn messy spreadsheets into
      <span className="gradient-text"> presentation-ready charts </span>
      {" \u2014 Create charts in seconds."}
    </h1>

    <p className="hero-subtitle">
  AI-powered structuring automatically selects the best chart type.
  No formatting. No redesign. Just export-ready visuals.
   </p>

  <p className="hero-subtitle">
  Privacy-first. All processing happens locally in your browser.
  </p>


    {/* CTA BUTTONS */}
    <div className="cta-buttons">

      <Link
        className="btn-primary"
        to="/joinwaitlist"
        onClick={() =>
          trackEvent({
            action: "click_waitlist_cta",
            category: "engagement",
            label: "hero"
          })
        }
      >
        Join Waitlist
      </Link>


      <button
        className="btn-secondary"
        onClick={() => {
          trackEvent({ action: "click_watch_demo", category: "engagement", label: "hero" });
          openVideoModal();
        }}
      >
        Watch Demo
      </button>


    </div>




  </div>

      {/* DEMO */}

      <section className="demo-bleed">
        {/* sr-only h2 bridges h1 → h3 heading level for accessibility */}
        <h2 style={{ position: "absolute", width: "1px", height: "1px", padding: 0, margin: "-1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}>
          Interactive Chart Demo
        </h2>
        <DemoChart />

        {/* VIDEO */}
        {showVideo && (
          <div className="video-overlay" onClick={closeVideoModal}>
            <div
              className="video-modal"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="video-close"
                onClick={closeVideoModal}
                aria-label="Close video"
              >
                {"\u2715"}
              </button>

              <video className="video-player" controls autoPlay>
                <source src={demoVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        )}
      </section>





    {/* how it works */}
     <section className="how-container" id="how">
      <h2 className="how-title">How It Works</h2>
      <p className="how-subtitle">Four steps. Zero complexity.</p>

      <div className="how-cards-wrapper">
        <button className="how-arrow how-arrow-left" onClick={() => scrollHowCards(-1)} aria-label="Scroll left">
          ‹
        </button>
        <div className="how-cards" ref={howCardsRef}>
          {/* STEP 1 */}
        <div className="how-card">
          <div className="how-icon">
            <HiOutlineArrowUpTray />
          </div>

          <h3>Upload CSV or Excel File</h3>
          <p>
            Drag & drop any CSV or Excel file. We support only CSV and Excel files.
          </p>

          <div className="how-step">1</div>
        </div>

        {/* STEP 2 */}
        <div className="how-card">
          <div className="how-icon">
            <HiOutlineArrowUpTray />
          </div>

          <h3>Clean Data</h3>
          <p>
            Remove duplicates, normalize formats, and fix invalid entries to ensure accurate analysis.
          </p>

          <div className="how-step">2</div>
        </div>

        {/* STEP 3 (HIGHLIGHTED) */}
        <div className="how-card active">
          <div className="how-icon">
            <HiOutlineChartBar />
          </div>

          <h3>Structuring & Chart Generation</h3>
          <p>
            BlinkChart detects headers, values, and categories automatically.
            It selects the best chart type and generates a clean visual in
            seconds.
          </p>

          <div className="how-step">3</div>
        </div>

        {/* STEP 4 */}
        <div className="how-card">
          <div className="how-icon">
            <HiOutlineArrowDownTray />
          </div>

          <h3>Export Your Chart</h3>
          <p>
            Download charts as PNG, SVG, or PDF, ready for reports, slides, or analysis.
            No formatting needed.
          </p>

          <div className="how-step">4</div>
        </div>
      </div>
      <button className="how-arrow how-arrow-right" onClick={() => scrollHowCards(1)} aria-label="Scroll right">
        ›
      </button>
    </div>
    </section>  


    <h2 className="section-title">
  Transform Raw Data into Stunning, Client-Ready Visuals — Instantly
</h2>

<p className="section-subtitle">
  BlinkChart AI eliminates manual chart creation by intelligently converting your spreadsheets
  into professional, presentation-ready visuals. Create charts in seconds.
</p>

{/*<p className="section-trust">
  Secure. Private. Lightning fast. No design skills required.
</p>*/}

          {/* features */}
    <div className="features-list">

  {/* Feature 1 */}
  <div className="feature">
    <div className="feature-icon">{"\u{1F680}"}</div>

    <div className="feature-content">
      <h3>AI-Powered Chart Creation</h3>

      <p>Simply upload your spreadsheet and BlinkChart AI automatically analyzes your data
        to generate the most accurate, professional charts - eliminating manual work completely.
      </p>

      <span className="feature-highlight">
        No manual setup. No complexity.
      </span>
    </div>

  </div>


  {/* Feature 2 */}
  <div className="feature">
    <div className="feature-icon">{"\u{1F3AF}"}</div>
    <div className="feature-content">
      <h3>Chart Templates</h3>

      <p>Choose from 100+ chart templates and growing {"\u2014"} tailored for reports,
        dashboards, executive presentations, and client-ready deliverables.
      </p>

      <span className="feature-highlight">
        Built for real business use.
      </span>
    </div>

  </div>


  {/* Feature 3 */}
  <div className="feature">
    <div className="feature-icon">{"\u26A1"}</div>

    <div className="feature-content">
      <h3>Ultra-Fast Chart Generation</h3>

      <p>Create charts in seconds, enabling faster decision-making and improved productivity.
      </p>

      <span className="feature-highlight">
        Create charts in seconds.
      </span>
    </div>

  </div>


  {/* Feature 4 */}
  <div className="feature">
    <div className="feature-icon">{"\u{1F512}"}</div>

    <div className="feature-content">
      <h3>Enterprise-Grade Privacy and Security</h3>

      <p>Your data is processed securely with strict privacy protection. BlinkChart ensures
        complete confidentiality without storing or exposing your files.
      </p>

      <span className="feature-highlight">
        Your data stays fully private.
      </span>
    </div>

  </div>

</div>
   <section className="pricing" id="pricing">

  <h2 className="pricing-main-title">
    Simple Pricing, Massive Value.
  </h2>

  <p className="pricing-main-subtitle">
    Join the waitlist to get early access.
  </p>


  {/* Billing Toggle */}
  <div className="billing-toggle">

    <button
      className={!isAnnual ? "billing-btn active" : "billing-btn"}
      onClick={() => setIsAnnual(false)}
    >
      Monthly
    </button>
<button
  className={`billing-btn annual ${isAnnual ? "active annual-active" : ""}`}
  onClick={() => setIsAnnual(true)}
>
  Annual
  <span className="best-badge">BEST VALUE</span>
</button>
  </div>


  {/* BIG CENTER CARD */}
  <div className="pricing-center">

    <div className={`pricing-card-large ${isAnnual ? "annual-selected" : ""}`}>

      <div className="standard-badge">
        STANDARD PLAN
      </div>


      <div className="price-row">

        <div className="price-main">
          ${isAnnual ? "209" : "19"}
        </div>

        <div className="price-duration">
          / {isAnnual ? "year" : "month"}
        </div>
      </div>
      
      {isAnnual && (
        <div style={{ fontSize: "14px", fontWeight: "700", marginTop: "8px", color: "#000" }}>
          Billed annually
        </div>
      )}

  <div className="annual-final-note">
    {"\u{1F525}"} Save More Annually {"\u2014"} Get 1 Month Free
  </div>



      <Link
        className="waitlist-button-big"
        to="/joinwaitlist"
      >
          Join Waitlist
      </Link>

      
      
<div className="pricing-features-grid">
  <div className="pricing-feature">Unlimited Chart Creation</div>
  <div className="pricing-feature">100+ Premium Chart Templates</div>
  <div className="pricing-feature">AI-Powered Data-to-Chart Structuring</div>
  <div className="pricing-feature">Built-In Data Cleanup Tools</div>
  <div className="pricing-feature">Export in PNG, SVG, and PDF</div>
  <div className="pricing-feature">Social-Ready Visual Content</div>
  <div className="pricing-feature">Advanced Visualization Beyond Basic Charts</div>
</div>
</div>
</div>

</section>

    {/* WHO BLINCHART IS FOR SECTION */}
    <section className="who-for-section">
      <h2 className="who-for-title">Who BlinkChart is for</h2>
      
      <div className="who-for-cards">
        <div className="who-for-card">
          <h3>Founders</h3>
          <p>Create charts for investor pitch decks quickly.</p>
        </div>
        
        <div className="who-for-card">
          <h3>Analysts</h3>
          <p>Turn raw data into clear reports.</p>
        </div>
        
        <div className="who-for-card">
          <h3>Consultants</h3>
          <p>Deliver polished charts to clients.</p>
        </div>

        <div className="who-for-card">
          <h3>Students</h3>
          <p>Create charts for research and presentations.</p>
        </div>
        
        <div className="who-for-card">
          <h3>Business Managers</h3>
          <p>Build dashboards for team performance and metrics.</p>
        </div>
        
        <div className="who-for-card">
          <h3>Marketers</h3>
          <p>Create charts for updates and presentations.</p>
        </div>
      </div>
    </section>

    <Suspense fallback={null}>
      <SocialProofSection />
    </Suspense>

    <section className="cta-section" id="signup">
      <h2>Start Creating Professional Charts Today</h2>

      <p>
        Sign up for the waitlist and get early access to advanced data visualization. No credit card required.
      </p>

      <Link
        className="btn-primary"
        to="/joinwaitlist"
      >
        Join Waitlist
      </Link>

    </section>




     


    </section>

    



    
  );
};

export default memo(HeroSection);
