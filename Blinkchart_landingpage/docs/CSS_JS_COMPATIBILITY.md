# CSS and JavaScript Compatibility Guide

## CSS Compatibility Checklist

### ✅ CSS Features That Work in All Target Browsers:

1. **Flexbox** - Fully supported (IE 11+)
   - Use unprefixed properties
   - No vendor prefixes needed

2. **CSS Grid** - IE 11 does NOT support
   - Use Flexbox fallback for IE 11
   - Test layout in both

3. **CSS Variables (Custom Properties)** - IE 11 does NOT support
   - Provide static fallback values
   ```css
   color: #333333;  /* Fallback for IE 11 */
   color: var(--text-color, #333333);
   ```

4. **Transform & Transitions** - Supported everywhere
   - No vendor prefixes needed for modern targets

5. **Media Queries** - Supported everywhere
   - Test: `@media (max-width: 768px)`

### 🚫 CSS to AVOID:

- CSS Grid on IE 11 (use Flexbox instead)
- Grid Template Areas on IE 11
- CSS Subgrid (not supported in older Safari)
- Logical properties (`margin-block` - IE 11)
- `aspect-ratio` property on IE 11 (use padding-bottom hack)

### CSS Reset Needed:

Ensure consistent cross-browser rendering:
```css
/* Box sizing - normalize across browsers */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* Remove default margins/paddings */
body, h1, h2, h3, p, ul, ol, li {
  margin: 0;
  padding: 0;
}

/* Remove list styles */
ul, ol {
  list-style: none;
}

/* Font smoothing for better rendering */
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

## JavaScript Compatibility Checklist

### ✅ Safe to Use (Works in IE 11+):

- `Array.map()`, `Array.filter()`, `Array.reduce()`
- `String.includes()`, `String.startsWith()`
- `Object.assign()`
- `Promise` (IE 11 with polyfill)
- `JSON.parse()`, `JSON.stringify()`
- Template literals (with transpilation)
- Arrow functions (with transpilation)
- Destructuring (with transpilation)
- Const/let (with transpilation)

### ⚠️ Requires Polyfill or Alternative:

1. **Fetch API** - Not in IE 11
   - Modern browsers: Native fetch
   - IE 11: Use XMLHttpRequest fallback or polyfill
   ```javascript
   if (!window.fetch) {
     // Polyfill or XMLHttpRequest fallback
   }
   ```

2. **IntersectionObserver** - Not in older browsers
   - Polyfill: `intersection-observer` npm package

3. **Array Methods** - IE 9 compatibility
   - `flat()`, `flatMap()` - Not in IE 11

4. **Object Methods** - Modern only
   - `Object.fromEntries()` - IE 12+
   - Use alternatives for IE 11

### 🚫 Never Use Without Checks:

- `async/await` (IE 11 doesn't support)
- Optional chaining `?.` (IE 11)
- Nullish coalescing `??` (IE11)
- BigInt (IE 12+)

### Recommended Polyfills:

Install for IE 11 support:
```bash
npm install --save-dev \
  @babel/polyfill \
  fetch-polyfill \
  intersection-observer \
  promise-polyfill
```

## Testing Mobile Responsiveness

### CSS Media Queries to Test:

```css
/* Mobile First Approach */

/* Very small devices (320px - 374px) */
@media (max-width: 374px) {
  /* iPhone SE, older phones */
}

/* Mobile devices (375px - 767px) */
@media (min-width: 375px) and (max-width: 767px) {
  /* iPhone 6+, typical phones */
}

/* Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  /* iPad, large tablets */
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  /* Desktop monitors */
}
```

### Touch Device Detection:

```javascript
const isTouchDevice = () => {
  return (
    (typeof window !== 'undefined' &&
      ('ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0))
  );
};

if (isTouchDevice()) {
  // Adjust for touch (larger buttons, etc)
}
```

### Viewport Testing:

Test these exact viewport sizes:
- iPhone 6/7/8: 375 × 667
- iPhone XS/11 Pro: 375 × 812
- iPhone 12 Pro: 390 × 844
- iPhone Max: 414 × 896
- iPad: 768 × 1024
- iPad Pro: 1024 × 1366
- Desktop: 1920 × 1080
- Ultrawide: 2560 × 1440

## Performance Compatibility

### Image Loading:

Use modern formats with fallbacks:
```html
<picture>
  <source srcset="image.webp" type="image/webp" />
  <source srcset="image.jpg" type="image/jpeg" />
  <img src="image.jpg" alt="fallback" />
</picture>
```

### Lazy Loading:

```html
<!-- Modern browsers support loading="lazy" -->
<img src="image.jpg" alt="..." loading="lazy" />

<!-- Fallback for older browsers with Intersection Observer -->
```

## Browser-Specific Fixes

### IE 11:

```css
/* Icon font fix */
@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
  /* IE10/11 specific styles */
}

/* Flexbox alignment issue in IE 11 */
align-items: flex-start; /* Required in IE 11 */
```

### Safari Mobile:

```css
/* iPhone notch handling */
padding: env(safe-area-inset-bottom);

/* Smooth scrolling */
-webkit-overflow-scrolling: touch;

/* Input styling */
font-size: 16px; /* Prevents zoom on iOS */
```

### Older Chrome/Edge:

```css
/* Smooth scrolling fallback */
scroll-behavior: smooth; /* Works Chrome 61+, Edge 15+ */
```

## Automated Testing

### Browser Testing Tools:

1. **BrowserStack** - Real devices
   - Test on actual iPhones, Android devices
   - IE 11 on real Windows machines

2. **LambdaTest** - 3000+ browsers/devices

3. **Sauce Labs** - Automated testing

4. **Chrome DevTools Device Emulation**
   - DevTools > More Tools > Device Mode (Ctrl+Shift+M)

### Testing Checklist:

- [ ] Form submission works on all browsers
- [ ] Images load and display correctly
- [ ] Fonts load correctly with fallback
- [ ] Responsive layout adjusts properly
- [ ] No JavaScript errors in console
- [ ] Touch interactions work on mobile
- [ ] Links are clickable (minimum 44×44px on mobile)
- [ ] No horizontal scrolling on mobile
- [ ] Color contrast meets WCAG AA standards

## Reporting Issues

If you find compatibility issues:

1. **Document:**
   - Browser name and version
   - Device type
   - Steps to reproduce
   - Screenshot
   - Console errors

2. **Create issue** in your project tracker

3. **Fix priority:**
   - Critical: Core functionality broken
   - High: Visual/UX issue affects experience
   - Medium: Minor display issue
   - Low: Non-critical cosmetic issue
