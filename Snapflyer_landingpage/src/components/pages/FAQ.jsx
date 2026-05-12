import { useState } from 'react';

const faqData = [
  {
    question: 'What is SnapFlyer?',
    answer: 'SnapFlyer is an online flyer design platform that lets you create professional flyers in minutes using customizable templates and AI-powered tools. Whether you\'re promoting an event, launching a product, or advertising your business, SnapFlyer makes it quick and easy. Simply choose a template, customize the text, colors, and images, and download your flyer — no design skills required.',
  },
  {
    question: 'Is SnapFlyer free to use?',
    answer: 'Yes! Our Free plan lets you create up to 3 flyers per month with access to basic templates and essential editing tools. If you need more, our Pro plan offers unlimited flyer creation, premium templates, and priority support. For teams and agencies, our Business plan includes collaboration features, brand kits, and dedicated account management.',
  },
  {
    question: 'Do I need any design experience to use SnapFlyer?',
    answer: 'Not at all! SnapFlyer is built for everyone — from complete beginners to seasoned designers. Our intuitive editor features pre-designed templates, a simple text editor, one-click background themes, and a built-in QR code generator. Everything is designed so you can create stunning, professional-quality flyers without any prior design knowledge or expensive software.',
  },
  {
    question: 'What file formats can I download my flyers in?',
    answer: 'You can download your completed flyers as high-quality PNG images, perfect for both digital sharing (social media, email, websites) and physical printing (posters, handouts, banners). We\'re also actively working on adding PDF and JPG export options, which will be available in an upcoming update. All downloads are high-resolution to ensure crisp, print-ready results.',
  },
  {
    question: 'Can I add a QR code to my flyer?',
    answer: 'Absolutely! Our editor includes a built-in QR code generator — one of SnapFlyer\'s most popular features. Simply switch to the QR Code tab in the editor, paste any URL (your website, social media profile, booking page, menu, or payment link), and the QR code appears on your flyer instantly. It\'s a powerful way to bridge print and digital marketing, driving traffic directly from your flyer.',
  },
  {
    question: 'How do I change the background of a template?',
    answer: 'Open any template in the editor and navigate to the Style tab in the sidebar. You\'ll find three ways to customize your background: use the color picker to set any custom solid color, choose from our curated collection of 8 gradient theme presets (Sunset, Ocean, Forest, Midnight, Coral, Aurora, Ember), or toggle the original template image on and off. All changes are previewed in real-time on the canvas so you can see exactly how your flyer will look.',
  },
  {
    question: 'Can I use SnapFlyer flyers for commercial purposes?',
    answer: 'Yes, absolutely! All flyers created on SnapFlyer can be used for both personal and commercial purposes without any attribution required. You retain full rights to your designs. This includes using flyers for marketing materials, social media advertisements, event promotions, product launches, restaurant menus, real estate listings, and any other commercial application you can think of.',
  },
  {
    question: 'Is there a SnapFlyer mobile app available?',
    answer: 'Currently, SnapFlyer is a web-based platform that\'s fully optimized for both desktop and mobile browsers, so you can create and edit flyers from any device — phone, tablet, or computer — without installing anything. A dedicated iOS and Android mobile app is on our product roadmap and will include offline editing, push notifications for collaboration, and camera integration for instant photo flyers.',
  },
  {
    question: 'How do I contact SnapFlyer support?',
    answer: 'We\'re here to help! There are several ways to reach us: visit our Contact page for a quick overview of all support channels, send an email directly to support@snapflyer.com for detailed inquiries, or connect with us on our social media channels (Instagram, Facebook, Twitter). Our support team typically responds within 24 hours during business days. Pro and Business plan users receive priority support with faster response times.',
  },
  {
    question: 'Can I collaborate with my team on flyer projects?',
    answer: 'Team collaboration features are available on our Business plan. Multiple team members can access, edit, and share flyer projects within a shared workspace. Features include role-based permissions (admin, editor, viewer), real-time project sharing, brand asset libraries to maintain consistency, and activity logs to track changes. It\'s ideal for marketing teams, design agencies, and organizations that need consistent branding across all their materials.',
  },
];

function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`faq-page-item ${isOpen ? 'open' : ''}`}>
      <button
        className="faq-page-question"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="faq-page-question-left">
          <span className="faq-page-number">{String(index + 1).padStart(2, '0')}</span>
          <span>{question}</span>
        </div>
        <svg
          className="faq-page-chevron"
          width="22"
          height="22"
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
      <div className="faq-page-answer-wrapper">
        <div className="faq-page-answer">
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="faq-page">
      {/* Hero Banner */}
      <section className="faq-hero">
        <div className="container">
          <div className="faq-hero-badge">💡 Help Center</div>
          <h1 className="faq-hero-title">Frequently Asked Questions</h1>
          <p className="faq-hero-subtitle">
            Everything you need to know about SnapFlyer. Can't find what you're looking for? Feel free to contact our support team.
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="section faq-content">
        <div className="container">
          <div className="faq-page-list">
            {faqData.map((item, index) => (
              <FAQItem
                key={index}
                index={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>

          {/* Still have questions CTA */}
          <div className="faq-cta-card">
            <div className="faq-cta-icon">💬</div>
            <h3 className="faq-cta-title">Still have questions?</h3>
            <p className="faq-cta-text">
              Can't find the answer you're looking for? Our friendly support team is here to help.
            </p>
            <a href="/contact" className="btn btn-primary">
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
