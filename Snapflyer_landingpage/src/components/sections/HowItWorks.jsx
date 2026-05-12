import { Search, PenLine, Share2 } from 'lucide-react';

const steps = [
  {
    number: 1,
    icon: Search,
    title: 'Choose a Template',
    description: 'Browse 1.3M+ designs by category, style, or color.',
  },
  {
    number: 2,
    icon: PenLine,
    title: 'Customize Your Design',
    description: 'Edit text, images, colors, and fonts with drag-and-drop.',
  },
  {
    number: 3,
    icon: Share2,
    title: 'Download & Share',
    description: 'Export in HD or share directly to social media.',
  },
];

export default function HowItWorks() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Create a Flyer in 3 Easy Steps</h2>
          <p className="section-subtitle">No design experience required</p>
        </div>

        <div className="steps-container">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div className="step-card" key={step.number}>
                <div className="step-icon">
                  <Icon />
                  <span className="step-number">{step.number}</span>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
