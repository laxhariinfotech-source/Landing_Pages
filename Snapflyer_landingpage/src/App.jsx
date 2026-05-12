import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import About from './components/pages/About';
import Team from './components/pages/Team';
import FlyerEditor from './components/pages/FlyerEditor';
import FAQ from './components/pages/FAQ';
import TermsConditions from './components/pages/TermsConditions';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import CookiePolicy from './components/pages/CookiePolicy';
import Disclaimer from './components/pages/Disclaimer';

export default function App() {
  const { pathname, hash } = useLocation();

  // Scroll to top or specific element on route change
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  // Hide navbar/footer on editor page
  const isEditor = pathname.startsWith('/editor');

  return (
    <>
      {!isEditor && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/team" element={<Team />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/editor/:templateId" element={<FlyerEditor />} />
        </Routes>
      </main>
      {!isEditor && <Footer />}
    </>
  );
}
