/**
 * SEO & Accessibility Tests – BlinkChart Landing Page
 *
 * Prerequisite: Start the dev server before running.
 *   npm run dev   (serves at http://localhost:5173)
 *   npx playwright test seo-accessibility.test.ts
 *
 * ┌─────────────────────────────────────────────────────────┐
 * │  SEO                                                    │
 * │  1. sitemap.xml is accessible and contains landing URL  │
 * │  2. All routes return HTTP 200 (no redirect loops)      │
 * │  3. No broken internal or external links                │
 * │  4. Favicon and icon resources load correctly           │
 * │  5. <html lang=""> attribute is present and valid       │
 * │  6. Canonical tag exists and is correct                 │
 * ├─────────────────────────────────────────────────────────┤
 * │  Accessibility                                          │
 * │  7. Icon-only buttons have aria-label attributes        │
 * │  8. Form errors are linked to their fields              │
 * │  9. Heading hierarchy and landmark structure are valid  │
 * └─────────────────────────────────────────────────────────┘
 */

import { test, expect, Page } from "@playwright/test";

// ─── Configuration ────────────────────────────────────────────────────────────

const BASE_URL = "http://localhost:5173";

/** All known client-side routes in the application. */
const KNOWN_ROUTES = [
  "/",
  "/joinwaitlist",
  "/about",
  "/contact",
  "/privacy",
  "/pricing",
  "/feature",
  "/usecases",
  "/team",
  "/terms",
  "/cookies",
  "/how-it-works",
  "/faq",
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Navigate to a route and return the HTTP status code.
 * Using page.goto() for SPA routes so Vite's history-API fallback is respected.
 */
async function getRouteStatus(page: Page, url: string): Promise<number> {
  const response = await page.goto(url, { waitUntil: "load" });
  return response?.status() ?? 0;
}

// ─── SEO Tests ────────────────────────────────────────────────────────────────

test.describe("SEO – BlinkChart Landing Page", () => {
  // ── Test 1 ────────────────────────────────────────────────────────────────
  test("1. sitemap.xml is accessible and contains the landing page URL", async ({
    request,
  }) => {
    const response = await request.get(`${BASE_URL}/sitemap.xml`);

    // The sitemap must be reachable – a 404 means it has not been created yet.
    expect(
      response.status(),
      `[FAIL] /sitemap.xml returned HTTP ${response.status()}. ` +
        "Create a sitemap.xml in the /public folder so it is served at the root."
    ).toBe(200);

    const body = await response.text();

    // The sitemap must contain a <loc> entry for the canonical root URL.
    const rootPatterns = [
      `${BASE_URL}/`,
      "https://www.blinkchart.ai/",
      "https://blinkchart.ai/",
    ];
    const containsRootUrl = rootPatterns.some((pattern) =>
      body.includes(pattern)
    );

    expect(
      containsRootUrl,
      `[FAIL] sitemap.xml does not reference the landing page URL. ` +
        `None of [${rootPatterns.join(", ")}] found.\n` +
        `Body (first 400 chars): ${body.slice(0, 400)}`
    ).toBe(true);
  });

  // ── Test 2 ────────────────────────────────────────────────────────────────
  test(
    "2. All known routes respond with HTTP 200 (no redirect loops)",
    async ({ page }) => {
      const failures: string[] = [];

      for (const route of KNOWN_ROUTES) {
        const url = `${BASE_URL}${route}`;
        let status: number;

        try {
          status = await getRouteStatus(page, url);
        } catch (err) {
          failures.push(`"${route}" → Navigation error: ${err}`);
          continue;
        }

        if (status !== 200) {
          failures.push(`"${route}" → HTTP ${status}`);
          console.error(
            `[FAIL] Route "${route}" returned HTTP ${status} instead of 200.`
          );
        }
      }

      expect(
        failures,
        `[FAIL] The following routes did not return HTTP 200:\n` +
          failures.map((f) => `  • ${f}`).join("\n")
      ).toHaveLength(0);
    }
  );

  // ── Test 3 ────────────────────────────────────────────────────────────────
  test("3. No broken links on the home page", async ({ page, request }) => {
    await page.goto(`${BASE_URL}/`);

    // Collect every unique href from anchor elements.
    const rawHrefs: string[] = await page.$$eval("a[href]", (anchors) =>
      anchors
        .map((a) => (a as HTMLAnchorElement).getAttribute("href") ?? "")
        .filter((href) => href && href !== "#" && !href.startsWith("javascript:"))
    );

    const uniqueHrefs = [...new Set(rawHrefs)];

    const internalLinks: string[] = [];
    const externalLinks: string[] = [];

    for (const href of uniqueHrefs) {
      if (href.startsWith("http://localhost") || href.startsWith("/")) {
        internalLinks.push(
          href.startsWith("/") ? `${BASE_URL}${href}` : href
        );
      } else if (href.startsWith("http://") || href.startsWith("https://")) {
        externalLinks.push(href);
      }
    }

    const failures: string[] = [];
    const warnings: string[] = [];

    // ── Internal links ──
    for (const url of internalLinks) {
      // Normalise any fragment-only variants (e.g. http://localhost:5173/#how)
      const baseOnly = url.split("#")[0];
      if (!baseOnly) continue;

      try {
        const status = await getRouteStatus(page, baseOnly);
        if (status >= 400) {
          failures.push(`[INTERNAL] ${url} → HTTP ${status}`);
        }
      } catch (err) {
        failures.push(`[INTERNAL] ${url} → Navigation error: ${err}`);
      }
    }

    // ── External links ──  (network errors are warnings, 4xx/5xx are failures)
    for (const url of externalLinks) {
      try {
        const response = await request.get(url, {
          timeout: 10_000,
          headers: { "User-Agent": "Playwright-SEO-Test/1.0" },
          maxRedirects: 5,
        });
        if (response.status() >= 400) {
          failures.push(`[EXTERNAL] ${url} → HTTP ${response.status()}`);
        }
      } catch {
        warnings.push(`[EXTERNAL] ${url} → Unreachable (possible network restriction)`);
      }
    }

    if (warnings.length > 0) {
      console.warn(
        `[WARN] External links could not be verified (possible CI network restriction):\n` +
          warnings.map((w) => `  • ${w}`).join("\n")
      );
    }

    expect(
      failures,
      `[FAIL] Broken links found:\n` +
        failures.map((f) => `  • ${f}`).join("\n")
    ).toHaveLength(0);
  });

  // ── Test 4 ────────────────────────────────────────────────────────────────
  test("4. Favicon and icon resources load correctly", async ({
    page,
    request,
  }) => {
    await page.goto(`${BASE_URL}/`);

    // 4a: A <link rel="icon"> element must exist.
    const iconHref = await page
      .$eval("link[rel~='icon']", (el) => (el as HTMLLinkElement).href)
      .catch(() => null);

    expect(
      iconHref,
      "[FAIL] No <link rel='icon'> element found in <head>. " +
        "Add a favicon link tag pointing to a file that exists in /public."
    ).not.toBeNull();

    // 4b: The favicon resource must be reachable.
    if (iconHref) {
      const response = await request.get(iconHref).catch(() => null);
      const status = response?.status() ?? 0;

      expect(
        status,
        `[FAIL] Favicon at "${iconHref}" returned HTTP ${status}. ` +
          "Move the favicon file into the /public directory so it is served " +
          "as a static asset (e.g. /public/favicon.png → href='/favicon.png')."
      ).toBeLessThan(400);
    }

    // 4c: apple-touch-icon – advisory warning only.
    const appleTouchIconEl = await page.$("link[rel='apple-touch-icon']");
    if (!appleTouchIconEl) {
      console.warn(
        "[WARN] No <link rel='apple-touch-icon'> found. " +
          "Consider adding one for iOS home-screen icon support."
      );
    }
  });

  // ── Test 5 ────────────────────────────────────────────────────────────────
  test("5. <html> element has a non-empty, valid lang attribute", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/`);

    const lang: string = await page.evaluate(
      () => document.documentElement.lang
    );

    expect(
      lang,
      "[FAIL] <html> element is missing the lang attribute. " +
        'Add lang="en" (or the applicable BCP-47 locale) to index.html.'
    ).toBeTruthy();

    // BCP-47 minimum length is 2 characters (e.g. "en").
    expect(
      lang.length,
      `[FAIL] lang="${lang}" is too short to be a valid BCP-47 language tag. ` +
        'Expected at least 2 characters (e.g. "en").'
    ).toBeGreaterThanOrEqual(2);

    // Must begin with lowercase alpha characters.
    expect(
      lang,
      `[FAIL] lang="${lang}" does not look like a valid BCP-47 tag. ` +
        'Expected format: "en", "en-US", "fr", etc.'
    ).toMatch(/^[a-zA-Z]{2,8}(-[a-zA-Z0-9]{1,8})*$/);
  });

  // ── Test 6 ────────────────────────────────────────────────────────────────
  test("6. Canonical tag exists and is well-formed", async ({ page }) => {
    await page.goto(`${BASE_URL}/`);

    const canonicalHref = await page
      .$eval(
        'link[rel="canonical"]',
        (el) => (el as HTMLLinkElement).href
      )
      .catch(() => null);

    // The canonical tag is mandatory for avoiding duplicate-content penalties.
    expect(
      canonicalHref,
      "[FAIL] No <link rel='canonical'> found on the home page. " +
        "Install react-helmet-async and add a <Helmet><link rel='canonical' " +
        "href='https://www.blinkchart.ai/' /></Helmet> to each page component."
    ).not.toBeNull();

    if (canonicalHref) {
      // Must not contain query strings (which cause unintended duplication).
      expect(
        canonicalHref,
        `[FAIL] Canonical URL "${canonicalHref}" must not contain query parameters.`
      ).not.toContain("?");

      // Must not contain hash fragments (meaningless for crawlers).
      expect(
        canonicalHref,
        `[FAIL] Canonical URL "${canonicalHref}" must not contain a hash fragment.`
      ).not.toContain("#");

      // Must use HTTPS in production.
      const isLocal = canonicalHref.startsWith("http://localhost");
      if (!isLocal) {
        expect(
          canonicalHref,
          `[FAIL] Canonical URL "${canonicalHref}" must use HTTPS.`
        ).toMatch(/^https:\/\//);
      }
    }
  });
});

// ─── Accessibility Tests ──────────────────────────────────────────────────────

test.describe("Accessibility – BlinkChart Landing Page", () => {
  // ── Test 7 ────────────────────────────────────────────────────────────────
  test(
    "7. Icon-only and symbol buttons have accessible aria-label attributes",
    async ({ page }) => {
      await page.goto(`${BASE_URL}/`);

      const failures: string[] = [];

      // ── 7a: Hamburger / nav-toggle button ──────────────────────────────────
      // The ☰ glyph is not announced by screen readers; aria-label is required.
      const navToggle = page.locator("button.nav-toggle");
      const navToggleVisible = await navToggle.isVisible().catch(() => false);

      if (navToggleVisible) {
        const ariaLabel = await navToggle.getAttribute("aria-label");
        const ariaExpanded = await navToggle.getAttribute("aria-expanded");

        if (!ariaLabel) {
          failures.push(
            'button.nav-toggle (☰ hamburger menu) is missing aria-label. ' +
              'Fix: add aria-label="Open navigation menu" to the <button> in Navbar.tsx.'
          );
        }
        if (ariaExpanded === null) {
          failures.push(
            "button.nav-toggle is missing aria-expanded. " +
              "Fix: add aria-expanded={open} to the <button> in Navbar.tsx so " +
              "screen readers announce the open/closed state."
          );
        }
      }

      // ── 7b: Chart carousel prev/next buttons (contain glyph chars only) ───
      // These render "‹" and "›" with no visible text label.
      const chartNavButtons = page.locator("button.chart-nav");
      const chartNavCount = await chartNavButtons.count();

      for (let i = 0; i < chartNavCount; i++) {
        const btn = chartNavButtons.nth(i);
        const label = await btn.getAttribute("aria-label");

        if (!label) {
          const text = (await btn.innerText({ timeout: 1000 }).catch(() => "")).trim();
          const cssClass = await btn.getAttribute("class") ?? "";
          const direction = cssClass.includes("left") ? "Previous" : "Next";

          failures.push(
            `button.chart-nav (text: "${text}", class: "${cssClass}") is missing aria-label. ` +
              `Fix: add aria-label="${direction} chart" to the <button> in Hero.tsx.`
          );
        }
      }

      // ── 7c: How-It-Works scroll arrows (pre-existing labels – regression check) ──
      const leftArrow = page.locator("button.how-arrow-left");
      const rightArrow = page.locator("button.how-arrow-right");

      if (await leftArrow.isVisible().catch(() => false)) {
        const label = await leftArrow.getAttribute("aria-label");
        if (!label) {
          failures.push(
            "button.how-arrow-left is missing aria-label. " +
              'Fix: add aria-label="Scroll left" to the scroll button in Hero.tsx.'
          );
        }
      }
      if (await rightArrow.isVisible().catch(() => false)) {
        const label = await rightArrow.getAttribute("aria-label");
        if (!label) {
          failures.push(
            "button.how-arrow-right is missing aria-label. " +
              'Fix: add aria-label="Scroll right" to the scroll button in Hero.tsx.'
          );
        }
      }

      // ── 7d: Video-close button (conditionally rendered – trigger it first) ──
      const watchDemoBtn = page
        .getByRole("button", { name: /Watch Demo/i })
        .first();
      if (await watchDemoBtn.isVisible().catch(() => false)) {
        await watchDemoBtn.click();
        const closeBtn = page.locator("button.video-close");
        const closeLabel = await closeBtn
          .getAttribute("aria-label", { timeout: 2000 })
          .catch(() => null);
        if (!closeLabel) {
          failures.push(
            "button.video-close (✕ close video) is missing aria-label. " +
              'Fix: add aria-label="Close video" to the button in Hero.tsx.'
          );
        }
        // Dismiss the modal before continuing.
        await closeBtn.click().catch(() => {});
      }

      expect(
        failures,
        `[FAIL] The following icon buttons are not accessible:\n` +
          failures.map((f) => `  • ${f}`).join("\n")
      ).toHaveLength(0);
    }
  );

  // ── Test 8 ────────────────────────────────────────────────────────────────
  test(
    "8. Waitlist form validation errors are programmatically linked to their fields",
    async ({ page }) => {
      await page.goto(`${BASE_URL}/joinwaitlist`);

      // Trigger client-side validation by submitting the empty form.
      await page.getByRole("button", { name: /Join Waitlist/i }).click();

      // Wait until at least one field-level error becomes visible.
      await expect(page.locator(".field-error").first()).toBeVisible({
        timeout: 3_000,
      });

      const failures: string[] = [];

      /**
       * Fields that show visible errors on empty submission.
       * (message is optional and only fails if > 500 chars)
       */
      const requiredFields = ["firstName", "lastName", "email"] as const;

      for (const fieldId of requiredFields) {
        const input = page.locator(`#${fieldId}`);

        const errorEl = page.locator(
          `.form-group:has(#${fieldId}) .field-error`
        );
        const errorVisible = await errorEl.isVisible().catch(() => false);

        if (!errorVisible) {
          // Validation may not have fired for this field yet – skip further checks.
          failures.push(
            `#${fieldId}: Expected a visible .field-error after empty submission ` +
              "but none appeared. Ensure client-side validation runs on submit."
          );
          continue;
        }

        // ── 8a: aria-invalid ─────────────────────────────────────────────────
        // WCAG 1.3.1 / 4.1.2 – inputs in an error state must declare aria-invalid.
        const ariaInvalid = await input.getAttribute("aria-invalid");
        if (ariaInvalid !== "true") {
          failures.push(
            `#${fieldId}: visible error shown but aria-invalid="true" is not set. ` +
              "Fix: add aria-invalid={!!errors.${fieldId}} to the <input> in HubSpotForm.tsx " +
              "so screen readers announce the field as invalid."
          );
        }

        // ── 8b: aria-describedby ─────────────────────────────────────────────
        // WCAG 1.3.1 – the error message element must be linked to the input
        // so that assistive technology reads the error text when focus lands.
        const ariaDescribedby = await input.getAttribute("aria-describedby");
        if (!ariaDescribedby) {
          failures.push(
            `#${fieldId}: visible error shown but aria-describedby is not set. ` +
              `Fix: (1) add id="${fieldId}-error" to the error <div>, ` +
              `(2) add aria-describedby="${fieldId}-error" to the <input> in HubSpotForm.tsx.`
          );
        } else {
          // Verify the referenced element actually exists in the DOM.
          const referencedEl = page.locator(`#${ariaDescribedby}`);
          const refExists = (await referencedEl.count()) > 0;
          if (!refExists) {
            failures.push(
              `#${fieldId}: aria-describedby="${ariaDescribedby}" points to an element ` +
                "that does not exist in the DOM. Ensure the error <div> has a matching id."
            );
          }
        }
      }

      expect(
        failures,
        `[FAIL] Form accessibility issues found:\n` +
          failures.map((f) => `  • ${f}`).join("\n")
      ).toHaveLength(0);
    }
  );

  // ── Test 9 ────────────────────────────────────────────────────────────────
  test(
    "9. Heading hierarchy and landmark structure are correct on the home page",
    async ({ page }) => {
      await page.goto(`${BASE_URL}/`);

      const failures: string[] = [];

      // ── 9a: <main> landmark ───────────────────────────────────────────────
      // WCAG 2.4.1 – a <main> element is required for "bypass blocks".
      const mainCount = await page.locator("main").count();
      if (mainCount === 0) {
        failures.push(
          "No <main> landmark found. " +
            "Fix: wrap the primary page content (Hero, sections) in a <main> element " +
            "in App.tsx so keyboard and screen-reader users can skip navigation."
        );
      } else if (mainCount > 1) {
        failures.push(
          `Multiple <main> landmarks found (${mainCount}). Only one <main> is permitted per page.`
        );
      }

      // ── 9b: Exactly one <h1> ──────────────────────────────────────────────
      const h1Elements = page.locator("h1");
      const h1Count = await h1Elements.count();

      if (h1Count === 0) {
        failures.push(
          "No <h1> found on the home page. Every page must have exactly one <h1>."
        );
      } else if (h1Count > 1) {
        const h1Texts = await h1Elements.allInnerTexts();
        failures.push(
          `Multiple <h1> elements found (${h1Count}): ` +
            h1Texts.map((t) => `"${t.slice(0, 60)}"`).join(", ") +
            ". Only one <h1> per page is permitted."
        );
      }

      // ── 9c: No skipped heading levels ────────────────────────────────────
      // E.g. jumping from h2 → h4 breaks the document outline.
      const headings = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll("h1, h2, h3, h4, h5, h6")
        ).map((el) => ({
          level: parseInt(el.tagName[1], 10),
          text: (el.textContent ?? "").trim().slice(0, 80),
        }));
      });

      let previousLevel = 0;
      for (const { level, text } of headings) {
        if (previousLevel > 0 && level > previousLevel + 1) {
          failures.push(
            `Heading level skipped: h${previousLevel} → h${level} ` +
              `(heading text: "${text}"). ` +
              "Fix: ensure headings increment by 1 (h1 → h2 → h3, etc.)."
          );
        }
        previousLevel = level;
      }

      // ── 9d: <nav> landmark ────────────────────────────────────────────────
      const navCount = await page.locator("nav").count();
      if (navCount === 0) {
        failures.push(
          "No <nav> landmark found. " +
            "Fix: wrap the navigation menu in a <nav> element in Navbar.tsx."
        );
      }

      // ── 9e: <footer> element ─────────────────────────────────────────────
      const footerCount = await page.locator("footer").count();
      if (footerCount === 0) {
        failures.push(
          "No <footer> element found. " +
            "Fix: ensure Footer.tsx renders a <footer> element."
        );
      }

      // ── 9f: <header> or banner landmark ──────────────────────────────────
      // A banner (<header> outside <main>) helps AT users orient to the page.
      const headerCount = await page
        .locator("header, [role='banner']")
        .count();
      if (headerCount === 0) {
        failures.push(
          "No <header> landmark or role='banner' found. " +
            "Fix: wrap the site header/navigation in a <header> element in Navbar.tsx."
        );
      }

      if (failures.length > 0) {
        // Log each issue individually for CI output readability.
        for (const msg of failures) {
          console.error(`[FAIL] ${msg}`);
        }
      }

      expect(
        failures,
        `[FAIL] Heading / landmark structure issues found:\n` +
          failures.map((f) => `  • ${f}`).join("\n")
      ).toHaveLength(0);
    }
  );
});
