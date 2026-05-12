import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";


import Navbar from "./components/Navbar";
import LandingPage from "./components/landing/LandingPage";
import ScrollToTop from "./components/ScrollToTop";
import CanonicalTag from "./components/CanonicalTag";
const Footer = lazy(() => import("./components/Footer"));

const Joinwaitlist = lazy(() => import("./pages/JoinWaitlist"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const AboutUs = lazy(() => import("./pages/About-page/AboutUs"));
const Contact = lazy(() => import("./pages/Contact-page/Contact"));
const UseCases = lazy(() => import("./pages/UseCase-page/UseCasesSection"));
const Privacy = lazy(() => import("./pages/privacy-page/Privacy"));
const Feature = lazy(() => import("./pages/Feature-page/Feature"));
const Pricing = lazy(() => import("./pages/pricing-page/Pricing"));
const FAQSection = lazy(() => import("./components/FAQSection"));
const Team = lazy(() => import("./pages/Team"));
const Cookies = lazy(() => import("./pages/Cookies"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

// SEO Pages
const Features = lazy(() => import("./pages/Features"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Extension = lazy(() => import("./pages/Extension"));

const App: React.FC = () => {
  

  return (
    <Router>
      <ScrollToTop />
      <CanonicalTag />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <main>
                <LandingPage />
              </main>
              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </>
          }
        />

        <Route
         path="/joinwaitlist"
          element={
            <>
              <Navbar />
              <Suspense fallback={null}>
                <Joinwaitlist />
                <Footer />
              </Suspense>
            </>
          }
        />


        <Route
          path="/about"
          element={
            <>
              <Navbar/>
              <Suspense fallback={null}>
                <AboutUs/>
                <Footer/>
              </Suspense>
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <Navbar/>
              <Suspense fallback={null}>
                <Contact/>
                <Footer/>
              </Suspense>
            </>
          }
        />


         <Route
          path="/privacy"
          element={
            <>
              <Navbar/>
              <Suspense fallback={null}>
                <Privacy/>
                <Footer/>
              </Suspense>
            </>
          }
        />

        <Route
          path="/pricing"
          element={
            <>
              <Navbar/>
              <Suspense fallback={null}>
                <Pricing />
                <Footer/>
              </Suspense>
            </>
          }
        />

        <Route
          path="/feature"
          element={
            <>
              <Navbar/>
              <Suspense fallback={null}>
                <Feature />
                <Footer/>
              </Suspense>
            </>
          }
        />

        <Route
  path="/usecases"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <UseCases />
        <Footer />
      </Suspense>
    </>
  }
/>

<Route
  path="/team"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Team/>
        <Footer />
      </Suspense>
    </>
  }
/>


        <Route
          path="/faq"
          element={
            <>
              <Navbar />
              <Suspense fallback={null}>
                <FAQSection />
                <Footer />
              </Suspense>
            </>
          }
        />

<Route
  path="/how-it-works"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <HowItWorks />
        <Footer />
      </Suspense>
    </>
  }
/>

<Route
  path="/cookies"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Cookies />
        <Footer />
      </Suspense>
    </>
  }
/>

<Route
  path="/disclaimer"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Disclaimer />
        <Footer />
      </Suspense>
    </>
  }
/>

{/* SEO Pages */}
<Route
  path="/features"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Features />
        <Footer />
      </Suspense>
    </>
  }
/>

<Route
  path="/blog"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <BlogIndex />
        <Footer />
      </Suspense>
    </>
  }
/>

<Route
  path="/privacy-policy"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <PrivacyPolicy />
        <Footer />
      </Suspense>
    </>
  }
/>

<Route
  path="/terms"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Terms />
        <Footer />
      </Suspense>
    </>
  }
/>

<Route
  path="/waitlist"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Joinwaitlist />
        <Footer />
      </Suspense>
    </>
  }
/>

<Route
  path="/blog/:slug"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <BlogDetail />
        <Footer />
      </Suspense>
    </>
  }
/>

<Route
  path="*"
  element={
    <Suspense fallback={null}>
      <NotFound />
    </Suspense>
  }
/>

<Route
  path="/gallery"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Gallery />
        <Footer />
      </Suspense>
    </>
  }
/>

<Route
  path="/extension"
  element={
    <>
      <Navbar />
      <Suspense fallback={null}>
        <Extension />
        <Footer />
      </Suspense>
    </>
  }
/>

      </Routes>
    </Router>

    
  );
};



export default App;

