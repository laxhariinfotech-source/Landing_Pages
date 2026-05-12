// This is a basic Playwright test for cross-browser and device compatibility
// To run: npx playwright test

import { test, expect } from '@playwright/test';

const URL = 'http://localhost:5173/';

// Browsers to test
const browsers: Array<'chromium' | 'firefox' | 'webkit'> = ['chromium', 'firefox', 'webkit'];

// Devices to test (Playwright built-ins)
const devices = [
  'Desktop Chrome',
  'iPhone 13',
  'Pixel 5',
  'iPad Mini',
  'Desktop Safari'
];

test.describe('BlinkChart Landing Page Compatibility', () => {
  for (const browserType of browsers) {
    test.describe(`${browserType} browser`, () => {
      for (const deviceName of devices) {
        test(`should render correctly on ${deviceName}`, async ({ playwright }) => {
          const device = playwright.devices[deviceName];
          const browser = await playwright[browserType].launch();
          const contextOptions = { ...device };

          // Firefox does not support Playwright mobile emulation flags.
          if (browserType === 'firefox') {
            delete (contextOptions as { isMobile?: boolean }).isMobile;
            delete (contextOptions as { hasTouch?: boolean }).hasTouch;
          }

          const context = await browser.newContext(contextOptions);
          const page = await context.newPage();
          await page.goto(URL);

          // Check for main CTA
          await expect(page.getByRole('link', { name: /Join Waitlist/i }).first()).toBeVisible();

          // Landing page chart should render.
          await expect(page.locator('.demo-chart').first()).toBeVisible();

          // Pricing page should load and expose the pricing toggle.
          await page.goto(`${URL}pricing`);
          await expect(page.getByRole('heading', { name: /Simple Pricing, Massive Value\./i })).toBeVisible();
          await expect(page.getByRole('button', { name: /^Monthly$/i })).toBeVisible();
          await expect(page.getByRole('button', { name: /Annual/i })).toBeVisible();

          // Join Waitlist page should render the form heading.
          await page.goto(`${URL}joinwaitlist`);
          await expect(page.getByRole('heading', { name: /^Join Waitlist$/i })).toBeVisible();

          // Legal pages should render expected headings.
          await page.goto(`${URL}privacy`);
          await expect(page.getByRole('heading', { name: /^Privacy Policy$/i }).first()).toBeVisible();

          await page.goto(`${URL}terms`);
          await expect(page.getByRole('heading', { name: /^Terms and Conditions$/i })).toBeVisible();

          // Check for no major errors
          expect(await page.title()).not.toBe('Error');
          await browser.close();
        });
      }
    });
  }
});
