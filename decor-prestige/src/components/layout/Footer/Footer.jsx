import { MapPin, Phone, Mail } from 'lucide-react';
import { site } from '../../../data/site';
import Container from '../../ui/Container/Container';
import styles from './Footer.module.css';

const footerNav = [
  { label: 'Oferta',       href: '#oferta' },
  { label: 'Dlaczego my',  href: '#dlaczego-my' },
  { label: 'Realizacje',   href: '#realizacje' },
  { label: 'Kontakt',      href: '#kontakt' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">

      {/* Górna część — logo + nawigacja + kontakt + dekoracja */}
      <div className={styles.main}>
        <Container className={styles.mainInner}>

          {/* LEWA — Logo, nawigacja, kontakt */}
          <div className={styles.left}>

            {/* Logo */}
            <div className={styles.logo}>
              <span className={styles.logoName}>{site.name}</span>
              <span className={styles.logoTag}>Dekoracje okien</span>
            </div>

            {/* Nawigacja */}
            <nav className={styles.nav} aria-label="Nawigacja stopki">
              <ul className={styles.navList}>
                {footerNav.map(item => (
                  <li key={item.href}>
                    <a href={item.href} className={styles.navLink}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Dane kontaktowe */}
            <address className={styles.contact}>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  site.contact.address.street + ', ' + site.contact.address.city
                )}`}
                className={styles.contactItem}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={15} strokeWidth={1.5} aria-hidden="true" />
                <span>{site.contact.address.street}, {site.contact.address.city}</span>
              </a>
              <a href={site.contact.phoneHref} className={styles.contactItem}>
                <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
                <span>{site.contact.phone}</span>
              </a>
              <a href={site.contact.emailHref} className={styles.contactItem}>
                <Mail size={15} strokeWidth={1.5} aria-hidden="true" />
                <span>{site.contact.email}</span>
              </a>
            </address>

          </div>

          {/* PRAWA — dekoracja zdjęciowa (tekst jest w grafice) */}
          <div className={styles.right} aria-hidden="true">
            <img
              src="/footer-bg.png"
              alt=""
              className={styles.deco}
            />
          </div>

        </Container>
      </div>

      {/* Dolny pasek — copyright */}
      <div className={styles.bar}>
        <Container className={styles.barInner}>
          <span>© {year} {site.name}</span>
          <span className={styles.barSep} aria-hidden="true">|</span>
          <span>Projekt i realizacja: <span className={styles.barBrand}>WEB48</span></span>
        </Container>
      </div>

    </footer>
  );
}
