import { memo } from "react";
import "./Footer.css";
import CookieSettingsLink from "./CookieSettingsLink";
import { NavLink, useLocation } from "react-router-dom";
import { prefetchKeyRoutes } from "../utils/routePrefetch";

const getFooterLinkClass = (isActive: boolean) =>
  isActive ? "footer-link footer-link-active" : "footer-link";

const Footer = () => {
  const { pathname } = useLocation();

  const isBlogActive = pathname === "/blog" || pathname.startsWith("/blog/");

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT BRAND */}
        <div className="footer-brand-section">
          <div className="footer-logo">BlinkChart</div>

          <p className="footer-tagline">
            Transform spreadsheets into powerful visual insights instantly.
            Built for modern teams, analysts, and data-driven organizations.
          </p>
        </div>

        {/* PRODUCT */}
        <div className="footer-column">
          <h3>Product</h3>
          <ul>
            <li>
              <NavLink
                to="/how-it-works"
                onMouseEnter={prefetchKeyRoutes}
                onFocus={prefetchKeyRoutes}
                className={({ isActive }) => getFooterLinkClass(isActive)}
              >
                How It Works
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feature"
                onMouseEnter={prefetchKeyRoutes}
                onFocus={prefetchKeyRoutes}
                className={({ isActive }) => getFooterLinkClass(isActive)}
              >
                Features
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/blog"
                onMouseEnter={prefetchKeyRoutes}
                onFocus={prefetchKeyRoutes}
                className={() => getFooterLinkClass(isBlogActive)}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink to="/faq" className={({ isActive }) => getFooterLinkClass(isActive)}>
                FAQ
              </NavLink>
            </li>
          </ul>
        </div>

        {/* COMPANY */}
        <div className="footer-column">
          <h3>Company</h3>
          <ul>
            <li><NavLink to="/about" className={({ isActive }) => getFooterLinkClass(isActive)}>About</NavLink></li>
            <li><NavLink to="/contact" className={({ isActive }) => getFooterLinkClass(isActive)}>Contact</NavLink></li>
            <li><NavLink to="/terms" className={({ isActive }) => getFooterLinkClass(isActive)}>Terms & Conditions</NavLink></li>
            <li><NavLink to="/cookies" className={({ isActive }) => getFooterLinkClass(isActive)}>Cookies Policy</NavLink></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="footer-column">
           <h3>Developers</h3>
         <NavLink to="/team" className={({ isActive }) => getFooterLinkClass(isActive)}>Our Team</NavLink>
          
        </div>

      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">

        <div className="footer-bottom-left">
          © 2026 BlinkChart by LH IdeaCraft Inc.
          <div className="patent">Patent Pending</div>
          <div className="footer-cookie-settings">
            <CookieSettingsLink />
          </div>
        </div>

    

      </div>
    </footer>
  );
};

export default memo(Footer);
