import { useState, useEffect } from 'react';
import { site } from '../../data/site';
import Container from '../../components/ui/Container/Container';
import styles from '../../components/layout/Navbar/Navbar.module.css';

const navItems = [
  { label: 'Oferta',       href: '/#oferta' },
  { label: 'Dlaczego my',  href: '/#o-firmie' },
  { label: 'Realizacje',   href: '/#realizacje' },
  { label: 'Kontakt',      href: '/kontakt', active: true },
];

export default function ContactNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 900) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : styles.scrolled}`}
      role="banner"
    >
      <Container>
        <nav className={styles.inner} aria-label="Główna nawigacja">

          {/* LOGO */}
          <a href="/" className={styles.logo} aria-label="DECOR-PRESTIGE – strona główna">
            <span className={styles.logoName}>DECOR-PRESTIGE</span>
            <span className={styles.logoSub}>DEKORACJE OKIEN</span>
          </a>

          {/* DESKTOP NAV */}
          <ul className={styles.links} role="list">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`${styles.link} ${item.active ? styles.linkActive : ''}`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* DESKTOP CTA */}
          <a href="tel:+4866069478" className={styles.cta}>
            Umów bezpłatny pomiar&nbsp;→
          </a>

          {/* MOBILE BURGER */}
          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`}
            aria-label={menuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            aria-expanded={menuOpen}
            aria-controls="contact-mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </nav>
      </Container>

      {/* MOBILE MENU */}
      <div
        id="contact-mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        role="dialog"
        aria-label="Menu nawigacji mobilnej"
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={styles.mobileLink}
                tabIndex={menuOpen ? 0 : -1}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className={styles.mobileCTAWrap}>
            <a
              href="tel:+4866069478"
              className={styles.mobileCTA}
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
