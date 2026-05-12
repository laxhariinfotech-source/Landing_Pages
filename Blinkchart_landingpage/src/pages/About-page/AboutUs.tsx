// ...existing code...
import "./about.css";
import { Link } from "react-router-dom";
import { trackEvent } from "../../../lib/analytics";

const About = () => {
  // ...existing code...

  // ...existing code...
  return (
    <section className="about-page">

      {/* HEADER */}
      <h2 className="about-title">
        About <span>Us</span>
      </h2>

      {/* STORY SECTION */}
      <div className="story-section">
        <div className="story-text">
          <h3>The BlinkChart Story</h3>
          <p>
            It started with a simple frustration: teams everywhere were spending
            hours turning raw CSV files into charts for reports, presentations,
            and research. Analytics teams were wasting time manually formatting
            spreadsheets just to create a single visual.
          </p>
          <p>
            We realized that in the age of AI, building charts from CSV shouldn’t
            take more than a few seconds. BlinkChart was created to make that
            process instant — turning raw data into clean, meaningful charts
            without friction. Create charts in seconds.
          </p>
        </div>

        <div className="story-visual">
          <div className="mini-bars">
            <span />  
            <span />
            <span />
          </div>
        </div>
      </div>

      {/* INCUBATOR CARD */}
      <div className="incubator-card">
        <div className="incubator-left">
          <span className="incubated">INCUBATED BY</span>
          <h4>LH IdeaCraft Inc.</h4>
          <p>
            BlinkChart is proudly developed and backed by LH IdeaCraft Inc.,
            a laboratory dedicated to building next-generation productivity
            tools.
          </p>
        </div>

        <button className="badge">Official Product</button>
      </div>

      {/* QUOTE */}
      <div className="quote">
        <p>
          BlinkChart was created because teams waste hours turning CSV files into
          charts manually. We’re making this process instant.
        </p>
        <span className="founder">The Founder, BlinkChart</span>
      </div>

      {/* CONTACT */}
      <div className="contact-row">
        <div className="contact-card">
          <strong>Email Us:</strong>
          <p><a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=Founder@lhideacraft.com&subject=BlinkChart Support"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "inherit", textDecoration: "none" }}
            onClick={() => trackEvent({ action: "click_email", category: "contact", label: "about_page" })}
          >founder@lhideacraft.com</a></p>
        </div>

        
      </div>

      {/* CTA */}
      <div className="cta-box">
        <h3>Stop typing. Start analyzing.</h3>
        <p>
          Join thousands of analysts saving hours every week by turning CSV files
          into charts instantly.
        </p>
        <Link className="cta-btn" to="/joinwaitlist" onClick={() => trackEvent({ action: "click_waitlist_cta", category: "engagement", label: "about_page" })}>Join Waitlist</Link>

      </div>

    </section>
  );
};

export default About;
