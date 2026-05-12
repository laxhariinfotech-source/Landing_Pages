import { ArrowRight } from 'lucide-react';

const tools = [
  {
    title: 'AI Background Remover',
    body: 'Remove image backgrounds instantly with one click. Clean, crisp cutouts every time.',
    ctaText: 'Try it free',
    imageSide: 'left',
    visualBefore: { bg: '#94A3B8', label: 'Before' },
    visualAfter: { bg: '#6C3EE8', label: 'After' },
  },
  {
    title: 'AI Redesign & Image Generator',
    body: 'Generate unique images from a prompt, or instantly redesign your flyer in a new style.',
    ctaText: 'Explore AI tools',
    imageSide: 'right',
    visualBefore: { bg: '#F59E0B', label: 'Prompt' },
    visualAfter: { bg: '#EC4899', label: 'Generated' },
  },
];

export default function AIToolsSection() {
  return (
    <section className="section ai-tools" id="ai-tools">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Supercharge Your Creativity with AI</h2>
          <p className="section-subtitle">
            Let artificial intelligence handle the heavy lifting
          </p>
        </div>

        {tools.map((tool, i) => (
          <div
            key={i}
            className={`ai-tool-row ${tool.imageSide === 'right' ? 'reversed' : ''}`}
          >
            {/* Visual */}
            <div className="ai-tool-visual">
              <div className="ai-tool-visual-inner">
                <div
                  className="ai-tool-visual-half"
                  style={{ background: tool.visualBefore.bg }}
                >
                  {tool.visualBefore.label}
                </div>
                <div
                  className="ai-tool-visual-half"
                  style={{ background: tool.visualAfter.bg }}
                >
                  {tool.visualAfter.label}
                </div>
              </div>
              <span className="ai-tool-visual-label">AI-Powered</span>
            </div>

            {/* Content */}
            <div className="ai-tool-content">
              <h3>{tool.title}</h3>
              <p>{tool.body}</p>
              <a href="https://snapflyer-ai-demo.vercel.app/" target="_blank" rel="noopener noreferrer" className="ai-tool-cta">
                {tool.ctaText} <ArrowRight size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
