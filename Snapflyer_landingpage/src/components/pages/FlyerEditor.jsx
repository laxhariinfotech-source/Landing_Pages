import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { templates } from '../../data/templates';
import html2canvas from 'html2canvas';
import qrcode from 'qrcode-generator';

/* ───── Background theme presets ───── */
const bgThemes = [
  { id: 'none', label: 'Original', gradient: null },
  { id: 'sunset', label: 'Sunset', gradient: 'linear-gradient(135deg, #FF6B6B, #FFE66D)' },
  { id: 'ocean', label: 'Ocean', gradient: 'linear-gradient(135deg, #667EEA, #764BA2)' },
  { id: 'forest', label: 'Forest', gradient: 'linear-gradient(135deg, #11998E, #38EF7D)' },
  { id: 'midnight', label: 'Midnight', gradient: 'linear-gradient(135deg, #0F0C29, #302B63, #24243E)' },
  { id: 'coral', label: 'Coral', gradient: 'linear-gradient(135deg, #F093FB, #F5576C)' },
  { id: 'aurora', label: 'Aurora', gradient: 'linear-gradient(135deg, #4FACFE, #00F2FE)' },
  { id: 'ember', label: 'Ember', gradient: 'linear-gradient(135deg, #F97316, #FACC15)' },
];

/* ───── QR code SVG generator ───── */
function generateQRSvg(url) {
  if (!url) return null;
  try {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    return qr.createSvgTag({ scalable: true, cellSize: 4, margin: 2 });
  } catch {
    return null;
  }
}

export default function FlyerEditor() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef(null);

  /* Find the template */
  const template = templates.find((t) => String(t.id) === templateId);

  /* Editor state */
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [selectedTheme, setSelectedTheme] = useState('none');
  const [qrUrl, setQrUrl] = useState('');
  const [qrSvg, setQrSvg] = useState(null);
  const [showImage, setShowImage] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [sidebarTab, setSidebarTab] = useState('text');

  /* Initialise from template */
  useEffect(() => {
    if (template) {
      setTitle(template.title || '');
      setSubtitle(template.category || '');
      setBodyText('Add your description here...');
      if (template.gradientFrom) {
        setBgColor(template.gradientFrom);
      }
    }
  }, [template]);

  /* Regenerate QR on URL change (debounced) */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (qrUrl.trim()) {
        setQrSvg(generateQRSvg(qrUrl.trim()));
      } else {
        setQrSvg(null);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [qrUrl]);

  /* Background style for canvas */
  const getCanvasBg = useCallback(() => {
    if (selectedTheme !== 'none') {
      const theme = bgThemes.find((t) => t.id === selectedTheme);
      if (theme?.gradient) return { background: theme.gradient };
    }
    if (showImage && template?.imageUrl) {
      return {
        backgroundImage: `url(${template.imageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
    }
    return { backgroundColor: bgColor };
  }, [selectedTheme, showImage, template, bgColor]);

  /* Download as PNG */
  const handleDownload = async () => {
    if (!canvasRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(canvasRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `${title || 'flyer'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Download failed:', err);
      alert('Download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (!template) {
    return (
      <div className="editor-not-found">
        <div className="container" style={{ textAlign: 'center', padding: '160px 24px' }}>
          <h2>Template not found</h2>
          <p style={{ color: 'var(--text-secondary)', margin: '16px 0 32px' }}>
            The template you're looking for doesn't exist.
          </p>
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-page">
      {/* ─── Top Bar ─── */}
      <div className="editor-topbar">
        <div className="editor-topbar-left">
          <button className="editor-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5" /><polyline points="12 19 5 12 12 5" /></svg>
          </button>
          <span className="editor-template-name">{template.title}</span>
          <span className="editor-badge">Editor</span>
        </div>
        <div className="editor-topbar-right">
          <button
            className="btn btn-primary editor-download-btn"
            onClick={handleDownload}
            disabled={downloading}
          >
            {downloading ? (
              <>
                <svg className="editor-spinner" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                Exporting…
              </>
            ) : (
              <>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
                Download PNG
              </>
            )}
          </button>
        </div>
      </div>

      <div className="editor-layout">
        {/* ─── Sidebar ─── */}
        <aside className="editor-sidebar">
          {/* Sidebar Tabs */}
          <div className="editor-sidebar-tabs">
            {[
              { key: 'text', icon: '✏️', label: 'Text' },
              { key: 'style', icon: '🎨', label: 'Style' },
              { key: 'qr', icon: '🔗', label: 'QR Code' },
            ].map((tab) => (
              <button
                key={tab.key}
                className={`editor-sidebar-tab ${sidebarTab === tab.key ? 'active' : ''}`}
                onClick={() => setSidebarTab(tab.key)}
              >
                <span className="editor-sidebar-tab-icon">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="editor-sidebar-content">
            {/* ── TEXT TAB ── */}
            {sidebarTab === 'text' && (
              <div className="editor-panel">
                <div className="editor-field">
                  <label className="editor-label">Title</label>
                  <input
                    type="text"
                    className="editor-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Flyer title..."
                  />
                </div>
                <div className="editor-field">
                  <label className="editor-label">Subtitle</label>
                  <input
                    type="text"
                    className="editor-input"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Subtitle..."
                  />
                </div>
                <div className="editor-field">
                  <label className="editor-label">Body Text</label>
                  <textarea
                    className="editor-textarea"
                    value={bodyText}
                    onChange={(e) => setBodyText(e.target.value)}
                    placeholder="Description..."
                    rows={4}
                  />
                </div>
              </div>
            )}

            {/* ── STYLE TAB ── */}
            {sidebarTab === 'style' && (
              <div className="editor-panel">
                {/* Show/hide original image */}
                {template.imageUrl && (
                  <div className="editor-field">
                    <label className="editor-label">Template Image</label>
                    <label className="editor-toggle">
                      <input
                        type="checkbox"
                        checked={showImage}
                        onChange={(e) => {
                          setShowImage(e.target.checked);
                          if (e.target.checked) setSelectedTheme('none');
                        }}
                      />
                      <span className="editor-toggle-slider"></span>
                      <span className="editor-toggle-text">
                        {showImage ? 'Showing original' : 'Hidden'}
                      </span>
                    </label>
                  </div>
                )}

                {/* Background color */}
                <div className="editor-field">
                  <label className="editor-label">Background Color</label>
                  <div className="editor-color-row">
                    <input
                      type="color"
                      className="editor-color-picker"
                      value={bgColor}
                      onChange={(e) => {
                        setBgColor(e.target.value);
                        setSelectedTheme('none');
                        setShowImage(false);
                      }}
                    />
                    <span className="editor-color-value">{bgColor}</span>
                  </div>
                </div>

                {/* Theme presets */}
                <div className="editor-field">
                  <label className="editor-label">Background Themes</label>
                  <div className="editor-themes-grid">
                    {bgThemes.map((theme) => (
                      <button
                        key={theme.id}
                        className={`editor-theme-btn ${selectedTheme === theme.id ? 'active' : ''}`}
                        title={theme.label}
                        onClick={() => {
                          setSelectedTheme(theme.id);
                          if (theme.id !== 'none') setShowImage(false);
                          else if (template.imageUrl) setShowImage(true);
                        }}
                        style={{
                          background: theme.gradient || (theme.id === 'none' ? '#f1f1f1' : '#fff'),
                        }}
                      >
                        {theme.id === 'none' && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── QR CODE TAB ── */}
            {sidebarTab === 'qr' && (
              <div className="editor-panel">
                <div className="editor-field">
                  <label className="editor-label">QR Code URL</label>
                  <input
                    type="url"
                    className="editor-input"
                    value={qrUrl}
                    onChange={(e) => setQrUrl(e.target.value)}
                    placeholder="https://example.com"
                  />
                  <span className="editor-hint">Enter a URL to generate a QR code on your flyer</span>
                </div>
                {qrSvg && (
                  <div className="editor-qr-preview">
                    <label className="editor-label">Preview</label>
                    <div
                      className="editor-qr-preview-box"
                      dangerouslySetInnerHTML={{ __html: qrSvg }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* ─── Canvas Area ─── */}
        <div className="editor-canvas-wrapper">
          <div className="editor-canvas" ref={canvasRef} style={getCanvasBg()}>
            {/* Dark overlay for readability */}
            <div className="editor-canvas-overlay" />

            {/* Text content */}
            <div className="editor-canvas-content">
              {title && <h1 className="editor-canvas-title">{title}</h1>}
              {subtitle && <p className="editor-canvas-subtitle">{subtitle}</p>}
              {bodyText && <p className="editor-canvas-body">{bodyText}</p>}
            </div>

            {/* QR Code */}
            {qrSvg && (
              <div className="editor-canvas-qr" dangerouslySetInnerHTML={{ __html: qrSvg }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
