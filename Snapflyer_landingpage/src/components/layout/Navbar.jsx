import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Templates', href: '/#templates' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/#pricing' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" aria-label="SnapFlyer Home">
          <img src="/logo-transparent.png" alt="SnapFlyer Logo" style={{ height: '40px', width: '40px' }} />SnapFlyer
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="navbar-actions">
          <a href="https://snapflyer-ai-demo.vercel.app/" className="btn btn-ghost">Log In</a>
          <a href="#" className="btn btn-primary">Get Started Free</a>
          <button
            className="navbar-hamburger"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
        <div className="mobile-menu-actions">
          <a href="https://snapflyer-ai-demo.vercel.app/" className="btn btn-ghost">Log In</a>
          <a href="#" className="btn btn-primary">Get Started Free</a>
        </div>
      </div>
    </nav>
  );
}
