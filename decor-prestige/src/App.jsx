import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import './styles/globals.css';

function RouteScrollTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // nie scrolluj do góry jeśli URL ma hash — HomePage sam obsłuży scroll do sekcji
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return null;
}

/* ---- Landing page ---- */
import Navbar   from './components/layout/Navbar/Navbar';
import Footer   from './components/layout/Footer/Footer';
import Hero     from './components/sections/Hero/Hero';
import Intro    from './components/sections/Intro/Intro';
import Services from './components/sections/Services/Services';
import Products from './components/sections/Products/Products';
import Process  from './components/sections/Process/Process';
import About    from './components/sections/About/About';
import Quality  from './components/sections/Quality/Quality';
import Gallery  from './components/sections/Gallery/Gallery';
import Reviews  from './components/sections/Reviews/Reviews';
import CTA      from './components/sections/CTA/CTA';
import Contact  from './components/sections/Contact/Contact';

/* ---- Strona kontaktu ---- */
import ContactPage from './pages/ContactPage/ContactPage';

/* ---- Strona produktów ---- */
import ProductsPage from './pages/ProductsPage/ProductsPage';

/* ---- Strona realizacji ---- */
import RealizacjePage from './pages/RealizacjePage/RealizacjePage';

/* ---- UI globalne ---- */
import ScrollToTop from './components/ui/ScrollToTop/ScrollToTop';

function HomePage() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      // małe opóźnienie żeby React zdążył wyrenderować sekcje
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
    }
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Intro />
        <Services />
        <Products />
        <Process />
        <About />
        <Gallery />
        <Reviews />
        <Quality />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <>
      <RouteScrollTop />
      <Routes>
        <Route path="/"           element={<HomePage />} />
        <Route path="/kontakt"    element={<ContactPage />} />
        <Route path="/produkty"   element={<ProductsPage />} />
        <Route path="/realizacje" element={<RealizacjePage />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}
