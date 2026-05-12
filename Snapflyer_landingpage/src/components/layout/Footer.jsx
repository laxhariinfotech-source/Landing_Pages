import { useState } from 'react';
import { Link } from 'react-router-dom';

const productLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Templates', href: '/#templates' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
];

const developerLinks = [
  { label: 'Our team', to: '/team' },
];

const companyLinks = [
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Terms and Conditions', to: '/terms' },
  { label: 'Privacy', to: '/privacy' },
  { label: 'Cookies', to: '/cookies' },
  { label: 'Disclaimer', to: '/disclaimer' },
];

const faqData = [
  {
    question: 'What is SnapFlyer?',
    answer: 'SnapFlyer is an online flyer design platform that lets you create professional flyers in minutes using customizable templates and AI-powered tools. Whether you\'re promoting an event, launching a product, or advertising your business, SnapFlyer makes it quick and easy.',
  },
  {
    question: 'Is SnapFlyer free to use?',
    answer: 'Yes! Our Free plan lets you create up to 3 flyers per month with access to basic templates and essential editing tools. Upgrade to our Pro or Business plan for unlimited flyers, premium templates, and advanced features like team collaboration.',
  },
  {
    question: 'Do I need any design experience to use SnapFlyer?',
    answer: 'Not at all! SnapFlyer is built for everyone — from complete beginners to seasoned designers. Our intuitive editor, pre-designed templates, and drag-and-drop interface make it easy for anyone to create stunning, professional-quality flyers without any prior design skills.',
  },
  {
    question: 'What file formats can I download my flyers in?',
    answer: 'You can download your completed flyers as high-quality PNG images, perfect for both digital sharing and printing. We\'re also working on adding PDF and JPG export options in an upcoming update.',
  },
  {
    question: 'Can I add a QR code to my flyer?',
    answer: 'Absolutely! Our built-in QR code generator lets you create QR codes directly within the editor. Simply paste any URL — your website, social media, or booking page — and the QR code appears on your flyer instantly. It\'s a great way to drive traffic and engagement.',
  },
  {
    question: 'How do I change the background of a template?',
    answer: 'Open any template in the editor and you\'ll find multiple background options: use the color picker to set a custom solid color, choose from our curated collection of gradient theme presets, or toggle the original template image on and off. All changes preview in real time.',
  },
  {
    question: 'Can I use SnapFlyer flyers for commercial purposes?',
    answer: 'Yes! All flyers created on SnapFlyer can be used for both personal and commercial purposes without any attribution required. You retain full rights to your designs. Perfect for marketing materials, social media ads, event promotions, and more.',
  },
  {
    question: 'Is there a SnapFlyer mobile app available?',
    answer: 'Currently, SnapFlyer is a web-based platform that\'s fully optimized for both desktop and mobile browsers, so you can create flyers from any device. A dedicated iOS and Android mobile app is on our roadmap and will be available soon.',
  },
  {
    question: 'How do I contact SnapFlyer support?',
    answer: 'We\'re here to help! Visit our Contact page for all the ways to reach us, or send an email directly to support@snapflyer.com. Our support team typically responds within 24 hours during business days. You can also check this FAQ section for quick answers.',
  },
  {
    question: 'Can I collaborate with my team on flyer projects?',
    answer: 'Team collaboration features are available on our Business plan. Multiple team members can access, edit, and share flyer projects within a shared workspace. It\'s ideal for marketing teams, agencies, and organizations that need consistent branding across all their materials.',
  },
];

/* Inline SVG social icons since lucide-react removed brand icons */
const SocialIcon = ({ children, ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>{children}</svg>
);

const InstagramIcon = () => (
  <SocialIcon><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></SocialIcon>
);
const FacebookIcon = () => (
  <SocialIcon><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></SocialIcon>
);
const TwitterIcon = () => (
  <SocialIcon><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></SocialIcon>
);
const TikTokIcon = () => (
  <SocialIcon><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></SocialIcon>
);
const PinterestIcon = () => (
  <SocialIcon><circle cx="12" cy="12" r="10" /><path d="M12 7c-2.8 0-5 2.2-5 5 0 2.1 1.3 3.9 3.1 4.7-.1-.4-.1-1 0-1.4l.7-3s-.2-.4-.2-.9c0-.8.5-1.4 1.1-1.4.5 0 .7.4.7.8 0 .5-.3 1.3-.5 2 0 .6.5 1 1.1 1 1.3 0 2.2-1.4 2.2-3.3 0-1.7-1.2-2.9-3-2.9-2.1 0-3.3 1.5-3.3 3.2 0 .6.2 1.3.5 1.6.1.1.1.1 0 .3l-.2.7c0 .1-.1.2-.3.1-.9-.4-1.5-1.8-1.5-2.9 0-2.3 1.7-4.5 5-4.5 2.6 0 4.7 1.9 4.7 4.4 0 2.7-1.7 4.8-4 4.8-.8 0-1.5-.4-1.8-.9l-.5 1.9c-.2.7-.6 1.4-1 2" /></SocialIcon>
);

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-item ${isOpen ? 'open' : ''}`}>
      <button
        className="faq-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <svg
          className="faq-chevron"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className="faq-answer-wrapper">
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <div className="footer-brand-name" style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
              <img src="/logo-transparent.png" alt="SnapFlyer Logo" style={{ height: '40px', width: '40px' }} />SnapFlyer
            </div>
            <p className="footer-tagline">
              Design made simple for everyone. Create stunning visuals in minutes.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram"><InstagramIcon /></a>
              <a href="#" aria-label="Facebook"><FacebookIcon /></a>
              <a href="#" aria-label="Twitter"><TwitterIcon /></a>
              <a href="#" aria-label="TikTok"><TikTokIcon /></a>
              <a href="#" aria-label="Pinterest"><PinterestIcon /></a>
            </div>
          </div>

          {/* Product Column */}
          <div className="footer-column">
            <h4>Product</h4>
            {productLinks.map((link) => (
              <a key={link.label} href={link.href}>{link.label}</a>
            ))}
          </div>

          {/* Developers Column */}
          <div className="footer-column">
            <h4>Developers</h4>
            {developerLinks.map((link) => (
              <Link key={link.label} to={link.to}>{link.label}</Link>
            ))}
          </div>

          {/* Company Column */}
          <div className="footer-column">
            <h4>Company</h4>
            {companyLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 LH IdeaCraft Inc. All rights reserved.</span>
          <select className="footer-language" aria-label="Select language">
            <option>English</option>
            <option>Español</option>
            <option>Français</option>
            <option>Deutsch</option>
            <option>日本語</option>
          </select>
        </div>
      </div>
    </footer>
  );
}
