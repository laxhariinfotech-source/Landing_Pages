import {
  LayoutGrid,
  Image,
  Palette,
  Layers,
  Share2,
  Download,
} from 'lucide-react';
import { features } from '../../data/features';

const iconMap = {
  LayoutGrid,
  Image,
  Palette,
  Layers,
  Share2,
  Download,
};

export default function FeaturesGrid() {
  return (
    <section className="section" id="features">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Everything You Need to Design Like a Pro
          </h2>
          <p className="section-subtitle">
            Powerful tools that are surprisingly easy to use
          </p>
        </div>

        <div className="features-grid-layout">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div className="feature-card" key={feature.id}>
                <div className="feature-icon">
                  {Icon && <Icon />}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
