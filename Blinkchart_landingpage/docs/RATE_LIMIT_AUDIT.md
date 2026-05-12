# Rate Limiting Security Audit

Date: 2026-03-20
Scope: Entire codebase (API routes, auth routes, public APIs, form submissions, frontend request throttling)

## Rate Limiting Status
Partial

## Locations Found

1. `api/waitlist.ts`
- Uses `rate-limiter-flexible` (`RateLimiterMemory`)
- Configured as:
  - `points: 5`
  - `duration: 600` seconds (10 minutes)
- Keying strategy:
  - Primary: first IP from `x-forwarded-for`
  - Fallback: `req.socket?.remoteAddress`
- Applied at start of handler, before body processing and upstream submission
- Exceeded/blocked result:
  - HTTP `429`
  - JSON: `{ "message": "Too many requests. Please try again later." }`
- Failure behavior: fail-closed (limiter errors also return `429`)

2. `app/api/waitlist/route.ts`
- Uses `@vercel/firewall` with `checkRateLimit("waitlist-submit", ...)`
- IP source: first IP from `x-forwarded-for`
- Exceeded result:
  - HTTP `429`
  - JSON error response
- Depends on external Vercel Firewall rule configuration (comment indicates 5 requests per IP per 10 minutes)

## Missing Areas

1. Authentication routes (login/signup)
- No login/signup/auth API routes found in this repository.

2. Other public APIs
- No other backend API endpoints found beyond waitlist.

3. Consistency gap between duplicate waitlist handlers
- Two handlers exist for waitlist with different limiting mechanisms:
  - code-based local limiter in `api/waitlist.ts`
  - external firewall limiter in `app/api/waitlist/route.ts`
- Depending on deployment/runtime path, behavior may differ.

## Brute Force / Abuse Protection Check

1. Per-IP limiting: Present
2. Time window: Present (10 minutes in code-based limiter)
3. Brute-force mitigation for waitlist spam: Present
4. Account brute-force protection (login/password attempts): Not applicable (no auth endpoints exist)

## Frontend Throttling / Debouncing (Non-Security)

1. `src/components/HubSpotForm.tsx`
- Uses `isSubmitting` to prevent rapid repeat clicks while request is in flight.
- In local dev, submits directly to HubSpot API (bypasses local `/api/waitlist` route).

2. `src/components/Navbar.tsx`
- Uses `setTimeout`/`clearTimeout` for prefetch timing behavior.
- This is UX timing, not security rate limiting.

## Risk Level
Medium

Reasoning:
- The main waitlist endpoint has strong in-code fail-closed rate limiting in `api/waitlist.ts`.
- A second waitlist route still relies on external Vercel Firewall configuration, creating potential behavioral drift if both paths are used.
- Local development form submission bypasses local API limiting when posting directly to HubSpot.

## Recommendations (No Code Changes)

1. Standardize on one waitlist endpoint/runtime path so rate-limiting behavior is unambiguous.
2. If `app/api/waitlist/route.ts` remains active, verify the Vercel Firewall rule exists and matches 5 requests per IP per 10 minutes.
3. Add deployment/runbook documentation clarifying which waitlist endpoint is production-active.
4. Monitor HTTP 429 rates and source IP patterns in logs for abuse detection.
5. Keep fail-closed behavior for security-sensitive submissions.
