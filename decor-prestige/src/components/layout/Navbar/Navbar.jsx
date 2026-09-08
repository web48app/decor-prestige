import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { site } from '../../../data/site';
import Container from '../../ui/Container/Container';
import styles from './Navbar.module.css';

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [active,   setActive]     = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    if (href.startsWith('/')) {
      navigate(href);
    } else {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActive(href);
  };

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.transparent}`}
      role="banner"
    >
      <Container>
        <nav className={styles.inner} aria-label="Główna nawigacja">

          {/* LOGO */}
          <a
            href="#start"
            className={styles.logo}
            onClick={(e) => { e.preventDefault(); handleNav('#start'); }}
            aria-label="DECOR-PRESTIGE – strona główna"
          >
            <span className={styles.logoName}>DECOR-PRESTIGE</span>
            <span className={styles.logoSub}>DEKORACJE OKIEN</span>
          </a>

          {/* DESKTOP NAV */}
          <ul className={styles.links} role="list">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`${styles.link} ${active === item.href ? styles.linkActive : ''}`}
                  onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* DESKTOP CTA */}
          <a
            href="#kontakt"
            className={styles.cta}
            onClick={(e) => { e.preventDefault(); handleNav('#kontakt'); }}
          >
            Umów bezpłatny pomiar&nbsp;→
          </a>

          {/* MOBILE BURGER */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </nav>
      </Container>

      {/* MOBILE MENU */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-label="Menu nawigacji mobilnej"
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={styles.mobileLink}
                onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                tabIndex={menuOpen ? 0 : -1}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className={styles.mobileCTAWrap}>
            <a
              href="#kontakt"
              className={styles.mobileCTA}
              onClick={(e) => { e.preventDefault(); handleNav('#kontakt'); }}
              tabIndex={menuOpen ? 0 : -1}
            >
              Umów bezpłatny pomiar →
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
