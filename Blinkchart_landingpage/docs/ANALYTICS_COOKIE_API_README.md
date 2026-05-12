# BlinkChart Analytics, Cookie Consent, and Waitlist API README,,,trigger deployment

This document explains how analytics, cookie consent, and waitlist API protection are implemented in this Vite-based landing page.

## 1\) Analytics deployment trigger.

### Environment variables

Set these values in `.env` for local development:

```env
VITE\_GA\_ID=G-XXXXXXXXXX
VITE\_HUBSPOT\_PORTAL\_ID=your\_portal\_id
VITE\_HUBSPOT\_FORM\_ID=your\_form\_id
```

For Vercel serverless API runtime, also set:

```env
HUBSPOT\_PORTAL\_ID=your\_portal\_id
HUBSPOT\_FORM\_ID=your\_form\_id
```

### Files involved

* `src/components/AnalyticsGate.tsx`
* `lib/analytics.ts`
* `src/main.tsx`

### How it works

* `AnalyticsGate` checks `localStorage.getItem("bc\_cookie\_consent")`.
* If consent is `accepted`, it loads Google Analytics.
* It listens for the custom event `bc-consent-accepted` to enable analytics after user acceptance.
* `trackEvent()` in `lib/analytics.ts` safely pushes events to `dataLayer` and calls `window.gtag` only when available.

### Events currently tracked

* `click\_waitlist\_cta`
* `click\_watch\_demo`
* `form\_submit`
* `click\_email`

## 2\) Cookie Consent

### Files involved

* `src/components/CookieBanner.tsx`
* `src/components/CookieSettingsLink.tsx`
* `src/components/Footer.tsx`

### Consent behavior

* Consent key: `bc\_cookie\_consent`
* Accept flow:

  * Stores `accepted`
  * Dispatches event `bc-consent-accepted`
  * Hides banner
* Reject flow:

  * Stores `rejected`
  * Hides banner

### Reset mechanism

* Footer includes `CookieSettingsLink`.
* Clicking it removes `bc\_cookie\_consent` from localStorage and reloads the page.
* Banner appears again, allowing user to re-select consent.

### Cookies policy page

* Route: `/cookies`
* File: `src/pages/Cookies.tsx`
* Added to router in `src/App.tsx`

## 3\) Waitlist API (Validation, Honeypot, Rate Limiting)

### Files involved

* Client submit: `src/components/HubSpotForm.tsx`
* API endpoint: `api/waitlist.ts`
* Vercel routing: `vercel.json`

### Request flow

1. Form submits `POST /api/waitlist`.
2. API applies rate limiting by client IP.
3. API performs honeypot check.
4. API validates required fields and email format.
5. API forwards valid payload to HubSpot Forms API.

### Security controls

* **Rate limit**:

  * Uses `@vercel/firewall` with `checkRateLimit("waitlist-submit", ...)`
  * Returns `429` with message if exceeded
  * IP extracted from `x-forwarded-for`
* **Honeypot**:

  * Hidden field `website` in form
  * If filled, API silently returns success (`200`) to avoid signaling bots
* **Server-side validation**:

  * Requires `firstName`, `lastName`, `email`
  * Invalid email returns `400`

## 4\) Vercel Deployment Notes

### `vercel.json`

`/api/\*` rewrite must be above SPA fallback:

```json
{
  "rewrites": \[
    { "source": "/api/(.\*)", "destination": "/api/$1" },
    { "source": "/(.\*)", "destination": "/index.html" }
  ]
}
```

### Required Vercel setup

1. Set environment variables:

   * `VITE\_GA\_ID`
   * `HUBSPOT\_PORTAL\_ID`
   * `HUBSPOT\_FORM\_ID`
2. Configure Vercel Firewall rule:

   * Rule ID: `waitlist-submit`
   * Policy: `5 requests / 10 minutes / IP`

## 5\) Quick Verification Checklist

* Build succeeds: `npm run build`
* Cookie banner appears on first load
* Accepting cookies enables analytics
* CTA clicks produce `trackEvent()` logs
* `/cookies` route opens and renders
* Waitlist valid submit succeeds
* Invalid email returns error
* Repeated spam submit eventually returns `429`

## 6\) Troubleshooting

* If events do not appear in GA standard reports immediately, check **Realtime** or **DebugView** first.
* If `/api/waitlist` does not work after deploy, confirm `vercel.json` rewrite order and server env vars.
* If rate limiting appears inactive, verify the `waitlist-submit` firewall rule exists and is enabled in Vercel.

