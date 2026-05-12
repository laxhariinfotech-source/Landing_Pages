import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./terms.css";

const Disclaimer = () => {
  const [isTocOpen, setIsTocOpen] = useState(true);
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    if (tab === "terms") {
      navigate("/terms");
    } else if (tab === "privacy") {
      navigate("/privacy");
    } else if (tab === "cookies") {
      navigate("/cookies");
    }
  };

  return (
    <section className="legal-container">
      <h1 className="legal-main-title">Disclaimer</h1>
      <p className="legal-updated">Last updated: April 01, 2026</p>

      {/* NAV TABS */}
      <div className="legal-tabs">
        <button onClick={() => handleTabClick("terms")} className="legal-tab">
          Terms
        </button>
        <button onClick={() => handleTabClick("privacy")} className="legal-tab">
          Privacy Policy
        </button>
        <button onClick={() => handleTabClick("cookies")} className="legal-tab">
          Cookies
        </button>
        <button className="legal-tab active">
          Disclaimer
        </button>
      </div>

      {/* TABLE OF CONTENTS */}
      <div className="legal-toc">
        <h3 className="legal-toc-header" onClick={() => setIsTocOpen(!isTocOpen)}>
          <span className={`legal-toc-toggle ${isTocOpen ? 'open' : 'closed'}`}>▼</span>
          Table of Contents
        </h3>
        <ul className={`legal-toc-list ${isTocOpen ? 'open' : 'closed'}`}>
          <li><a href="#website-disclaimer">Website Disclaimer</a></li>
          <li><a href="#external-links">External Links Disclaimer</a></li>
          <li><a href="#testimonials">Testimonials Disclaimer</a></li>
        </ul>
      </div>

      <div className="legal-content">

        <h2 id="website-disclaimer">WEBSITE DISCLAIMER</h2>
        <p>
          The information provided by LH Ideacraft Inc ("we," "us," or "our") on <a href="http://www.blinkchart.ai" target="_blank" rel="noopener noreferrer">http://www.blinkchart.ai</a> (the "Site") is for general informational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
        </p>
        <p>
          <strong>UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED ON THE SITE. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION ON THE SITE IS SOLELY AT YOUR OWN RISK.</strong>
        </p>

        <h2 id="external-links">EXTERNAL LINKS DISCLAIMER</h2>
        <p>
          The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
        </p>
        <p>
          <strong>WE DO NOT WARRANT, ENDORSE, GUARANTEE, OR ASSUME RESPONSIBILITY FOR THE ACCURACY OR RELIABILITY OF ANY INFORMATION OFFERED BY THIRD-PARTY WEBSITES LINKED THROUGH THE SITE OR ANY WEBSITE OR FEATURE LINKED IN ANY BANNER OR OTHER ADVERTISING. WE WILL NOT BE A PARTY TO OR IN ANY WAY BE RESPONSIBLE FOR MONITORING ANY TRANSACTION BETWEEN YOU AND THIRD-PARTY PROVIDERS OF PRODUCTS OR SERVICES.</strong>
        </p>

        <h2 id="testimonials">TESTIMONIALS DISCLAIMER</h2>
        <p>
          The Site may contain testimonials by users of our products and/or services. These testimonials reflect the real-life experiences and opinions of such users. However, the experiences are personal to those particular users, and may not necessarily be representative of all users of our products and/or services. We do not claim, and you should not assume, that all users will have the same experiences.
        </p>
        <p>
          <strong>YOUR INDIVIDUAL RESULTS MAY VARY.</strong>
        </p>

        <p>
          The testimonials on the Site are submitted in various forms such as text, audio and/or video, and are reviewed by us before being posted. They appear on the Site verbatim as given by the users, except for the correction of grammar or typing errors. Some testimonials may have been shortened for the sake of brevity where the full testimonial contained extraneous information not relevant to the general public.
        </p>

        <p>
          The views and opinions contained in the testimonials belong solely to the individual user and do not reflect our views and opinions. We are not affiliated with users who provide testimonials, and users are not paid or otherwise compensated for their testimonials.
        </p>

        <hr style={{ margin: "40px 0", borderColor: "#e0e0e0" }} />

        <p>
          For more information, please contact us at:
        </p>

        <div className="contact-box">
          <p><strong>LH Ideacraft Inc</strong></p>
          <p>251 Little Falls Drive<br />Wilmington, DE 19808<br />United States</p>
          <p>Email: <a href="mailto:contact@lhideacraft.com">contact@lhideacraft.com</a></p>
        </div>

      </div>
    </section>
  );
};

export default Disclaimer;
