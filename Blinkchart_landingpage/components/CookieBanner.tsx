"use client";

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
          We use cookies to improve your experience, analyze traffic, and personalize content.
          You can accept or reject non-essential cookies.
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
          padding: 12px 16px;
          background: #ffffff;
          box-shadow: 0 -6px 24px rgba(15, 23, 42, 0.12);
          border-top: 1px solid #e5e7eb;
        }

        .bc-cookie-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .bc-cookie-text {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: #334155;
          flex: 1;
        }

        .bc-cookie-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 8px;
          flex-shrink: 0;
        }

        .bc-cookie-btn {
          appearance: none;
          border-radius: 8px;
          border: 1px solid transparent;
          padding: 8px 14px;
          font-size: 13px;
          font-weight: 600;
          line-height: 1;
          cursor: pointer;
        }

        .bc-cookie-btn-secondary {
          background: #ffffff;
          color: #0f172a;
          border-color: #cbd5e1;
        }

        .bc-cookie-btn-primary {
          background: #0f172a;
          color: #ffffff;
        }

        @media (max-width: 768px) {
          .bc-cookie-banner {
            padding: 12px;
          }

          .bc-cookie-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }

          .bc-cookie-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
};

export default CookieBanner;
