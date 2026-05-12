const CONSENT_KEY = "bc_cookie_consent";

const CookieSettingsLink = () => {
  const resetCookieConsent = () => {
    window.localStorage.removeItem(CONSENT_KEY);
    // Trigger a full refresh so the banner remounts consistently across pages.
    window.location.reload();
  };

  return (
    <button
      type="button"
      className="cookie-settings-link"
      onClick={resetCookieConsent}
      aria-label="Reset cookie preferences"
    >
      Cookie Settings
    </button>
  );
};

export default CookieSettingsLink;
