import { useState, useEffect } from 'react';
import { site } from '../../../data/site';
import Container from '../../ui/Container/Container';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      role="banner"
    >
      <Container>
        <nav className={styles.inner} aria-label="Główna nawigacja">
          {/* Logo / Brand */}
          <a
            href="#start"
            className={styles.brand}
            onClick={(e) => { e.preventDefault(); handleNav('#start'); }}
            aria-label="DECOR-PRESTIGE — strona główna"
          >
            <span className={styles.brandName}>{site.name}</span>
            <span className={styles.brandTagline}>{site.tagline}</span>
          </a>

          {/* Desktop nav */}
          <ul className={styles.links} role="list">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.link}
                  onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a href={site.contact.phoneHref} className={styles.cta}>
            {site.contact.phone}
          </a>

          {/* Mobile burger */}
          <button
            className={styles.burger}
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu} role="dialog" aria-label="Menu nawigacji">
          <ul role="list">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={styles.mobileLink}
                  onClick={(e) => { e.preventDefault(); handleNav(item.href); }}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a href={site.contact.phoneHref} className={styles.mobileCta}>
                {site.contact.phone}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
