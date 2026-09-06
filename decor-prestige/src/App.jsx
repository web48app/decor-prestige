import './styles/globals.css';

import Navbar  from './components/layout/Navbar/Navbar';
import Footer  from './components/layout/Footer/Footer';

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

export default function App() {
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
        <Quality />
        <Gallery />
        <Reviews />
        <CTA />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
