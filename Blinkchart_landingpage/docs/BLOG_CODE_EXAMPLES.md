# Blog Feature - Code Examples & Usage Guide

## 🔥 Quick Code Examples

### Example 1: How the Blog Routes Work

**In App.tsx:**hfgfhfftyfhvftrtf
```tsx
// Blog route added to your app
<Route
  path="/blog/:slug"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <BlogDetail />
      </Suspense>
      <Footer />
    </>
  }
/>

// BlogSection added to home page
<Route
  path="/"
  element={
    <>
      <Navbar />
      <Hero />
      <BlogSection />  {/* ← Displays 6 blog cards */}
      <Footer />
    </>
  }
/>
```

### Example 2: Blog Data Structure

**In src/data/blogData.ts:**
```tsx
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "From Spreadsheet Chaos to Visual Clarity",
    slug: "from-spreadsheet-chaos-to-visual-clarity",
    metaDescription: "Transform your messy spreadsheets into clear, professional visualizations",
    shortDescription: "Transform messy spreadsheets into professional visualizations.",
    publishDate: "March 15, 2026",
    readTime: 5,
    content: [
      { type: "h1", content: "From Spreadsheet Chaos to Visual Clarity" },
      { type: "p", content: "Spreadsheets are everywhere..." },
      { type: "h2", content: "The Spreadsheet Problem" },
      { type: "p", content: "Raw numbers on a screen overwhelm..." },
      { type: "ul", content: [
        "Visual processing: Humans process images 60,000x faster than text",
        "Pattern recognition: Charts reveal trends invisible in raw numbers",
        "Decision speed: Clear visuals lead to faster, better decisions",
        "Communication: Pictures are worth a thousand words"
      ]},
      { type: "h2", content: "The BlinkChart Solution" },
      { type: "p", content: "BlinkChart turns spreadsheet chaos..." }
    ]
  },
  // ... more posts
];
```

### Example 3: BlogCard Component

**In src/components/BlogCard.tsx:**
```tsx
import React from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "../data/blogData";
import "./blog.css";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link to={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
      <div className="blog-card">
        <div className="blog-card-content">
          <h3 className="blog-card-title">{post.title}</h3>
          <p className="blog-card-description">{post.shortDescription}</p>
          <div className="blog-card-meta">
            <span className="blog-card-date">{post.publishDate}</span>
            <span className="blog-card-read-time">{post.readTime} min read</span>
          </div>
        </div>
        <div className="blog-card-footer">
          <span className="blog-card-link">Read More →</span>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
```

### Example 4: Blog Detail Page with Content Rendering

**In src/pages/BlogDetail.tsx (key parts):**
```tsx
const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  // Render content based on section type
  const renderContent = (section: BlogSection) => {
    switch (section.type) {
      case "h1":
        return <h1>{section.content}</h1>;
      case "h2":
        return <h2>{section.content}</h2>;
      case "ul":
        return (
          <ul>
            {Array.isArray(section.content) &&
              section.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
          </ul>
        );
      // ... other cases
    }
  };

  return (
    <article className="blog-detail">
      {/* Back button */}
      <Link to="/" className="back-btn">
        ← Back to Home
      </Link>

      {/* Blog content */}
      <div className="blog-detail-content">
        {post?.content.map((section, idx) => (
          <React.Fragment key={idx}>
            {renderContent(section)}
          </React.Fragment>
        ))}
      </div>

      {/* CTA Box */}
      <div className="blog-cta-box">
        <div className="blog-cta-content">
          <h3>Ready to simplify your reporting?</h3>
          <p>Join thousands using BlinkChart for instant chart creation.</p>
        </div>
        <a href="/joinwaitlist" className="blog-cta-btn">
          Join Waitlist
        </a>
      </div>

      {/* Navigation */}
      <div className="blog-navigation">
        {/* Previous/Next post links */}
      </div>
    </article>
  );
};
```

---

## 📝 Adding a New Blog Post - Complete Example

### Step 1: Create Your Content Structure

```tsx
// In src/data/blogData.ts, add to blogPosts array:

{
  id: 7,
  title: "How to Choose the Right Chart Type for Your Data",
  slug: "how-to-choose-the-right-chart-type",
  metaDescription: "A guide to selecting the best chart type for your specific data visualization needs",
  shortDescription: "Learn which chart type works best for your data and why.",
  publishDate: "March 20, 2026",
  readTime: 6,
  content: [
    {
      type: "h1",
      content: "How to Choose the Right Chart Type for Your Data"
    },
    {
      type: "p",
      content: "Choosing the right chart type can make or break your data visualization. In this guide, we'll walk through the different chart types and when to use each one."
    },
    {
      type: "h2",
      content: "Understanding Chart Types"
    },
    {
      type: "p",
      content: "Different data tells different stories, and each story needs the right format. Let's explore the main chart types:"
    },
    {
      type: "h3",
      content: "1. Bar Charts - For Comparisons"
    },
    {
      type: "p",
      content: "Bar charts are perfect when you want to compare values across different categories. They're easy to read and make comparisons obvious."
    },
    {
      type: "ul",
      content: [
        "Sales by region",
        "Customer count by department",
        "Website traffic by source",
        "Revenue by product line"
      ]
    },
    {
      type: "h3",
      content: "2. Line Charts - For Trends"
    },
    {
      type: "p",
      content: "Line charts show how values change over time. They're ideal for showing trends, patterns, and momentum."
    },
    {
      type: "ul",
      content: [
        "Stock price movements",
        "Monthly revenue growth",
        "User acquisition over time",
        "Website traffic trends"
      ]
    },
    {
      type: "h3",
      content: "3. Pie Charts - For Composition"
    },
    {
      type: "p",
      content: "Pie charts show how parts make up a whole. They're useful for showing market share, budget allocation, or composition."
    },
    {
      type: "ul",
      content: [
        "Market share distribution",
        "Budget allocation",
        "Customer segment breakdown",
        "Traffic source composition"
      ]
    },
    {
      type: "h2",
      content: "Key Decision Framework"
    },
    {
      type: "ol",
      content: [
        "Ask: What story am I trying to tell?",
        "Identify: Is this about comparison, composition, or trends?",
        "Choose: Select the chart type that best matches",
        "Test: Does it make the insight clear?",
        "Refine: Adjust colors, labels, and formatting"
      ]
    },
    {
      type: "p",
      content: "With the right chart type, your data story becomes clear, compelling, and actionable."
    }
  ]
}
```

### Step 2: Result

Your blog post automatically:
- ✅ Appears on homepage as a blog card
- ✅ Is accessible at `/blog/how-to-choose-the-right-chart-type`
- ✅ Shows in navigation between other posts
- ✅ Has dynamic page title: "How to Choose the Right Chart Type for Your Data | BlinkChart Blog"
- ✅ Includes the CTA box with "Join Waitlist"
- ✅ Tracks views in analytics

---

## 🎯 Common Tasks

### Task 1: Change Blog Grid Columns

**In blog.css:**
```css
/* Change from 3 to 4 columns on desktop */
.blog-grid {
  grid-template-columns: repeat(4, 1fr);  /* was: repeat(3, 1fr) */
  gap: 28px;
}

/* Mobile adjustment */
@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;  /* stays 1 on mobile */
  }
}
```

### Task 2: Modify Blog Card Styling

**In blog.css:**
```css
/* Make cards taller with more description space */
.blog-card {
  min-height: 450px;  /* add/increase this */
}

/* Change card border on hover */
.blog-card:hover {
  box-shadow: 0 12px 32px rgba(255, 102, 0, 0.15);  /* increase shadow */
  border-color: #FF6600;
  transform: translateY(-6px);  /* increase lift */
}
```

### Task 3: Change CTA Button Color

**In blog.css:**
```css
.blog-cta-btn {
  background: #E65C00;  /* change this */
  color: #ffffff;
}

.blog-cta-btn:hover {
  background: #CC5500;  /* change hover color too */
}
```

### Task 4: Add Author to Blog Posts

**Update BlogPost interface (src/data/blogData.ts):**
```tsx
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  metaDescription: string;
  shortDescription: string;
  publishDate: string;
  author?: string;  // ← Add this
  readTime: number;
  content: BlogSection[];
}
```

**Display author (src/pages/BlogDetail.tsx):**
```tsx
<div className="blog-detail-meta">
  <span className="blog-detail-date">{post.publishDate}</span>
  <span className="blog-detail-separator">•</span>
  {post.author && (
    <>
      <span className="blog-detail-author">By {post.author}</span>
      <span className="blog-detail-separator">•</span>
    </>
  )}
  <span className="blog-detail-read-time">{post.readTime} min read</span>
</div>
```

---

## 📡 Analytics Events

All analytics events use the `trackEvent` function:

```tsx
trackEvent({
  action: "view_blog",           // What happened
  category: "engagement",        // Category
  label: "from-spreadsheet-chaos-to-visual-clarity"  // Blog slug
});
```

### Events Tracked:

1. **Blog Section Click**
   ```tsx
   trackEvent({ 
     action: "click_blog_card", 
     category: "engagement", 
     label: "landing_page" 
   });
   ```

2. **Blog Post View**
   ```tsx
   trackEvent({ 
     action: "view_blog", 
     category: "engagement", 
     label: slug 
   });
   ```

3. **Waitlist CTA Click**
   ```tsx
   trackEvent({ 
     action: "click_waitlist_cta", 
     category: "engagement", 
     label: `blog_${slug}` 
   });
   ```

---

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] All blog posts have unique slugs
- [ ] No broken links in blog content
- [ ] CTA buttons point to correct URL (`/joinwaitlist`)
- [ ] Blog CSS is being bundled correctly
- [ ] Mobile layout tested on real devices
- [ ] Analytics tracking is enabled
- [ ] Meta descriptions are SEO-friendly
- [ ] Page titles are set correctly
- [ ] Previous/Next navigation works on all posts
- [ ] Sitemap includes blog URLs

---

## 🐛 Troubleshooting

### Issue: Blog cards not showing
**Solution:** Make sure `<BlogSection />` is imported and added to App.tsx home route

### Issue: Blog post page is blank
**Solution:** Check that slug in URL matches exactly one slug in blogPosts array (case-sensitive)

### Issue: Styles not applying
**Solution:** Verify `blog.css` is imported in both BlogCard.tsx and BlogDetail.tsx

### Issue: Navigation links not working
**Solution:** Ensure BlogDetail is lazy-loaded and added to App.tsx routes

### Issue: Analytics not tracking
**Solution:** Verify `trackEvent` is imported from correct path and Mixpanel is initialized

---

## 📚 Content Writing Tips

### Blog Post Structure

1. **Introduction (1-2 paragraphs)**
   - Hook the reader
   - State the problem
   - Hint at the solution

2. **Main Sections (3-5 sections)**
   - Use clear headings (h2, h3)
   - 2-3 paragraphs per section
   - Include bullet points for lists
   - Keep paragraphs short (3-4 sentences)

3. **Conclusion (1-2 paragraphs)**
   - Summarize key points
   - Call to action (Join Waitlist)
   - End on inspiring note

### SEO Tips

✅ Include target keyword in title
✅ Add keyword in first paragraph
✅ Use descriptive subheadings
✅ Keep descriptions under 160 characters
✅ Link to relevant pages where applicable
✅ Aim for 800-1200 word posts

### Writing Style

✅ Short sentences and paragraphs
✅ Active voice
✅ Clear and direct language
✅ Avoid jargon (or explain it)
✅ Use "you" to address reader
✅ Include specific examples

---

## ✨ That's It!

You now have a complete, production-ready blog system. Happy blogging! 🚀

For more details, see:
- `BLOG_FINAL_SUMMARY.md` - Complete project overview
- `BLOG_IMPLEMENTATION.md` - Technical documentation
- `BLOG_QUICK_START.md` - Quick reference
