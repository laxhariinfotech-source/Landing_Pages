import React, { useState, useRef } from "react";
import logo from "../assets/bink 1.png";
import logoWebP from "../assets/bink-1.webp";
import { Link, useLocation } from "react-router-dom";
import { prefetchKeyRoutes } from "../utils/routePrefetch";

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = () => setOpen(false);

  // Close on route change
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Scroll lock when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on ESC key
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Close on click outside the nav
  React.useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  React.useEffect(() => {
    let timeoutId: number | undefined;
    let idleId: number | undefined;

    const schedulePrefetch = () => {
      prefetchKeyRoutes();
    };

    if ("requestIdleCallback" in globalThis) {
      idleId = (globalThis as typeof globalThis & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(schedulePrefetch);
    } else {
      timeoutId = globalThis.setTimeout(schedulePrefetch, 1200);
    }

    return () => {
      if (timeoutId) {
        globalThis.clearTimeout(timeoutId);
      }

      if (idleId && "cancelIdleCallback" in globalThis) {
        (globalThis as typeof globalThis & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <header ref={navRef}>
    <nav>
      <div className="nav-container">

        {/* LOGO */}
        <div className="logo" style={{ display: "flex", alignItems: "center" }}>
          <picture>
            <source srcSet={logoWebP} type="image/webp" />
            <img
              src={logo}
              alt="BlinkChart logo"
              width={30}
              height={30}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ display: "block", filter: "brightness(0) invert(1)" }}
            />
          </picture>
          <Link
            to="/"
            onClick={closeMenu}
            style={{
              color: "#fff",
              fontWeight: 700,
              marginLeft: 6,
              textDecoration: "none",
            }}
          >
            BlinkChart
          </Link>
        </div>

        {/* HAMBURGER */}
        <button
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="nav-links"
        >
          {open ? "✕" : "☰"}
        </button>

        {/* LINKS */}
        <ul id="nav-links" className={`nav-links ${open ? "open" : ""}`}>
          <li><Link to="/" className="nav-link" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/how-it-works" className="nav-link" onClick={closeMenu} onMouseEnter={prefetchKeyRoutes} onFocus={prefetchKeyRoutes}>How It Works</Link></li>
            <li><Link to="/feature" onClick={closeMenu} onMouseEnter={prefetchKeyRoutes} onFocus={prefetchKeyRoutes}>Features</Link></li>
            <li><Link to="/pricing" onClick={closeMenu} onMouseEnter={prefetchKeyRoutes} onFocus={prefetchKeyRoutes}>Pricing</Link></li>
            <li><Link to="/usecases" onClick={closeMenu}>Use Cases</Link></li>
            <li><Link to="/blog" className="nav-link" onClick={closeMenu} onMouseEnter={prefetchKeyRoutes} onFocus={prefetchKeyRoutes}>Blog</Link></li>
            <li>
  <Link
    to="/gallery"
    className="nav-link"
    onClick={closeMenu}
    onMouseEnter={prefetchKeyRoutes}
    onFocus={prefetchKeyRoutes}
  >
    Gallery
  </Link>
</li>

<li>
  <Link
    to="/extension"
    className="nav-link"
    onClick={closeMenu}
    onMouseEnter={prefetchKeyRoutes}
    onFocus={prefetchKeyRoutes}
  >
    Extension
  </Link>
</li>

        </ul>
        <li className="nav-cta-item">
  <a
    href="https://blinkchartfreestage.vercel.app/#/login"
    className="nav-cta-btn"
    target="_blank"
    rel="noopener noreferrer"
  >
    Try for Free
  </a>
  <a
    href="https://blinkchartfreestage.vercel.app/#/login"
    className="nav-cta-btn"
    target="_blank"
    rel="noopener noreferrer"
  >
    Login
  </a>
</li>
      </div>
    </nav>
    </header>
  );
};

export default React.memo(Navbar);
