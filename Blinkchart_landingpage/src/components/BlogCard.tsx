import React from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "../data/blogData.ts";
import { trackEvent } from "@/lib/analytics";
import "./blog.css";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <Link
      to={`/blog/${post.slug}`}
      style={{ textDecoration: "none" }}
      onClick={() =>
        trackEvent({
          action: "click_blog_read_more",
          category: "engagement",
          label: post.title
        })
      }
    >
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
          <span className="blog-card-link">
            Read More →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default React.memo(BlogCard);
