import { Routes, Route } from 'react-router-dom';
import './styles/globals.css';

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

/* ---- UI globalne ---- */
import ScrollToTop from './components/ui/ScrollToTop/ScrollToTop';

function HomePage() {
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
      <Routes>
        <Route path="/"        element={<HomePage />} />
        <Route path="/kontakt" element={<ContactPage />} />
      </Routes>
      <ScrollToTop />
    </>
  );
}
