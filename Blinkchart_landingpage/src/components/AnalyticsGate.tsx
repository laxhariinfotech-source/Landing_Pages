import { useEffect } from "react";

const CONSENT_KEY = "bc_cookie_consent";
const CONSENT_ACCEPTED_EVENT = "bc-consent-accepted";

type GtagFunction = (command: string, ...args: unknown[]) => void;
type FbqFunction = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: (...args: unknown[]) => void;
};

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: GtagFunction;
    fbq?: FbqFunction;
    _fbq?: FbqFunction;
  }
}

const AnalyticsGate = () => {
  const gaId = import.meta.env["VITE_GA_ID"] as string | undefined;
  const metaPixelId = import.meta.env["VITE_META_PIXEL_ID"] as string | undefined;

  useEffect(() => {
    const loadGoogleAnalytics = () => {
      if (!gaId) {
        return;
      }

      if (typeof window.gtag === "function") {
        return;
      }

      // Initialize dataLayer first
      const dataLayer = window.dataLayer || [];
      window.dataLayer = dataLayer;

      // Create gtag function
      function gtag(...args: unknown[]) {
        dataLayer.push(args);
      }

      window.gtag = gtag;

      // Configure GA with gtag calls (before script loads)
      gtag("js", new Date());
      gtag("config", gaId, {
        send_page_view: true,
        anonymize_ip: true,
      });

      // Load the gtag script after configuration
      const script = document.createElement("script");
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.type = "text/javascript";
      document.head.appendChild(script);

      console.log("Google Analytics loaded with ID:", gaId);
    };

    if (!gaId) {
      console.warn("GA ID not found");
    }

    const loadMetaPixel = () => {
      if (!metaPixelId) {
        return;
      }

      if (typeof window.fbq === "function") {
        // Already initialized in this session.
        return;
      }

      // Meta Pixel base snippet (programmatic equivalent).
      const fbq = ((...args: unknown[]) => {
        if (typeof fbq.callMethod === "function") {
          fbq.callMethod(...args);
        } else {
          fbq.queue = fbq.queue || [];
          fbq.queue.push(args);
        }
      }) as FbqFunction;

      fbq.loaded = true;
      fbq.version = "2.0";
      fbq.queue = [];
      window.fbq = fbq;
      window._fbq = fbq;

      if (!document.querySelector("script[data-meta-pixel='true']")) {
        const pixelScript = document.createElement("script");
        pixelScript.async = true;
        pixelScript.src = "https://connect.facebook.net/en_US/fbevents.js";
        pixelScript.type = "text/javascript";
        pixelScript.setAttribute("data-meta-pixel", "true");
        document.head.appendChild(pixelScript);
      }

      window.fbq("init", metaPixelId);
      window.fbq("track", "PageView");

      console.log("Meta Pixel loaded with ID:", metaPixelId);
    };

    const storedConsent = window.localStorage.getItem(CONSENT_KEY);

    // Load immediately if consent already exists
    if (storedConsent === "accepted") {
      loadGoogleAnalytics();
      loadMetaPixel();
    }

    // Listen for consent acceptance
    const handleConsentAccepted = () => {
      loadGoogleAnalytics();
      loadMetaPixel();
    };

    window.addEventListener(CONSENT_ACCEPTED_EVENT, handleConsentAccepted);

    return () => {
      window.removeEventListener(CONSENT_ACCEPTED_EVENT, handleConsentAccepted);
    };
  }, [gaId, metaPixelId]);

  return null;
};

export default AnalyticsGate;
