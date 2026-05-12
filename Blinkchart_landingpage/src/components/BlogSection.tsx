import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import blogPosts from "../data/blogData.ts";
import "./blog.css";
import { trackEvent } from "@/lib/analytics";

const BlogSection: React.FC = () => {
  useEffect(() => {
    trackEvent({
      action: "page_view_blog",
      category: "page_view",
      label: "blog_listing"
    });
  }, []);

  return (
    <section className="blog-section">
      <div className="blog-container">
        {/* Header */}
        <div className="blog-header">
          <h2 className="blog-title">
            Latest From <span>BlinkChart</span>
          </h2>
          <p className="blog-subtitle">
            Insights on data visualization, reporting, and building better dashboards.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="blog-grid">
          {blogPosts.slice(0, 6).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* CTA */}
        <div className="blog-cta">
          <p>Want more insights delivered to your inbox?</p>
          <Link
            to="/joinwaitlist"
            className="blog-view-all-btn"
            onClick={() =>
              trackEvent({
                action: "click_waitlist_cta",
                category: "conversion",
                label: "blog_page"
              })
            }
          >
            Join Waitlist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
