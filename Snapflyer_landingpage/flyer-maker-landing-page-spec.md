# Flyer Maker Landing Page — React Implementation Spec
> Structural document for use as an implementation prompt in Antigravity

---

## Overview

Build a responsive React landing page for a **free online flyer maker** tool, modeled after PosterMyWall's flyer maker page. The page should convert visitors into users by showcasing templates, features, AI tools, and social proof. It must feel modern, creative, and trustworthy.

**Tech Stack:** React (functional components + hooks), Tailwind CSS, React Router (for nav links), Lucide React (icons)

---

## Page Layout — Section Order

```
1. Navbar
2. Hero Section
3. Template Gallery Strip
4. How It Works (3-step)
5. Features Grid
6. AI Tools Highlight
7. Use Cases / Categories
8. Testimonials
9. Pricing Teaser
10. Final CTA Banner
11. Footer
```

---

## Section 1 — Navbar

**Layout:** Sticky top bar, full-width, white background with subtle bottom border.

**Left:** Logo (`FlyerCraft` or similar brand name) — bold wordmark, accent color dot or icon.

**Center nav links (desktop):**
- Templates
- Features
- Pricing
- AI Tools
- Business

**Right:**
- `Log In` — ghost/text button
- `Get Started Free` — filled CTA button (accent color, rounded)

**Mobile:** Hamburger menu collapses center links into a slide-down drawer.

**Props/State:**
- `isScrolled` — adds shadow on scroll
- `isMobileMenuOpen` — toggles mobile drawer

---

## Section 2 — Hero Section

**Layout:** Two-column (text left, visual right) on desktop. Stacked on mobile.

**Left column — Copy:**
- Eyebrow tag: `✦ 1.3M+ free templates`
- H1: `Make Stunning Flyers in Minutes`
- Subheadline: `Design professional flyers for any event, business, or occasion. No design skills needed.`
- Two CTA buttons:
  - Primary: `Create Your Flyer — It's Free` (large, filled)
  - Secondary: `Browse Templates` (outlined)
- Trust line below buttons: `⭐ 4.8/5 · Trusted by 10M+ users · No credit card required`

**Right column — Visual:**
- Floating card mockup showing 3 overlapping flyer template previews (use placeholder colored cards with gradient fills)
- Subtle animated floating effect (CSS keyframe `translateY` loop)
- Small badge overlay: `AI-Powered` pill in top-right corner of the visual block

**Background:** Soft gradient (very light purple/lavender to white) or a subtle dot-grid pattern.

**Component:** `<HeroSection />`

---

## Section 3 — Template Gallery Strip

**Purpose:** Show breadth of templates. Horizontal scroll strip with category filter tabs.

**Layout:**
- Section title: `Explore 1,300,000+ Flyer Templates`
- Filter tabs row (scrollable on mobile):
  - All · Party · Business · Event · Sale · Restaurant · School · Church · Sports · Holiday
- Grid of template cards below: `4 columns desktop / 2 columns mobile`, 8 cards shown, `+ View All Templates` button

**Template Card component `<TemplateCard />`:**
- Colored rectangle (aspect ratio 3:4 — portrait flyer shape)
- Gradient fill (use varied color pairs as placeholders)
- Hover: slight scale-up + shadow + `Use This Template` button overlay
- Bottom label: category tag in small pill

**Props:** `{ id, title, category, gradientFrom, gradientTo }`

**State:** `activeCategory` — filters visible templates

---

## Section 4 — How It Works

**Layout:** 3-column steps, centered, light gray background strip.

**Section heading:** `Create a Flyer in 3 Easy Steps`
**Subheading:** `No design experience required`

**Step cards (3):**

| Step | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | 🔍 Search icon | Choose a Template | Browse 1.3M+ designs by category, style, or color |
| 2 | ✏️ Edit icon | Customize Your Design | Edit text, images, colors, and fonts with drag-and-drop |
| 3 | 📤 Share icon | Download & Share | Export in HD or share directly to social media |

**Visual connector:** Dashed arrow line between steps (desktop only, hidden mobile)

**Component:** `<HowItWorks />` with `<StepCard number title description icon />`

---

## Section 5 — Features Grid

**Layout:** 2×3 grid (desktop), 1 column (mobile). White background.

**Section heading:** `Everything You Need to Design Like a Pro`

**Feature cards (6):**

| Icon | Title | Description |
|------|-------|-------------|
| Grid icon | Drag-and-Drop Editor | Intuitive design canvas — no learning curve |
| Image icon | Millions of Stock Assets | Photos, videos, icons, and illustrations built in |
| Palette icon | Brand Kits | Save your colors, fonts, and logos for instant use |
| Layers icon | Multi-Page Layouts | Design multi-page flyers and booklets |
| Share2 icon | One-Click Publishing | Post to Instagram, Facebook, and more instantly |
| Download icon | HD Downloads | Export print-ready files in PNG, PDF, or MP4 |

**Card style:** White card, light border, icon in accent-colored circle, title bold, description muted gray.

**Component:** `<FeaturesGrid />` with `<FeatureCard icon title description />`

---

## Section 6 — AI Tools Highlight

**Layout:** Alternating left/right rows (2 rows), full-width, very light background.

**Section heading:** `Supercharge Your Creativity with AI`

**Row 1 — Image left, text right:**
- Visual: Illustrated card showing "before/after" background removal mockup (colored placeholder div)
- Title: `AI Background Remover`
- Body: `Remove image backgrounds instantly with one click. Clean, crisp cutouts every time.`
- CTA link: `Try it free →`

**Row 2 — Text left, image right:**
- Visual: Placeholder showing AI-generated design variants
- Title: `AI Redesign & Image Generator`
- Body: `Generate unique images from a prompt, or instantly redesign your flyer in a new style.`
- CTA link: `Explore AI tools →`

**Component:** `<AIToolsSection />` with `<AIToolRow title body ctaText imageSide />`

---

## Section 7 — Use Cases / Category Links

**Layout:** Masonry-style or uniform grid of category tiles. Light background.

**Section heading:** `Flyers for Every Occasion`

**Category tiles (10–12):**
- Party Flyers
- Business Flyers
- Event Flyers
- Restaurant Flyers
- School Flyers
- Church Flyers
- Real Estate Flyers
- Sale & Promotion
- Concert & Music
- Sports Flyers
- Holiday Flyers
- Bar & Nightlife

**Tile style:** Colored background pill/card with icon + label. Hover: darker shade.

**Component:** `<UseCasesSection />` with `<CategoryTile label color icon />`

---

## Section 8 — Testimonials

**Layout:** 3-column card grid (desktop), horizontally scrollable on mobile.

**Section heading:** `Loved by Millions of Creators`
**Sub-stat bar:** `⭐ 4.8/5 average · 10M+ users · 50+ countries`

**Testimonial cards (6, show 3 on desktop):**
Each card includes:
- Star rating (5 stars)
- Quote text (2–3 sentences)
- Avatar circle (initials, colored background)
- Name + role/context (e.g., "Event Planner", "Small Business Owner")

**Sample quotes to use:**
1. "I've made over 100 flyers and posters. They always attract attention!"
2. "So easy to use. I created a professional menu in minutes."
3. "The templates are stunning. My students and I love it!"
4. "Being a bandleader, I can have promos printed and published in under an hour."
5. "Our marketing team is small but we pack a large punch thanks to this platform."
6. "Number one software for posters and flyers. The variety is endless."

**Component:** `<TestimonialsSection />` with `<TestimonialCard quote name role stars />`

---

## Section 9 — Pricing Teaser

**Layout:** 3-column pricing cards. White background. Center card highlighted.

**Section heading:** `Start Free. Upgrade When You're Ready.`

**Plans:**

| Plan | Price | Highlights | CTA |
|------|-------|------------|-----|
| Free | $0/mo | 1,000s of templates · Standard quality · 100 email sends/mo | Get Started Free |
| Premium ⭐ | $9.99/mo | All templates · HD downloads · 10,000 emails/mo · Brand Kits | Start Free Trial |
| Team | $19.99/mo | Everything in Premium · 5 seats · Collaboration · Priority support | Contact Sales |

**Card style:**
- Free and Team: white card, thin border
- Premium: slightly elevated, accent-colored top border or badge `Most Popular`

**Component:** `<PricingSection />` with `<PricingCard plan price features ctaText highlighted />`

---

## Section 10 — Final CTA Banner

**Layout:** Full-width, bold accent background (deep purple or brand color gradient). Centered text.

**Content:**
- Heading: `Ready to Create Your First Flyer?`
- Subtext: `Join 10 million creators. Free forever — no design skills needed.`
- CTA button: `Create a Free Flyer` (white button, dark text)
- Small note below: `No credit card required · Cancel anytime`

**Component:** `<CTABanner />`

---

## Section 11 — Footer

**Layout:** 4-column grid (desktop), stacked on mobile. Dark background (near-black or very dark gray).

**Columns:**

**Col 1 — Brand:**
- Logo + tagline: `Design made simple for everyone.`
- Social icons: Instagram, Facebook, Twitter/X, TikTok, Pinterest

**Col 2 — Product:**
- Flyer Maker
- Poster Maker
- Video Maker
- Email Campaigns
- Event Pages
- Social Media Templates

**Col 3 — Resources:**
- Blog
- Help Center
- Tutorials
- Template Gallery
- What's New

**Col 4 — Company:**
- About Us
- Careers
- Press
- Privacy Policy
- Terms of Service
- Contact Us

**Bottom bar:** `© 2025 FlyerCraft Inc. All rights reserved.` + language selector dropdown

**Component:** `<Footer />`

---

## Global Design Tokens

```js
// tailwind.config.js — extend with these custom values
colors: {
  brand: {
    primary: '#6C3EE8',    // Deep purple — main accent
    light: '#EDE9FD',      // Light purple — backgrounds
    dark: '#3B1F8C',       // Dark purple — hover states
  },
  neutral: {
    50: '#F9F9F9',
    100: '#F1F1F1',
    800: '#1F1F1F',
    900: '#111111',
  }
}
fontFamily: {
  display: ['Sora', 'sans-serif'],    // Headlines
  body: ['Inter', 'sans-serif'],      // Body text
}
```

**Import fonts in index.html:**
```html
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500&display=swap" rel="stylesheet">
```

---

## Component File Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   ├── sections/
│   │   ├── HeroSection.jsx
│   │   ├── TemplateGallery.jsx
│   │   ├── HowItWorks.jsx
│   │   ├── FeaturesGrid.jsx
│   │   ├── AIToolsSection.jsx
│   │   ├── UseCasesSection.jsx
│   │   ├── TestimonialsSection.jsx
│   │   ├── PricingSection.jsx
│   │   └── CTABanner.jsx
│   └── ui/
│       ├── TemplateCard.jsx
│       ├── FeatureCard.jsx
│       ├── TestimonialCard.jsx
│       ├── PricingCard.jsx
│       ├── StepCard.jsx
│       └── CategoryTile.jsx
├── data/
│   ├── templates.js       // Mock template data
│   ├── features.js        // Features list
│   ├── testimonials.js    // Testimonial quotes
│   └── pricing.js         // Pricing plan data
├── App.jsx                // Assembles all sections
└── main.jsx
```

---

## Data Shape Examples

### templates.js
```js
export const templates = [
  { id: 1, title: 'Summer Party', category: 'Party', gradientFrom: '#FF6B6B', gradientTo: '#FFE66D' },
  { id: 2, title: 'Grand Opening', category: 'Business', gradientFrom: '#4FACFE', gradientTo: '#00F2FE' },
  // ... 6 more
];
```

### testimonials.js
```js
export const testimonials = [
  { id: 1, quote: "I've made over 100 flyers...", name: "Lura Lee E.", role: "Event Organizer", stars: 5 },
  // ...
];
```

### pricing.js
```js
export const plans = [
  { id: 'free', name: 'Free', price: 0, features: [...], cta: 'Get Started Free', highlighted: false },
  { id: 'premium', name: 'Premium', price: 9.99, features: [...], cta: 'Start Free Trial', highlighted: true },
  { id: 'team', name: 'Team', price: 19.99, features: [...], cta: 'Contact Sales', highlighted: false },
];
```

---

## Responsive Breakpoints

| Breakpoint | Width | Layout notes |
|------------|-------|--------------|
| `sm` | 640px | Mobile — single column everywhere |
| `md` | 768px | Tablet — 2-col grids |
| `lg` | 1024px | Desktop — full layouts |
| `xl` | 1280px | Wide — max container width 1200px |

---

## Animation Notes

- Hero visual: CSS `@keyframes float` — subtle `translateY(-8px)` loop, 3s ease-in-out infinite
- Template card hover: `transition: transform 0.2s, box-shadow 0.2s` → `scale(1.03)`
- Section reveals: Use `IntersectionObserver` + Tailwind `opacity-0 translate-y-4` → `opacity-100 translate-y-0` transition on scroll
- CTA button hover: slight `scale(1.02)` + brightness lift

---

## Accessibility Requirements

- All images have `alt` text
- Buttons have descriptive `aria-label` where icon-only
- Color contrast meets WCAG AA (4.5:1 for body text)
- Keyboard-navigable navbar and modals
- Focus rings on all interactive elements (`focus:ring-2 focus:ring-brand-primary`)

---

## Notes for Antigravity

- This is a **marketing/landing page**, not the actual editor app. All CTAs can link to `#` or a placeholder `/signup` route.
- Use **placeholder gradient rectangles** (portrait 3:4 ratio) in place of real flyer images — no external image URLs needed.
- Keep all data in `/src/data/` files so content is easy to swap out.
- Prioritize the **Hero, Template Gallery, Features, and Testimonials** sections first — they carry the most conversion weight.
- The Navbar and Footer are shared layout components — build them once and reuse across pages.
