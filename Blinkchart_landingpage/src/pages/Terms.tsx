import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pageMetadata, updatePageMetadata } from "../utils/seoMetadata";
import "./terms.css";

const Terms = () => {
  const [activeTab, setActiveTab] = useState("terms");
  const [isTocOpen, setIsTocOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    updatePageMetadata(pageMetadata.terms);
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (tab === "privacy") {
      navigate("/privacy");
    } else if (tab === "cookies") {
      navigate("/cookies");
    } else if (tab === "disclaimer") {
      navigate("/disclaimer");
    }
  };

  return (
    <div className="legal-container">
      
      {/* PAGE HEADER */}
      <h1 className="legal-main-title">Terms and Conditions</h1>
      <p className="legal-updated">
        Last updated: March 23, 2026
      </p>

      {/* NAV TABS */}
      <div className="legal-tabs">
        <button onClick={() => setActiveTab("terms")} className={`legal-tab ${activeTab === "terms" ? "active" : ""}`}>
          Terms
        </button>
        <button onClick={() => handleTabClick("privacy")} className={`legal-tab`}>
          Privacy Policy
        </button>
        <button onClick={() => handleTabClick("cookies")} className={`legal-tab`}>
          Cookies
        </button>
        <button onClick={() => handleTabClick("disclaimer")} className={`legal-tab`}>
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
          <li><a href="#agreement">Agreement to Our Legal Terms</a></li>
          <li><a href="#services">Our Services</a></li>
          <li><a href="#ip-rights">Intellectual Property Rights</a></li>
          <li><a href="#user-representations">User Representations</a></li>
          <li><a href="#user-registration">User Registration</a></li>
          <li><a href="#purchases">Purchases and Payment</a></li>
          <li><a href="#subscriptions">Subscriptions</a></li>
          <li><a href="#software">Software</a></li>
          <li><a href="#prohibited">Prohibited Activities</a></li>
          <li><a href="#user-contributions">User Generated Contributions</a></li>
          <li><a href="#contribution-license">Contribution License</a></li>
          <li><a href="#mobile-license">Mobile Application License</a></li>
          <li><a href="#social-media">Social Media</a></li>
          <li><a href="#services-management">Services Management</a></li>
          <li><a href="#privacy-policy">Privacy Policy</a></li>
          <li><a href="#termination">Term and Termination</a></li>
          <li><a href="#modifications">Modifications and Interruptions</a></li>
          <li><a href="#governing-law">Governing Law</a></li>
          <li><a href="#dispute-resolution">Dispute Resolution</a></li>
          <li><a href="#corrections">Corrections</a></li>
          <li><a href="#disclaimer-section">Disclaimer</a></li>
          <li><a href="#limitations">Limitations of Liability</a></li>
          <li><a href="#indemnification">Indemnification</a></li>
          <li><a href="#user-data">User Data</a></li>
          <li><a href="#electronic-communications">Electronic Communications</a></li>
          <li><a href="#sms-messaging">SMS Text Messaging</a></li>
          <li><a href="#california-users">California Users and Residents</a></li>
          <li><a href="#miscellaneous">Miscellaneous</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </div>

      {/* CONTENT */}
      <div className="legal-content">

        <h2 id="agreement">AGREEMENT TO OUR LEGAL TERMS</h2>
        <p>
          We are LH Ideacraft Inc ("Company," "we," "us," "our"), a company registered in Delaware, United States at 251 Little Falls Drive, Wilmington, DE 19808.
        </p>
        <p>
          We operate the website <a href="http://www.blinkchart.ai" target="_blank" rel="noopener noreferrer">http://www.blinkchart.ai</a> (the "Site"), the mobile application Blinkchart (the "App"), as well as any other related products and services that refer or link to these legal terms (the "Legal Terms") (collectively, the "Services").
        </p>
        <p>
          You can contact us by email at <a href="mailto:contact@lhideacraft.com">contact@lhideacraft.com</a> or by mail to 251 Little Falls Drive, Wilmington, DE 19808, United States.
        </p>
        <p>
          <strong>These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you"), and LH Ideacraft Inc, concerning your access to and use of the Services.</strong>
        </p>
        <p>
          You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. <strong>IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.</strong>
        </p>

        <h2 id="services">1. OUR SERVICES</h2>
        <p>
          The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country.
        </p>
        <p>
          Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.
        </p>

        <h2 id="ip-rights">2. INTELLECTUAL PROPERTY RIGHTS</h2>
        <h3>Our Intellectual Property</h3>
        <p>
          We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the "Content"), as well as the trademarks, service marks, and logos contained therein (the "Marks").
        </p>
        <p>
          Our Content and Marks are protected by copyright and trademark laws (and various other intellectual property rights and unfair competition laws) and treaties in the United States and around the world.
        </p>

        <h3>Your Use of Our Services</h3>
        <p>
          Subject to your compliance with these Legal Terms, including the "PROHIBITED ACTIVITIES" section below, we grant you a non-exclusive, non-transferable, revocable license to:
        </p>
        <ul>
          <li>Access the Services; and</li>
          <li>Download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use or internal business purpose.</li>
        </ul>
        <p>
          Except as set out in this section or elsewhere in our Legal Terms, no part of the Services and no Content or Marks may be copied, reproduced, aggregated, republished, uploaded, posted, publicly displayed, encoded, translated, transmitted, distributed, sold, licensed, or otherwise exploited for any commercial purpose whatsoever, without our express prior written permission.
        </p>

        <h2 id="user-representations">3. USER REPRESENTATIONS</h2>
        <p>
          By using the Services, you represent and warrant that:
        </p>
        <ul>
          <li>All registration information you submit will be true, accurate, current, and complete</li>
          <li>You will maintain the accuracy of such information and promptly update such registration information as necessary</li>
          <li>You have the legal capacity and you agree to comply with these Legal Terms</li>
          <li>You are not a minor in the jurisdiction in which you reside, or if a minor, you have received parental permission to use the Services</li>
          <li>You will not access the Services through automated or non-human means, whether through a bot, script or otherwise</li>
          <li>You will not use the Services for any illegal or unauthorized purpose</li>
          <li>Your use of the Services will not violate any applicable law or regulation</li>
        </ul>

        <h2 id="user-registration">4. USER REGISTRATION</h2>
        <p>
          You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.
        </p>

        <h2 id="purchases">5. PURCHASES AND PAYMENT</h2>
        <p>
          We accept the following forms of payment: Visa, Mastercard, American Express, and Discover.
        </p>
        <p>
          You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in US dollars.
        </p>
        <p>
          You agree to pay all charges at the prices then in effect for your purchases and any applicable shipping fees, and you authorize us to charge your chosen payment provider for any such amounts upon placing your order. We reserve the right to correct any errors or mistakes in pricing, even if we have already requested or received payment.
        </p>

        <h2 id="subscriptions">6. SUBSCRIPTIONS</h2>
        <h3>Billing and Renewal</h3>
        <p>
          Your subscription will continue and automatically renew unless canceled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order. The length of your billing cycle will depend on the type of subscription plan you choose when you subscribed to the Services.
        </p>

        <h3>Free Trial</h3>
        <p>
          We offer a 15-day free trial to new users who register with the Services. The account will not be charged and the subscription will be suspended until upgraded to a paid version at the end of the free trial.
        </p>

        <h3>Cancellation</h3>
        <p>
          You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at <a href="mailto:contact@lhideacraft.com">contact@lhideacraft.com</a>.
        </p>

        <h3>Fee Changes</h3>
        <p>
          We may, from time to time, make changes to the subscription fee and will communicate any price changes to you in accordance with applicable law.
        </p>

        <h2 id="software">7. SOFTWARE</h2>
        <p>
          We may include software for use in connection with our Services. If such software is accompanied by an end user license agreement ("EULA"), the terms of the EULA will govern your use of the software. If such software is not accompanied by a EULA, then we grant to you a non-exclusive, revocable, personal, and non-transferable license to use such software solely in connection with our services and in accordance with these Legal Terms.
        </p>
        <p>
          Any software and any related documentation is provided "AS IS" without warranty of any kind, either express or implied, including, without limitation, the implied warranties of merchantability, fitness for a particular purpose, or non-infringement. You accept any and all risk arising out of use or performance of any software. You may not reproduce or redistribute any software except in accordance with the EULA or these Legal Terms.
        </p>
        <p>
          You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
        </p>
        <p>
          As a user of the Services, you agree not to:
        </p>
        <ul>
          <li>Systematically retrieve data or other content from the Services to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us</li>
          <li>Trick, defraud, or mislead us and other users, especially in any attempt to learn sensitive account information such as user passwords</li>
          <li>Circumvent, disable, or otherwise interfere with security-related features of the Services</li>
          <li>Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Services</li>
          <li>Use any information obtained from the Services in order to harass, abuse, or harm another person</li>
          <li>Make improper use of our support services or submit false reports of abuse or misconduct</li>
          <li>Use the Services in a manner inconsistent with any applicable laws or regulations</li>
          <li>Engage in unauthorized framing of or linking to the Services</li>
          <li>Upload or transmit (or attempt to upload or to transmit) viruses, Trojan horses, or other material that interferes with any party's uninterrupted use and enjoyment of the Services</li>
        </ul>

        <h2 id="termination">15. TERM AND TERMINATION</h2>
        <p>
          These Legal Terms shall remain in full force and effect while you use the Services. <strong>WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION.</strong>
        </p>
        <p>
          <strong>WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.</strong>
        </p>

        <h2 id="governing-law">17. GOVERNING LAW</h2>
        <p>
          These Legal Terms and your use of the Services are governed by and construed in accordance with the laws of the State of Delaware applicable to agreements made and to be entirely performed within the State of Delaware, without regard to its conflict of law principles.
        </p>

        <h2 id="disclaimer-section">20. DISCLAIMER</h2>
        <p>
          <strong>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</strong>
        </p>

        <h2 id="limitations">21. LIMITATIONS OF LIABILITY</h2>
        <p>
          <strong>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</strong>
        </p>

        <h2 id="contact">28. CONTACT US</h2>
        <p>
          In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:
        </p>
        <div className="contact-box">
          <p><strong>LH Ideacraft Inc</strong></p>
          <p>251 Little Falls Drive<br />Wilmington, DE 19808<br />United States</p>
          <p>Email: <a href="mailto:contact@lhideacraft.com">contact@lhideacraft.com</a></p>
        </div>

      </div>
    </div>
  );
};

export default Terms;
