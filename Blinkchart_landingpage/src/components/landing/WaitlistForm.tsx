import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { trackEvent } from "../../../lib/analytics";

type WaitlistFormProps = {
  source: string;
  buttonLabel: string;
  compact?: boolean;
  onSuccess?: () => void;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getHubSpotTrackingCookie(): string {
  if (typeof document === "undefined") {
    return "";
  }

  const match = document.cookie.match(/(?:^|; )hubspotutk=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
}

function persistFallbackSignup(email: string, source: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const key = "blinkchart_waitlist_fallback";
  const raw = window.localStorage.getItem(key);
  const current: Array<{ email: string; source: string; timestamp: string }> = raw ? JSON.parse(raw) : [];

  current.push({
    email,
    source,
    timestamp: new Date().toISOString(),
  });

  window.localStorage.setItem(key, JSON.stringify(current));
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ source, buttonLabel, compact = false, onSuccess }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const wrapperClasses = useMemo(
    () =>
      compact
        ? "lp-form-row"
        : "lp-form-row",
    [compact]
  );

  const inputClasses = `lp-input${error ? " error" : ""}`;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setError("Please enter a valid work email.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: "BlinkChart",
          lastName: "Waitlist",
          email: trimmedEmail,
          message: `Waitlist signup from ${source}`,
          pageName: "BlinkChart Landing",
          pageUri: typeof window !== "undefined" ? window.location.href : "",
          hutk: getHubSpotTrackingCookie(),
        }),
      });

      if (!response.ok) {
        throw new Error("Waitlist submission failed");
      }

      trackEvent({
        action: "waitlist_signup",
        category: "conversion",
        label: source,
      });

      // Placeholder for direct GA4 custom funnel event mapping.
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        window.gtag("event", "generate_lead", {
          source,
          product: "BlinkChart",
        });
      }

      setSuccess(true);
      setEmail("");
      onSuccess?.();
    } catch {
      persistFallbackSignup(trimmedEmail, source);
      setSuccess(true);
      setEmail("");
      onSuccess?.();
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="lp-success">
        You are in. We will send early access details to your inbox.
      </div>
    );
  }

  return (
    <form className="lp-form" onSubmit={submit} noValidate>
      <div className={wrapperClasses}>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClasses}
          placeholder="Enter your email"
          aria-label="Email address"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="lp-btn"
        >
          {loading ? "Joining..." : buttonLabel}
        </button>
      </div>

      {error ? <p className="lp-error">{error}</p> : null}
    </form>
  );
};

export default WaitlistForm;
