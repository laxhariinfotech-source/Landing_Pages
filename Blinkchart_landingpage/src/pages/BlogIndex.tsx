import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogPosts from '../data/blogData';
import '../components/blog.css';
import { updatePageMetadata, pageMetadata } from '../utils/seoMetadata';

const BlogIndex = () => {
  useEffect(() => {
    updatePageMetadata(pageMetadata.blog);
  }, []);

  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h1 className="blog-title">
            Latest From <span>BlinkChart</span>
          </h1>
          <p className="blog-subtitle">
            Insights on data visualization, reporting, and building better dashboards.
          </p>
        </div>

        <div className="blog-grid">
          {blogPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="blog-card"
              style={{ textDecoration: 'none' }}
            >
              <div className="blog-card-content">
                <h2 className="blog-card-title">{post.title}</h2>
                <p className="blog-card-description">{post.shortDescription}</p>
              </div>

              <div className="blog-card-meta">
                <span className="blog-card-date">{post.publishDate}</span>
                <span className="blog-card-read-time">{post.readTime} min read</span>
              </div>

              <div className="blog-card-footer">
                <span className="blog-card-link">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogIndex;