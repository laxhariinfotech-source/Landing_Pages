import './Contact.css';
import { trackEvent } from '../../../lib/analytics';
const Contact = () => {
  return (
    <section className="contact">
      {/* HEADER */}
      <div className="contact-header">
        <h2>
          Get in <span>Touch</span>
        </h2>
        <p>
          Have a question or need help? We're here to assist you. Reach out to us
          through any of the channels below.
        </p>
      </div>

      {/* INFO CARDS */}
      <div className="contact-cards">
        <div className="contact-card">
          <div className="icon">📧</div>
          <h4>Email</h4>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=founder@lhideacraft.com&subject=BlinkChart Inquiry"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent({ action: "click_email", category: "contact", label: "contact_page" })}
          >founder@lhideacraft.com</a>
          <p>Send us an email anytime</p>
        </div>

        <div className="contact-card">
          <div className="icon">📍</div>
          <h4>Office</h4>
          <p>251 Little Falls Drive, Wilmington, DE 19808</p>
        </div>

        
      </div>
    </section>
  );
};

export default Contact;
