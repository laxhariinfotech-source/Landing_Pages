import { useEffect } from 'react';
import { updatePageMetadata, pageMetadata } from '../utils/seoMetadata';
import '../components/hero.css';

const Features = () => {
  useEffect(() => {
    updatePageMetadata(pageMetadata.features);
  }, []);

  return (
    <div className="features-page">
      <section className="features-hero">
        <div className="container">
          <h1>BlinkChart Features</h1>
          <p className="hero-subtitle">
            Powerful tools to convert Excel and CSV files into stunning charts instantly
          </p>
        </div>
      </section>

      <section className="features-content">
        <div className="container">
          <div className="features-grid">
            <article className="feature-card">
              <h2>Excel to Chart Conversion</h2>
              <p>
                Upload your Excel spreadsheets and let BlinkChart automatically detect your data structure. 
                Convert complex datasets into beautiful, interactive charts in seconds without any manual configuration.
              </p>
              <ul>
                <li>Supports all Excel formats (.xlsx, .xls)</li>
                <li>Automatic data detection and analysis</li>
                <li>Multi-sheet support</li>
                <li>Preserves data relationships</li>
              </ul>
            </article>

            <article className="feature-card">
              <h2>CSV Data Visualization</h2>
              <p>
                BlinkChart is the fastest CSV to chart generator. Upload any CSV file and instantly 
                create professional visualizations. Perfect for data analysts and business users.
              </p>
              <ul>
                <li>All CSV formats supported</li>
                <li>Custom delimiter detection</li>
                <li>Handle large datasets efficiently</li>
                <li>Real-time preview</li>
              </ul>
            </article>

            <article className="feature-card">
              <h2>100+ Chart Types</h2>
              <p>
                Choose from over 100 chart templates including bar, line, pie, scatter, and more. 
                Each chart is optimized for different data types and use cases.
              </p>
              <ul>
                <li>Bar, Line, Pie, Area charts</li>
                <li>Scatter, Bubble, Heat maps</li>
                <li>Custom combinations</li>
                <li>Interactive tooltips</li>
              </ul>
            </article>

            <article className="feature-card">
              <h2>Professional Export Options</h2>
              <p>
                Export your charts in multiple formats. PNG for quick sharing, SVG for scalability, 
                and PDF for professional presentations.
              </p>
              <ul>
                <li>PNG with custom resolution</li>
                <li>SVG for infinite scalability</li>
                <li>PDF with metadata</li>
                <li>PowerPoint integration</li>
              </ul>
            </article>

            <article className="feature-card">
              <h2>Privacy-First Processing</h2>
              <p>
                All data processing happens directly in your browser. Your spreadsheets never leave 
                your device. No server uploads, no data collection, complete privacy.
              </p>
              <ul>
                <li>Client-side processing only</li>
                <li>No data stored on servers</li>
                <li>No tracking or analytics</li>
                <li>GDPR compliant</li>
              </ul>
            </article>

            <article className="feature-card">
              <h2>Advanced Customization</h2>
              <p>
                Fine-tune every aspect of your charts. Adjust colors, fonts, labels, and more to match 
                your brand guidelines and presentation style.
              </p>
              <ul>
                <li>Custom color schemes</li>
                <li>Font and text styling</li>
                <li>Axis and title customization</li>
                <li>Theme presets</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="features-comparison">
        <div className="container">
          <h2>Why Choose BlinkChart?</h2>
          <div className="comparison-table">
            <div className="comparison-row header">
              <div>Feature</div>
              <div>BlinkChart</div>
              <div>Other Tools</div>
            </div>
            <div className="comparison-row">
              <div>Speed</div>
              <div>✓ Seconds</div>
              <div>Minutes to hours</div>
            </div>
            <div className="comparison-row">
              <div>Privacy</div>
              <div>✓ Browser-based</div>
              <div>Cloud uploads</div>
            </div>
            <div className="comparison-row">
              <div>Chart Types</div>
              <div>✓ 100+</div>
              <div>20-50</div>
            </div>
            <div className="comparison-row">
              <div>Export Formats</div>
              <div>✓ PNG, SVG, PDF</div>
              <div>Limited formats</div>
            </div>
            <div className="comparison-row">
              <div>Price</div>
              <div>✓ Free + Premium</div>
              <div>Expensive</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-cta">
        <div className="container">
          <h2>Ready to transform your data?</h2>
          <p>Start converting your Excel and CSV files to charts instantly.</p>
          <button className="cta-button">Get Started Free</button>
        </div>
      </section>

      <style>{`
        .features-page {
          background: #fff;
        }

        .features-hero {
          background: linear-gradient(135deg, #FF6600 0%, #FF8533 100%);
          color: white;
          padding: 60px 20px;
          text-align: center;
        }

        .features-hero h1 {
          font-size: 42px;
          margin-bottom: 20px;
          font-weight: 700;
        }

        .features-hero .hero-subtitle {
          font-size: 18px;
          opacity: 0.95;
          max-width: 600px;
          margin: 0 auto;
        }

        .features-content {
          padding: 60px 20px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .feature-card {
          background: #f9f9f9;
          padding: 30px;
          border-radius: 8px;
          border-left: 4px solid #FF6600;
        }

        .feature-card h2 {
          font-size: 20px;
          margin-bottom: 15px;
          color: #333;
        }

        .feature-card p {
          margin-bottom: 15px;
          color: #666;
          line-height: 1.6;
        }

        .feature-card ul {
          list-style: none;
          padding: 0;
        }

        .feature-card li {
          padding: 8px 0;
          color: #555;
          padding-left: 20px;
          position: relative;
        }

        .feature-card li:before {
          content: "✓";
          position: absolute;
          left: 0;
          color: #FF6600;
          font-weight: bold;
        }

        .features-comparison {
          padding: 60px 20px;
          background: #f5f5f5;
        }

        .features-comparison h2 {
          text-align: center;
          font-size: 32px;
          margin-bottom: 40px;
        }

        .comparison-table {
          max-width: 600px;
          margin: 0 auto;
        }

        .comparison-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          padding: 15px;
          border-bottom: 1px solid #ddd;
        }

        .comparison-row.header {
          background: #FF6600;
          color: white;
          font-weight: bold;
          border-radius: 8px 8px 0 0;
        }

        .comparison-row:last-child {
          border-bottom: none;
        }

        .features-cta {
          padding: 60px 20px;
          text-align: center;
          background: #fff;
        }

        .features-cta h2 {
          font-size: 32px;
          margin-bottom: 15px;
        }

        .features-cta p {
          font-size: 18px;
          color: #666;
          margin-bottom: 30px;
        }

        .cta-button {
          background: #FF6600;
          color: white;
          padding: 15px 40px;
          border: none;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
        }

        .cta-button:hover {
          background: #E55A00;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .features-hero h1 {
            font-size: 32px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .comparison-row {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .comparison-row.header {
            display: grid;
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Features;