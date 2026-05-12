import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="contact-page">
      {/* Hero Banner */}
      <section className="contact-hero">
        <div className="container">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">
            We'd love to hear from you. Reach out anytime.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="section contact-info">
        <div className="container">
          <div className="contact-grid">
            {/* Email Card */}
            <div className="contact-card">
              <div className="contact-card-icon" style={{ background: 'linear-gradient(135deg, #6C3EE8, #9B6DFF)' }}>
                <Mail size={28} color="white" />
              </div>
              <h3 className="contact-card-title">Email Us</h3>
              <p className="contact-card-text">
                <a href="mailto:founder@lhideacraft.com" className="contact-link">
                  founder@lhideacraft.com
                </a>
              </p>
            </div>

            {/* Address Card */}
            <div className="contact-card">
              <div className="contact-card-icon" style={{ background: 'linear-gradient(135deg, #0EA5E9, #38BDF8)' }}>
                <MapPin size={28} color="white" />
              </div>
              <h3 className="contact-card-title">Visit Us</h3>
              <p className="contact-card-text">
                251 Little Falls Drive<br />
                Wilmington, DE 19808
              </p>
            </div>

            {/* Quick Message Card */}
            <div className="contact-card">
              <div className="contact-card-icon" style={{ background: 'linear-gradient(135deg, #EC4899, #F472B6)' }}>
                <Send size={28} color="white" />
              </div>
              <h3 className="contact-card-title">Follow Us</h3>
              <p className="contact-card-text">
                Stay connected on our social channels for the latest updates.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
