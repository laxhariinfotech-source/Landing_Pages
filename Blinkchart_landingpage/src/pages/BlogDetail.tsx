import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import blogPosts, { type BlogSection } from "../data/blogData";
import "../components/blog.css";
import { trackEvent } from "@/lib/analytics";

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = blogPosts.find((p) => p.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
    trackEvent({ 
      action: "view_blog", 
      category: "engagement", 
      label: slug || "unknown" 
    });
  }, [slug]);

  // Set page title
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | BlinkChart Blog`;
    }
  }, [post]);

  const renderContent = (section: BlogSection, index: number) => {
    const { type, content } = section;
    const keyBase = `${type}-${index}`;

    switch (type) {
      case "h1":
        return <h1 key={`${keyBase}`}>{content}</h1>;
      case "h2":
        return <h2 key={`${keyBase}`}>{content}</h2>;
      case "h3":
        return <h3 key={`${keyBase}`}>{content}</h3>;
      case "p":
        return <p key={`${keyBase}`}>{content}</p>;
      case "ul":
        return (
          <ul key={`${keyBase}`}>
            {Array.isArray(content) &&
              content.map((item: string, idx: number) => <li key={`${keyBase}-li-${idx}`}>{item}</li>)}
          </ul>
        );
      case "ol":
        return (
          <ol key={`${keyBase}`}>
            {Array.isArray(content) &&
              content.map((item: string, idx: number) => <li key={`${keyBase}-li-${idx}`}>{item}</li>)}
          </ol>
        );
      default:
        return null;
    }
  };

  if (!post) {
    return (
      <section className="blog-detail-not-found">
        <div className="blog-container">
          <div className="not-found-content">
            <h1>Blog Post Not Found</h1>
            <p>Sorry, the blog post you're looking for doesn't exist.</p>
            <Link to="/" className="back-btn">
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    );
  }

  // Get related posts (next and previous)
  const currentIndex = blogPosts.findIndex((p) => p.slug === slug);
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  return (
    <article className="blog-detail">
      <div className="blog-detail-container">
        {/* Back Button */}
        <Link to="/" className="back-btn">
          ← Back to Home
        </Link>

        {/* Meta Info */}
        <div className="blog-detail-meta">
          <span className="blog-detail-date">{post.publishDate}</span>
          <span className="blog-detail-separator">•</span>
          <span className="blog-detail-read-time">{post.readTime} min read</span>
        </div>

        {/* Content */}
        <div className="blog-detail-content">
          {post.content.map((section: BlogSection, idx: number) => (
            <React.Fragment key={idx}>
              {renderContent(section, idx)}
            </React.Fragment>
          ))}
        </div>

        {/* CTA Box */}
        <div className="blog-cta-box">
          <div className="blog-cta-content">
            <h3>Ready to simplify your reporting?</h3>
            <p>
              Join thousands of teams using BlinkChart to turn data into insights in seconds.
            </p>
          </div>
          <Link
            to="/joinwaitlist"
            className="blog-cta-btn"
            onClick={() => trackEvent({ 
              action: "click_waitlist_cta", 
              category: "engagement", 
              label: `blog_${slug}` 
            })}
          >
            Join Waitlist
          </Link>
        </div>

        {/* Navigation */}
        {(prevPost || nextPost) && (
          <div className="blog-navigation">
            <div className="blog-nav-prev">
              {prevPost && (
                <Link to={`/blog/${prevPost.slug}`}>
                  <span className="blog-nav-label">← Previous</span>
                  <span className="blog-nav-title">{prevPost.title}</span>
                </Link>
              )}
            </div>

            <div className="blog-nav-next">
              {nextPost && (
                <Link to={`/blog/${nextPost.slug}`}>
                  <span className="blog-nav-label">Next →</span>
                  <span className="blog-nav-title">{nextPost.title}</span>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export default BlogDetail;
