import { useEffect } from 'react';
import { updatePageMetadata, pageMetadata } from '../utils/seoMetadata';

const PrivacyPolicy = () => {
  useEffect(() => {
    updatePageMetadata(pageMetadata.privacy);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-header">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: April 8, 2026</p>
        </div>
      </div>

      <div className="policy-content container">
        <section>
          <h2>1. Introduction</h2>
          <p>
            BlinkChart ("we," "us," "our," or "Company") is committed to protecting your privacy. 
            This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information 
            when you use our website and services.
          </p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          
          <h3>2.1 Information You Provide</h3>
          <p>We collect information you voluntarily provide to us:</p>
          <ul>
            <li>Email address (for newsletter signup, account creation)</li>
            <li>Name and contact information</li>
            <li>Messages and feedback you send us</li>
          </ul>

          <h3>2.2 Information Collected Automatically</h3>
          <p>When you visit our website, we may collect:</p>
          <ul>
            <li>Device information (browser type, operating system)</li>
            <li>IP address</li>
            <li>Pages visited and time spent</li>
            <li>Referrer information</li>
            <li>General geographic location (country, city)</li>
          </ul>

          <h3>2.3 Data Processing</h3>
          <p>
            All CSV and Excel files uploaded to BlinkChart are processed entirely in your browser. 
            We do not store, receive, or process your uploaded data on our servers. Your data stays 
            completely private on your device.
          </p>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use collected information to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Respond to your inquiries and support requests</li>
            <li>Send newsletters and updates (with your consent)</li>
            <li>Analyze usage patterns and improve user experience</li>
            <li>Ensure security and prevent fraud</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section>
          <h2>4. Data Security</h2>
          <p>
            BlinkChart takes data security seriously. We implement industry-standard security measures 
            including SSL/TLS encryption for communications and secure data storage practices.
          </p>
          <p>
            Since all data processing happens in your browser, your uploaded files are never transmitted 
            to or stored on our servers, ensuring maximum privacy.
          </p>
        </section>

        <section>
          <h2>5. Cookies</h2>
          <p>
            We use cookies and similar tracking technologies to enhance your experience. You can control 
            cookie settings in your browser. Please see our Cookie Policy for more details.
          </p>
        </section>

        <section>
          <h2>6. Third-Party Services</h2>
          <p>
            We may use third-party services for analytics, hosting, and support. These services may 
            collect information subject to their own privacy policies. We recommend reviewing their 
            policies as we are not responsible for their practices.
          </p>
        </section>

        <section>
          <h2>7. Data Retention</h2>
          <p>
            We retain your information for as long as necessary to provide services and fulfill the 
            purposes outlined in this policy. You may request deletion of your personal information 
            at any time by contacting us.
          </p>
        </section>

        <section>
          <h2>8. Your Privacy Rights</h2>
          <p>Depending on your location, you may have the following rights:</p>
          <ul>
            <li>Right to access your personal information</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to delete your data</li>
            <li>Right to opt-out of marketing communications</li>
            <li>Right to data portability</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@blinkchart.ai with your request.
          </p>
        </section>

        <section>
          <h2>9. Children's Privacy</h2>
          <p>
            BlinkChart is not intended for children under 13. We do not knowingly collect information 
            from children under 13. If we become aware that we have collected information from a child 
            under 13, we will take steps to delete such information immediately.
          </p>
        </section>

        <section>
          <h2>10. GDPR Compliance</h2>
          <p>
            For users in the European Union, we comply with the General Data Protection Regulation (GDPR). 
            We only collect and process personal data with lawful basis, including consent, contract, 
            or legitimate interests.
          </p>
        </section>

        <section>
          <h2>11. CCPA Compliance</h2>
          <p>
            For California residents, we comply with the California Consumer Privacy Act (CCPA), providing 
            rights to know, delete, and opt-out of data sales.
          </p>
        </section>

        <section>
          <h2>12. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any material 
            changes by posting the updated policy on our website and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h2>13. Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@blinkchart.ai</li>
            <li>Mailing Address: 251 Little Falls Drive, Wilmington, DE 19808, USA</li>
          </ul>
        </section>
      </div>

      <style>{`
        .policy-page {
          background: #fff;
        }

        .policy-header {
          background: linear-gradient(135deg, #FF6600 0%, #FF8533 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .policy-header h1 {
          font-size: 42px;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .last-updated {
          font-size: 14px;
          opacity: 0.9;
        }

        .policy-content {
          max-width: 800px;
          margin: 40px auto;
          line-height: 1.8;
        }

        .policy-content section {
          margin-bottom: 40px;
        }

        .policy-content h2 {
          font-size: 24px;
          margin: 30px 0 20px 0;
          color: #333;
          border-bottom: 3px solid #FF6600;
          padding-bottom: 10px;
        }

        .policy-content h3 {
          font-size: 18px;
          margin: 20px 0 15px 0;
          color: #555;
        }

        .policy-content p {
          color: #666;
          margin-bottom: 15px;
        }

        .policy-content ul {
          margin-left: 20px;
          margin-bottom: 15px;
          color: #666;
        }

        .policy-content li {
          margin-bottom: 10px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        @media (max-width: 768px) {
          .policy-header h1 {
            font-size: 32px;
          }

          .policy-content {
            margin: 20px auto;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;