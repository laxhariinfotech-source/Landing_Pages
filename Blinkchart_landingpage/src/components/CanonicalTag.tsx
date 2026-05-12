import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://www.blinkchart.ai";

/**
 * Updates <link rel="canonical"> in <head> on every route change.
 * Strips trailing slashes so /about/ and /about resolve to the same canonical.
 */
const CanonicalTag = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const normalized =
      pathname !== "/" && pathname.endsWith("/")
        ? pathname.slice(0, -1)
        : pathname;

    let link = document.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${BASE_URL}${normalized}`);
  }, [pathname]);

  return null;
};

export default CanonicalTag;
