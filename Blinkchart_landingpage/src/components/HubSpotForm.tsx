import { useState } from "react";
import "../JoinWaitList.css";
import { trackEvent } from "../../lib/analytics";
import { sanitizeMessage, validateMessageContent } from "../utils/sanitizeMessage";

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
}

const getPageContext = () => {
  if (typeof window === "undefined") {
    return {
      pageName: "BlinkChart",
      pageUri: "https://www.blinkchart.ai/",
      hutk: undefined,
    };
  }

  const pageName = document.title?.trim() || "BlinkChart";
  const pageUri = window.location.href || "https://www.blinkchart.ai/";
  const hutk = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("hubspotutk="))
    ?.split("=")[1];

  return { pageName, pageUri, hutk };
};

const HubSpotForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Validation functions
  const validateFirstName = (value: string): string | undefined => {
    const v = value.trim();
    if (!v) return "First name is required";
    if (v.length < 2) return "First name must be at least 2 characters";
    if (v.length > 40) return "First name must be 40 characters or fewer";
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]+$/.test(v)) return "Enter a valid first name (letters only)";
    return undefined;
  };

  const validateLastName = (value: string): string | undefined => {
    const v = value.trim();
    if (!v) return "Last name is required";
    if (v.length < 2) return "Last name must be at least 2 characters";
    if (v.length > 40) return "Last name must be 40 characters or fewer";
    if (!/^[A-Za-zÀ-ÖØ-öø-ÿ'\- ]+$/.test(v)) return "Enter a valid last name (letters only)";
    return undefined;
  };

  const validateEmail = (raw: string): string | undefined => {
    // Normalise: trim whitespace and lowercase
    const value = raw.trim().toLowerCase();

    if (!value) return "Email is required";
    if (value.length > 254) return "Email address is too long (max 254 characters)";

    // RFC 5321/5322-compliant pattern:
    //   local part: letters, digits, and !#$%&'*+/=?^_`{|}~- and dots
    //     (no leading/trailing/consecutive dots)
    //   domain: labels of [a-z0-9] with optional internal hyphens,
    //     separated by dots, ending in a TLD of 2+ chars
    // Supports: user+tag@domain.com, user@sub.domain.co.uk, user@company.photography
    const EMAIL_REGEX =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*\.[a-z]{2,}$/;

    if (!EMAIL_REGEX.test(value)) return "Enter a valid email address";

    const atIdx = value.lastIndexOf("@");
    const localPart = value.slice(0, atIdx);
    const domainPart = value.slice(atIdx + 1);

    if (localPart.length > 64) return "Email local part is too long (max 64 characters)";
    if (domainPart.includes("..")) return "Enter a valid email address";

    return undefined;
  };

  const validateMessage = (value: string): string | undefined => {
    return validateMessageContent(value);
  };

  // Field blur handlers — trim state value then validate
  const handleFirstNameBlur = () => {
    const trimmed = firstName.trim();
    setFirstName(trimmed);
    setErrors(prev => ({ ...prev, firstName: validateFirstName(trimmed) }));
  };

  const handleLastNameBlur = () => {
    const trimmed = lastName.trim();
    setLastName(trimmed);
    setErrors(prev => ({ ...prev, lastName: validateLastName(trimmed) }));
  };

  const handleEmailBlur = () => {
    const trimmed = email.trim().toLowerCase();
    setEmail(trimmed);
    setErrors(prev => ({ ...prev, email: validateEmail(trimmed) }));
  };

  const handleMessageBlur = () => {
    setErrors(prev => ({ ...prev, message: validateMessage(message) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Honeypot: silently reject bots that fill the hidden field
    if (honeypot) {
      setFormSubmitted(true);
      return;
    }

    // Validate all fields
    const validationErrors: ValidationErrors = {
      firstName: validateFirstName(firstName),
      lastName: validateLastName(lastName),
      email: validateEmail(email),
      message: validateMessage(message)
    };

    // Remove undefined errors
    Object.keys(validationErrors).forEach(key => {
      if (validationErrors[key as keyof ValidationErrors] === undefined) {
        delete validationErrors[key as keyof ValidationErrors];
      }
    });

    setErrors(validationErrors);

    // Block submission if there are errors
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const { pageName, pageUri, hutk } = getPageContext();

    // Trim all values before sending
    const data = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      website: honeypot,
      pageName,
      pageUri,
      ...(hutk ? { hutk } : {}),
    };

    try {
      console.log("[FORM] Submitting to /api/waitlist:", data);
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      console.log("[FORM] Response status:", response.status);
      if (response.ok) {
        trackEvent({ action: "form_submit", category: "conversion", label: "waitlist_form" });
        setFormSubmitted(true);
        // Reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
        setHoneypot("");
        setErrors({});
      } else {
        type ErrorPayload = {
          message?: string;
          errors?: Array<{ message?: string }>;
          error?: string;
          raw?: string;
          hubspotStatus?: number;
          hubspotResponse?: string;
        };

        let errorData: ErrorPayload | string | undefined = undefined;
        let rawErrorText = "";

        try {
          rawErrorText = await response.text();

          if (rawErrorText) {
            try {
              const parsed = JSON.parse(rawErrorText);
              errorData = parsed;
              
              // Log HubSpot errors to console for debugging
              if (parsed.hubspotStatus) {
                console.error("[DEBUG] HubSpot Error Details:", {
                  status: parsed.hubspotStatus,
                  response: parsed.hubspotResponse,
                });
              }
            } catch {
              errorData = rawErrorText;
            }
          }
        } catch (readErr) {
          console.error("Failed to read error body from /api/waitlist", readErr);
        }

        console.error("Waitlist submission error response", {
          status: response.status,
          statusText: response.statusText,
          parsedError: errorData,
          rawErrorText,
        });
 let normalizedMessage = "";

// ✅ FIX: Handle 429 explicitly
if (response.status === 429) {
  normalizedMessage = "Too many requests. Please try again after a few minutes.";
} else {
  normalizedMessage =
    (typeof errorData === "object" && errorData !== null
      ? errorData.message || errorData.errors?.[0]?.message || errorData.error
      : undefined) ||
    (typeof errorData === "string" ? errorData : undefined) ||
    rawErrorText ||
    "Form already submitted or something went wrong. Please try again.";
}

setError(normalizedMessage);

// ✅ IMPORTANT: stop further execution
return;
      }
    } catch (err) {
      console.error("HubSpot submission error:", err);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formSubmitted) {
    return (
      <div className="waitlist-card">
        <h2 className="waitlist-title">Thank You! 🎉</h2>
        <p className="waitlist-subtitle">
          We've received your information and will be in touch soon.
        </p>
        <button
          className="waitlist-btn"
          onClick={() => {
            setFormSubmitted(false);
            setErrors({});
          }}
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <div className="waitlist-card">
      <h2 className="waitlist-title">Join Waitlist</h2>
      <p className="waitlist-subtitle">

      </p>
      
      <form className="waitlist-form" method="post" action="/api/waitlist" onSubmit={handleSubmit} noValidate>
        {/* Honeypot field — hidden from users, traps bots */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
        <div className="form-group">
          <label htmlFor="firstName">First Name <span>*</span></label>
          <input
            type="text"
            id="firstName"
            name="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            onBlur={handleFirstNameBlur}
            placeholder="Enter your first name"
            autoComplete="given-name"
            maxLength={40}
            className={errors.firstName ? "error" : ""}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? "firstName-error" : undefined}
          />
          {errors.firstName && (
            <div id="firstName-error" className="field-error" role="alert">{errors.firstName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name <span>*</span></label>
          <input
            type="text"
            id="lastName"
            name="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            onBlur={handleLastNameBlur}
            placeholder="Enter your last name"
            autoComplete="family-name"
            maxLength={40}
            className={errors.lastName ? "error" : ""}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? "lastName-error" : undefined}
          />
          {errors.lastName && (
            <div id="lastName-error" className="field-error" role="alert">{errors.lastName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">
            Email <span>*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            onBlur={handleEmailBlur}
            placeholder="Enter your email"
            autoComplete="email"
            required
            inputMode="email"
            maxLength={254}
            className={errors.email ? "error" : ""}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <div id="email-error" className="field-error" role="alert">{errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(sanitizeMessage(e.target.value))}
            onBlur={handleMessageBlur}
            placeholder="Tell us what you're interested in..."
            rows={4}
            maxLength={500}
            className={errors.message ? "error" : ""}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
          />
          {errors.message && (
            <div id="message-error" className="field-error" role="alert">{errors.message}</div>
          )}
        </div>

        {error && (
          <div role="alert" style={{ color: "#dc2626", fontSize: "14px", textAlign: "center" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="waitlist-btn"
          disabled={isSubmitting}
        >
            {isSubmitting ? "Submitting..." : "Join Waitlist"}
        </button>

      </form>
    </div>
  );
};

export default HubSpotForm;
