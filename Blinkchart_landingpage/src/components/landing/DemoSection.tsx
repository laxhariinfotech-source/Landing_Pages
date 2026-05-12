import demoVideo from "../../assets/video3.mp4";

const DemoSection: React.FC = () => {
  return (
    <section className="lp-wrap lp-section lp-section--compact-top">
      <div className="lp-card">
        <h2 className="lp-section-title">See <span className="lp-accent-word">BlinkChart</span> in <span className="lp-accent-word">action</span></h2>

        <div className="lp-demo-panel">
          <div>
            <video className="lp-demo-video" controls preload="metadata" playsInline>
              <source src={demoVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p style={{ marginTop: 10, fontSize: 18, fontWeight: 600 }}>
              Watch BlinkChart transform spreadsheet data into polished charts in seconds.
            </p>
          </div>
        </div>

        <p className="lp-sub" style={{ marginTop: 8 }}>
          From raw Excel data to presentation-ready chart in seconds
        </p>
      </div>
    </section>
  );
};

export default DemoSection;
