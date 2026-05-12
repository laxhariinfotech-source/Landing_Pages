"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

const CONSENT_KEY = "bc_cookie_consent";
const CONSENT_ACCEPTED_EVENT = "bc-consent-accepted";

const AnalyticsGate = () => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const [analyticsEnabled, setAnalyticsEnabled] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.localStorage.getItem(CONSENT_KEY) === "accepted";
  });

  useEffect(() => {
    const enableAnalytics = () => {
      setAnalyticsEnabled(true);
    };

    window.addEventListener(CONSENT_ACCEPTED_EVENT, enableAnalytics);

    return () => {
      window.removeEventListener(CONSENT_ACCEPTED_EVENT, enableAnalytics);
    };
  }, []);

  if (!analyticsEnabled || !gaId) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
};

export default AnalyticsGate;
