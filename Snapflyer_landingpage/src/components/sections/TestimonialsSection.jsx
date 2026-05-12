import { Star, Users, Globe } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

function TestimonialCard({ quote, name, role, stars, avatarColor }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="testimonial-card">
      <div className="testimonial-stars">
        {Array.from({ length: stars }).map((_, i) => (
          <Star key={i} size={18} />
        ))}
      </div>
      <p className="testimonial-quote">"{quote}"</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar" style={{ background: avatarColor }}>
          {initials}
        </div>
        <div>
          <div className="testimonial-name">{name}</div>
          <div className="testimonial-role">{role}</div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="section testimonials" id="testimonials">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Loved by Creators</h2>
        </div>

        <div className="testimonials-stats">
          <span><Star size={18} style={{ fill: '#F59E0B', color: '#F59E0B' }} /> 4.8/5 average</span>
        </div>

        <div className="testimonials-grid">
          {testimonials.slice(0, 3).map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
