import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { templates, categories } from '../../data/templates';

function TemplateCard({ id, title, category, gradientFrom, gradientTo, imageUrl }) {
  const navigate = useNavigate();

  return (
    <div className="template-card">
      <div
        className="template-card-gradient"
        style={
          imageUrl
            ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
            : { background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})` }
        }
      >
        {!imageUrl && (
          <>
            <div className="template-card-title">{title}</div>
            <div className="template-card-category">{category}</div>
          </>
        )}
      </div>
      <div className="template-card-overlay">
        <div className="template-card-label">
          <span className="template-card-title-label">{title}</span>
          <span className="template-card-category-label">{category}</span>
        </div>
        <button
          className="btn btn-white"
          aria-label={`Edit ${title} template`}
          onClick={() => navigate(`/editor/${id}`)}
        >
          Use This Template
        </button>
      </div>
    </div>
  );
}

export default function TemplateGallery() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? templates.slice(0, 8)
      : templates.filter((t) => t.category === activeCategory).slice(0, 8);

  return (
    <section className="section template-gallery" id="templates">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Explore Flyer Templates</h2>
          <p className="section-subtitle">
            Find the perfect starting point for any project
          </p>
        </div>

        <div className="template-tabs">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`template-tab ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="template-grid">
          {filtered.map((t) => (
            <TemplateCard key={t.id} {...t} />
          ))}
        </div>

        <div className="template-gallery-footer">
          <a href="#" className="btn btn-outline" id="view-all-templates">
            View All Templates →
          </a>
        </div>
      </div>
    </section>
  );
}
