import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Privacy.css";

const Privacy = () => {
  const [isTocOpen, setIsTocOpen] = useState(true);
  const navigate = useNavigate();

  const handleTabClick = (tab: string) => {
    if (tab === "terms") {
      navigate("/terms");
    } else if (tab === "cookies") {
      navigate("/cookies");
    } else if (tab === "disclaimer") {
      navigate("/disclaimer");
    }
  };

  return (
    <section className="legal-container">
      <h1 className="legal-main-title">Privacy Policy</h1>
      <p className="legal-updated">Last updated: April 01, 2026</p>

      {/* NAV TABS */}
      <div className="legal-tabs">
        <button onClick={() => handleTabClick("terms")} className="legal-tab">
          Terms
        </button>
        <button className="legal-tab active">
          Privacy Policy
        </button>
        <button onClick={() => handleTabClick("cookies")} className="legal-tab">
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
          <li><a href="#summary">Summary of Key Points</a></li>
          <li><a href="#info-collect">What Information Do We Collect?</a></li>
          <li><a href="#info-process">How Do We Process Your Information?</a></li>
          <li><a href="#legal-bases">What Legal Bases Do We Rely On?</a></li>
          <li><a href="#info-share">When and With Whom Do We Share Personal Information?</a></li>
          <li><a href="#cookies">Do We Use Cookies and Other Tracking Technologies?</a></li>
          <li><a href="#info-secure">How Do We Keep Your Information Safe?</a></li>
          <li><a href="#privacy-rights">What Are Your Privacy Rights?</a></li>
          <li><a href="#contact-privacy">How Can You Contact Us About This Notice?</a></li>
        </ul>
      </div>

      <div className="legal-content">
        
        <h2 id="summary">SUMMARY OF KEY POINTS</h2>
        <p>
          This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by clicking the link following each key point or by using our table of contents above to find the section you are looking for.
        </p>

        <h3>What personal information do we process?</h3>
        <p>
          When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.
        </p>

        <h3>How do we process your information?</h3>
        <p>
          We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so.
        </p>

        <h3>How do we keep your information safe?</h3>
        <p>
          We have adequate organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
        </p>

        <h2 id="info-collect">1. WHAT INFORMATION DO WE COLLECT?</h2>

        <h3>Personal information you disclose to us</h3>
        <p>
          <strong>In Short:</strong> We collect personal information that you provide to us.
        </p>
        <p>
          We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
        </p>

        <p>
          The personal information we collect may include:
        </p>
        <ul>
          <li>Names</li>
          <li>Phone numbers</li>
          <li>Email addresses</li>
          <li>Mailing addresses</li>
          <li>Contact preferences</li>
          <li>Billing addresses</li>
          <li>Debit/credit card numbers</li>
          <li>Job titles</li>
          <li>Usernames and passwords</li>
        </ul>

        <h3>Payment Data</h3>
        <p>
          We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Stripe. You can find their privacy notice here: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">https://stripe.com/privacy</a>
        </p>

        <h3>Information automatically collected</h3>
        <p>
          <strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
        </p>
        <p>
          We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, and information about how and when you use our Services.
        </p>

        <h2 id="info-process">2. HOW DO WE PROCESS YOUR INFORMATION?</h2>
        <p>
          <strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law.
        </p>

        <p>We process your personal information for the following purposes:</p>
        <ul>
          <li><strong>To facilitate account creation and authentication</strong> - We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
          <li><strong>To deliver and facilitate delivery of services</strong> - We may process your information to provide you with the requested service.</li>
          <li><strong>To respond to user inquiries</strong> - We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
          <li><strong>To send administrative information</strong> - We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</li>
          <li><strong>To request feedback</strong> - We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
          <li><strong>To send you marketing and promotional communications</strong> - We may process your personal information for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time.</li>
          <li><strong>To protect our Services</strong> - We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
          <li><strong>To identify usage trends</strong> - We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
        </ul>

        <h2 id="legal-bases">3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</h2>
        <p>
          <strong>In Short:</strong> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law.
        </p>

        <p>We may rely on the following legal bases to process your personal information:</p>
        <ul>
          <li><strong>Consent</strong> - We may process your information if you have given us permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your consent at any time.</li>
          <li><strong>Performance of a Contract</strong> - We may process your personal information when we believe it is necessary to fulfill our contractual obligations to you.</li>
          <li><strong>Legitimate Interests</strong> - We may process your information when we believe it is reasonably necessary to achieve our legitimate business interests.</li>
          <li><strong>Legal Obligations</strong> - We may process your information where we believe it is necessary for compliance with our legal obligations.</li>
          <li><strong>Vital Interests</strong> - We may process your information where we believe it is necessary to protect your vital interests or the vital interests of a third party.</li>
        </ul>

        <h2 id="info-share">4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</h2>
        <p>
          <strong>In Short:</strong> We may share information in specific situations described in this section and/or with the following third parties.
        </p>

        <p>We may need to share your personal information in the following situations:</p>
        <ul>
          <li><strong>Business Transfers</strong> - We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
          <li><strong>Affiliates</strong> - We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Notice.</li>
          <li><strong>Business Partners</strong> - We may share your information with our business partners to offer you certain products, services, or promotions.</li>
        </ul>

        <h2 id="cookies">5. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</h2>
        <p>
          <strong>In Short:</strong> We may use cookies and other tracking technologies to collect and store your information.
        </p>

        <p>
          We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.
        </p>

        <p>
          For more information about how we use cookies and tracking technologies, please view our <a href="/cookies">Cookie Policy</a>.
        </p>

        <h2 id="info-secure">10. HOW DO WE KEEP YOUR INFORMATION SAFE?</h2>
        <p>
          <strong>In Short:</strong> We aim to protect your personal information through a system of organizational and technical security measures.
        </p>

        <p>
          We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information.
        </p>

        <h2 id="privacy-rights">12. WHAT ARE YOUR PRIVACY RIGHTS?</h2>
        <p>
          <strong>In Short:</strong> Depending on your state of residence in the US or in some regions, such as the European Economic Area (EEA), United Kingdom (UK), Switzerland, and Canada, you have rights that allow you greater access to and control over your personal information.
        </p>

        <h3>Account Information</h3>
        <p>
          You may review, change, or terminate your account at any time by:
        </p>
        <ul>
          <li>Logging in to your account settings and updating your user account</li>
          <li>Contacting us using the contact information provided</li>
        </ul>

        <h3>Cookies and Similar Technologies</h3>
        <p>
          Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.
        </p>

        <h3>Withdrawing Your Consent</h3>
        <p>
          If we are relying on your consent to process your personal information, you have the right to withdraw your consent at any time. You can withdraw your consent by contacting us using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
        </p>

        <h2 id="contact-privacy">16. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</h2>
        <p>
          If you have questions or comments about this notice, you may email us at <a href="mailto:contact@lhideacraft.com">contact@lhideacraft.com</a> or contact us by post at:
        </p>

        <div className="contact-box">
          <p><strong>LH Ideacraft Inc</strong></p>
          <p>251 Little Falls Drive<br />Wilmington, DE 19808<br />United States</p>
        </div>

      </div>
    </section>
  );
};

export default Privacy;
