import { useEffect } from 'react';
import { updatePageMetadata, pageMetadata } from '../utils/seoMetadata';

const TermsOfService = () => {
  useEffect(() => {
    updatePageMetadata(pageMetadata.terms);
  }, []);

  return (
    <div className="policy-page">
      <div className="policy-header">
        <div className="container">
          <h1>Terms of Service</h1>
          <p className="last-updated">Last updated: April 8, 2026</p>
        </div>
      </div>

      <div className="policy-content container">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using the BlinkChart website and services, you accept and agree to be 
            bound by the terms and provision of this agreement. If you do not agree to abide by the 
            above, please do not use this service.
          </p>
        </section>

        <section>
          <h2>2. Use License</h2>
          <p>
            BlinkChart grants you a limited license to access and use our website and services for 
            lawful purposes only. This license does not include:
          </p>
          <ul>
            <li>Modifying or copying our materials or services</li>
            <li>Using our materials for commercial purposes</li>
            <li>Attempting to reverse engineer our software</li>
            <li>Removing any copyright or other proprietary notices</li>
            <li>Transferring our materials to another person or entity</li>
            <li>Accessing our services in an illegal manner</li>
          </ul>
        </section>

        <section>
          <h2>3. Disclaimer of Warranties</h2>
          <p>
            The materials on BlinkChart's website and services are provided "as-is". BlinkChart makes 
            no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
            including, without limitation, implied warranties or conditions of merchantability, fitness 
            for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
        </section>

        <section>
          <h2>4. Limitations of Liability</h2>
          <p>
            In no event shall BlinkChart or its suppliers be liable for any damages (including, without 
            limitation, damages for loss of data or profit, or due to business interruption) arising out 
            of the use or inability to use the materials on BlinkChart's website, even if BlinkChart or 
            a BlinkChart authorized representative has been notified orally or in writing of the possibility 
            of such damage.
          </p>
        </section>

        <section>
          <h2>5. Accuracy of Materials</h2>
          <p>
            The materials appearing on BlinkChart's website could include technical, typographical, or 
            photographic errors. BlinkChart does not warrant that any of the materials on the website 
            are accurate, complete, or current. BlinkChart may make changes to the materials contained 
            on its website at any time without notice.
          </p>
        </section>

        <section>
          <h2>6. Materials and Content</h2>
          <p>
            The materials on BlinkChart's website are protected by copyright and trademark laws. 
            Unauthorized use of these materials may violate copyright, trademark, and other applicable laws.
          </p>
          <p>
            You may not:
          </p>
          <ul>
            <li>Reproduce or transmit any content without permission</li>
            <li>Use content for any unlawful purpose</li>
            <li>Attempt to gain unauthorized access to any portion of our services</li>
            <li>Interfere with any features or functions of our services</li>
          </ul>
        </section>

        <section>
          <h2>7. Limitations on Use</h2>
          <p>
            In using this website, you warrant that you will not engage in any activity that:
          </p>
          <ul>
            <li>Violates any applicable law or regulation</li>
            <li>Infringes upon intellectual property rights</li>
            <li>Harasses or abuses others</li>
            <li>Interferes with the operation of our services</li>
            <li>Transmits viruses or malicious code</li>
            <li>Impersonates another person or entity</li>
          </ul>
        </section>

        <section>
          <h2>8. User-Generated Content</h2>
          <p>
            If you submit, post, or display content on BlinkChart, you grant us a worldwide, 
            non-exclusive, royalty-free license to use, reproduce, adapt, publish, translate, and 
            distribute it in any media.
          </p>
          <p>
            You represent and warrant that you own or control all rights to the content you submit 
            and that it does not violate any third-party rights.
          </p>
        </section>

        <section>
          <h2>9. Third-Party Links</h2>
          <p>
            BlinkChart has not reviewed all of the sites linked to its website and is not responsible 
            for the contents of any such linked site. The inclusion of any link does not imply endorsement 
            by BlinkChart of the site. Use of any such linked website is at the user's own risk.
          </p>
        </section>

        <section>
          <h2>10. Modifications to Terms</h2>
          <p>
            BlinkChart may revise these terms of service for its website at any time without notice. 
            By using this website, you are agreeing to be bound by the then current version of these 
            terms of service.
          </p>
        </section>

        <section>
          <h2>11. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of 
            Delaware, United States, and you irrevocably submit to the exclusive jurisdiction of the 
            courts located in that state or location.
          </p>
        </section>

        <section>
          <h2>12. Termination</h2>
          <p>
            We reserve the right to terminate your access to BlinkChart services at any time, without 
            notice, for conduct that we believe violates these Terms or is otherwise harmful to our users.
          </p>
        </section>

        <section>
          <h2>13. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless BlinkChart and its officers, directors, employees, 
            and agents from any claim, demand, or damage incurred by a third party in connection with your 
            use of our services or violation of these terms.
          </p>
        </section>

        <section>
          <h2>14. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
          <ul>
            <li>Email: legal@blinkchart.ai</li>
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

export default TermsOfService;