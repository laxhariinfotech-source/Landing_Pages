import { useState } from "react";

const CONSENT_KEY = "bc_cookie_consent";

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    return !window.localStorage.getItem(CONSENT_KEY);
  });

  const handleAccept = () => {
    window.localStorage.setItem(CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event("bc-consent-accepted"));
    setIsVisible(false);
  };

  const handleReject = () => {
    window.localStorage.setItem(CONSENT_KEY, "rejected");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bc-cookie-banner" role="dialog" aria-live="polite" aria-label="Cookie consent">
      <div className="bc-cookie-content">
        <p className="bc-cookie-text">
          We use cookies to enhance your experience, improve analytics, and deliver personalized content. By using BlinkChart, you agree to our cookie policy.
        </p>

        <div className="bc-cookie-actions">
          <button type="button" className="bc-cookie-btn bc-cookie-btn-secondary" onClick={handleReject}>
            Reject
          </button>
          <button type="button" className="bc-cookie-btn bc-cookie-btn-primary" onClick={handleAccept}>
            Accept
          </button>
        </div>
      </div>

      <style>{`
        .bc-cookie-banner {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          padding: 16px 20px;
          background: #ffffff;
          box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.15);
          border-top: 3px solid #FF6600;
        }

        .bc-cookie-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 0 20px;
        }

        .bc-cookie-text {
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
          color: #333333;
          flex: 1;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .bc-cookie-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 12px;
          flex-shrink: 0;
        }

        .bc-cookie-btn {
          appearance: none;
          border-radius: 6px;
          border: 1px solid transparent;
          padding: 10px 20px;
          font-size: 14px;
          font-weight: 600;
          line-height: 1;
          cursor: pointer;
          transition: all 0.3s ease;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          white-space: nowrap;
        }

        .bc-cookie-btn-secondary {
          background: #e5e7eb;
          color: #333333;
          border-color: #d1d5db;
        }

        .bc-cookie-btn-secondary:hover {
          background: #d1d5db;
          color: #1f2937;
        }

        .bc-cookie-btn-primary {
          background: #FF6600;
          color: #ffffff;
          border-color: #FF6600;
        }

        .bc-cookie-btn-primary:hover {
          background: #e55a00;
          border-color: #e55a00;
          box-shadow: 0 4px 12px rgba(255, 102, 0, 0.3);
        }

        @media (max-width: 768px) {
          .bc-cookie-banner {
            padding: 12px 16px;
          }

          .bc-cookie-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
            padding: 0;
          }

          .bc-cookie-text {
            font-size: 13px;
          }

          .bc-cookie-actions {
            width: 100%;
            justify-content: flex-end;
            gap: 8px;
          }

          .bc-cookie-btn {
            padding: 9px 16px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
