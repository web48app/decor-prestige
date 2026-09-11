import { MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { site } from '../../../data/site';
import styles from './Footer.module.css';

/* ---- Social icons (lucide nie eksportuje tych ikon) ---- */
function IconFacebook() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

/* ---- Dane nawigacji ---- */
const footerNav = [
  { label: 'Strona główna', href: '/#home' },
  { label: 'Oferta',        href: '/#oferta' },
  { label: 'Dlaczego my?',  href: '/#dlaczego-my' },
  { label: 'Realizacje',    href: '/#realizacje' },
  { label: 'Kontakt',       href: '/kontakt' },
];

const footerProducts = [
  { label: 'Zasłony',  href: '/#oferta' },
  { label: 'Tkaniny',  href: '/#oferta' },
  { label: 'Plisy',    href: '/#oferta' },
  { label: 'Rolety',   href: '/#oferta' },
  { label: 'Karnisze', href: '/#oferta' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">

      {/* ---- Górna część — 4 kolumny (lewa ~63% footera) ---- */}
      <div className={styles.main}>
        <div className={styles.cols}>

          {/* 1 — Logo + opis + social */}
          <div className={styles.col}>
            <div className={styles.logo}>
              <span className={styles.logoName}>{site.name}</span>
              <span className={styles.logoTag}>Dekoracje okien</span>
            </div>
            <p className={styles.desc}>
              Tworzymy dekoracje okien, które nadają wnętrzom charakter,
              podkreślają ich styl i tworzą niepowtarzalny klimat.
            </p>
            <div className={styles.social}>
              <a href="#" className={styles.socialLink} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <IconFacebook />
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <IconInstagram />
              </a>
            </div>
          </div>

          {/* 2 — Nawigacja */}
          <div className={styles.col}>
            <p className={styles.colHeading}>Nawigacja</p>
            <ul className={styles.linkList}>
              {footerNav.map(item => (
                <li key={item.label}>
                  <a href={item.href} className={styles.link}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3 — Nasze produkty */}
          <div className={styles.col}>
            <p className={styles.colHeading}>Nasze produkty</p>
            <ul className={styles.linkList}>
              {footerProducts.map(item => (
                <li key={item.label}>
                  <a href={item.href} className={styles.link}>{item.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4 — Kontakt */}
          <div className={styles.col}>
            <p className={styles.colHeading}>Kontakt</p>
            <address className={styles.contact}>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(
                  site.contact.address.street + ', ' + site.contact.address.city
                )}`}
                className={styles.contactItem}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={14} strokeWidth={1.5} />
                <span>
                  {site.contact.address.street}<br />
                  {site.contact.address.city}
                </span>
              </a>

              <div className={styles.contactItem}>
                <Phone size={14} strokeWidth={1.5} />
                <div>
                  <a href={site.contact.phoneHref} className={styles.contactLink}>
                    {site.contact.phone}
                  </a>
                  <span className={styles.contactSub}>Pon. – Pt. 8:00 – 17:00</span>
                </div>
              </div>

              <a href={site.contact.emailHref} className={styles.contactItem}>
                <Mail size={14} strokeWidth={1.5} />
                <span>{site.contact.email}</span>
              </a>

            </address>
          </div>

        </div>
      </div>

      {/* ---- Dolny pasek — bez czarnego tła ---- */}
      <div className={styles.bar}>
        <div className={styles.barInner}>
          <span>© {year} {site.name}. Wszelkie prawa zastrzeżone.</span>
          <div className={styles.barRight}>
            <a href="#" className={styles.barLink}>Polityka prywatności</a>
            <span className={styles.barSep} aria-hidden="true">|</span>
            <span>Projekt i realizacja: <span className={styles.barBrand}>WEB48</span></span>
          </div>
        </div>
      </div>

    </footer>
  );
}
