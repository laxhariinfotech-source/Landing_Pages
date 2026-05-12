import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cookies-page/Cookies.css";

const Cookies = () => {
  const [isTocOpen, setIsTocOpen] = useState(true);
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    if (tab === "terms") {
      navigate("/terms");
    } else if (tab === "privacy") {
      navigate("/privacy");
    } else if (tab === "disclaimer") {
      navigate("/disclaimer");
    }
  };

  return (
    <section className="legal-container">
      <h1 className="legal-main-title">Cookie Policy</h1>
      <p className="legal-updated">Last updated: March 27, 2026</p>

      {/* NAV TABS */}
      <div className="legal-tabs">
        <button onClick={() => handleTabClick("terms")} className="legal-tab">
          Terms
        </button>
        <button onClick={() => handleTabClick("privacy")} className="legal-tab">
          Privacy Policy
        </button>
        <button className="legal-tab active">
          Cookies
        </button>
        <button onClick={() => handleTabClick("disclaimer")} className="legal-tab">
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
          <li><a href="#what-cookies">What are cookies?</a></li>
          <li><a href="#why-cookies">Why do we use cookies?</a></li>
          <li><a href="#control-cookies">How can I control cookies?</a></li>
          <li><a href="#browser-cookies">How can I control cookies on my browser?</a></li>
          <li><a href="#tracking-tech">What about other tracking technologies?</a></li>
          <li><a href="#targeted-ads">Do you serve targeted advertising?</a></li>
          <li><a href="#updates">How often will you update this Cookie Policy?</a></li>
          <li><a href="#more-info">Where can I get further information?</a></li>
        </ul>
      </div>

      <div className="legal-content">

        <p>
          This Cookie Policy explains how LH Ideacraft Inc ("Company," "we," "us," and "our") uses cookies and similar technologies to recognize you when you visit our website at <a href="http://www.blinkchart.ai" target="_blank" rel="noopener noreferrer">http://www.blinkchart.ai</a> ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
        </p>

        <h2 id="what-cookies">What are cookies?</h2>
        <p>
          Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
        </p>

        <p>
          Cookies set by the website owner (in this case, LH Ideacraft Inc) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
        </p>

        <h2 id="why-cookies">Why do we use cookies?</h2>
        <p>
          We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
        </p>

        <h2 id="control-cookies">How can I control cookies?</h2>
        <p>
          You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Preference Center. The Cookie Preference Center allows you to select which categories of cookies you accept or reject. <strong>Essential cookies cannot be rejected as they are strictly necessary to provide you with services.</strong>
        </p>

        <p>
          The Cookie Preference Center can be found in the notification banner and on our Website. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted.
        </p>

        <h2 id="browser-cookies">How can I control cookies on my browser?</h2>
        <p>
          As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information. The following is information about how to manage cookies on the most popular browsers:
        </p>

        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a></li>
          <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer">Internet Explorer</a></li>
          <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer">Firefox</a></li>
          <li><a href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
          <li><a href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd" target="_blank" rel="noopener noreferrer">Edge</a></li>
          <li><a href="https://help.opera.com/en/latest/web-preferences/" target="_blank" rel="noopener noreferrer">Opera</a></li>
        </ul>

        <p>
          In addition, most advertising networks offer you a way to opt out of targeted advertising. If you would like to find out more information, please visit:
        </p>

        <ul>
          <li><a href="http://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance</a></li>
          <li><a href="https://youradchoices.ca/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance of Canada</a></li>
          <li><a href="http://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">European Interactive Digital Advertising Alliance</a></li>
        </ul>

        <h2 id="tracking-tech">What about other tracking technologies, like web beacons?</h2>
        <p>
          Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website or opened an email including them.
        </p>

        <p>
          This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.
        </p>

        <h2 id="targeted-ads">Do you serve targeted advertising?</h2>
        <p>
          Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in.
        </p>

        <p>
          They may also employ technology that is used to measure the effectiveness of advertisements. They can accomplish this by using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you.
        </p>

        <p>
          The information collected through this process does not enable us or them to identify your name, contact details, or other details that directly identify you unless you choose to provide these.
        </p>

        <h2 id="updates">How often will you update this Cookie Policy?</h2>
        <p>
          We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
        </p>

        <p>
          The date at the top of this Cookie Policy indicates when it was last updated.
        </p>

        <h2 id="more-info">Where can I get further information?</h2>
        <p>
          If you have any questions about our use of cookies or other technologies, please email us at <a href="mailto:contact@lhideacraft.com">contact@lhideacraft.com</a> or by post to:
        </p>

        <div className="contact-box">
          <p><strong>LH Ideacraft Inc</strong></p>
          <p>251 Little Falls Drive<br />Wilmington, DE 19808<br />United States</p>
        </div>

      </div>
    </section>
  );
};

export default Cookies;
