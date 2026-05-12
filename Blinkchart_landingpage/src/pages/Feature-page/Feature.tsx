
import { useState } from "react";
import "./Feature.css"

type FeatureItem = {
  title: string;
  icon: string;
  color: string;
  desc?: string;
  modalContent?: {
    description: string;
    points: string[];
  };
};

const features: FeatureItem[] = [
  {
    title: "Excel to Chart Instantly",       
    icon: "📊",
    color: "orange",
    modalContent: {
      description: "Our Excel to chart converter transforms your spreadsheets into professional visualizations instantly. Simply upload your Excel file, and BlinkChart automatically detects your data structure and suggests the best chart types. No technical skills required – convert spreadsheets to charts in seconds.",
      points: [
        "Support for .xlsx, .xls, and .csv files",
        "Automatic data type detection",
        "Real-time data preview before visualization",
        "Smart chart type recommendations based on your data",
        "Convert multiple sheets to charts simultaneously"
      ]
    }
  },
  {
    title: "AI Chart Recommendations",
    icon: "🤖",
    color: "orange",
    modalContent: {
      description: "Our AI-powered chart recommendations analyze your data and suggest the best visualization types automatically. The system learns from your data patterns and recommends optimal chart types, colors, and styling that will make your data most impactful and easy to understand.",
      points: [
        "Intelligent chart type suggestions",
        "Auto-optimize axes and scaling",
        "Smart color palette recommendations",
        "Learn from data patterns",
        "Professional design defaults"
      ]
    }
  },
  {
    title: "Live Data Preview and Edit",
    icon: "⚡",
    color: "orange",
    modalContent: {
      description: "See your data transform into charts in real-time. Edit your data directly in the preview and watch changes instantly. Our live preview system ensures you always know exactly what your final chart will look like before exporting.",
      points: [
        "Real-time chart updates",
        "Edit data inline",
        "Instant visualization refresh",
        "See changes as you make them",
        "No save-and-reload cycle"
      ]
    }
  },
  {
    title: "Multiple Chart Types",
    icon: "📈",
    color: "orange",
    modalContent: {
      description: "Choose from 15+ different chart types to best represent your data. From classic bar and line charts to advanced scatter plots, heat maps, and treemaps. Each chart type is optimized for specific data patterns and use cases.",
      points: [
        "Bar and column charts",
        "Line and area charts",
        "Pie and donut charts",
        "Scatter and bubble charts",
        "Heat maps and advanced visualizations"
      ]
    }
  },
  {
    title: "Export & Share",
    icon: "📤",
    color: "orange",
    modalContent: {
      description: "Export your charts in multiple formats and share with colleagues instantly. Download as PNG, SVG, PDF, or PowerPoint slides. Generate shareable links or embed charts directly in your website or documents.",
      points: [
        "Export to PNG, SVG, PDF",
        "PowerPoint integration",
        "Shareable links",
        "Embed code generation",
        "High-resolution output"
      ]
    }
  },
  {
    title: "No-Code Experience",
    icon: "✨",
    color: "orange",
    modalContent: {
      description: "Create professional charts without writing code. BlinkChart's intuitive interface makes it easy for anyone to create stunning visualizations. No technical skills required – if you can upload a file and click buttons, you can create charts.",
      points: [
        "Intuitive drag-and-drop interface",
        "Point-and-click customization",
        "No programming knowledge needed",
        "Familiar spreadsheet-like experience",
        "Step-by-step guidance"
      ]
    }
  },
];

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  return (
    <>
      <section className="features-section">
        <h2 className="features-title">Powerful Features</h2>
        <p className="features-subtitle">
          Everything you need to turn raw data into meaningful visuals.
        </p>

        <div className="features-grid">
          {features.map((item, index) => (
            <div 
              key={index} 
              className={`feature-card ${item.color}`}
              onClick={() => setSelectedFeature(index)}
            >
              <div className="icon">{item.icon}</div>
              <h3>{item.title}</h3>
              {item.desc && <p>{item.desc}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedFeature !== null && features[selectedFeature].modalContent && (
        <div className="modal-overlay" onClick={() => setSelectedFeature(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close" 
              onClick={() => setSelectedFeature(null)}
            >
              ✕
            </button>
            <h2>{features[selectedFeature].title}</h2>
            <p className="modal-description">
              {features[selectedFeature].modalContent!.description}
            </p>
            <ul className="modal-points">
              {features[selectedFeature].modalContent!.points.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
