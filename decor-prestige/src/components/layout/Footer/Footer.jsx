import { MapPin, Phone, Mail } from 'lucide-react';
import { site } from '../../../data/site';
import styles from './Footer.module.css';

/* ---- Social icons ---- */
function IconFacebook() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function IconPinterest() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.16 1.22-5.16s-.31-.62-.31-1.55c0-1.45.84-2.54 1.89-2.54.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.86 3.49-.25 1.04.51 1.89 1.53 1.89 1.84 0 3.07-2.35 3.07-5.13 0-2.12-1.43-3.7-4-3.7-2.91 0-4.72 2.18-4.72 4.59 0 .83.24 1.42.62 1.87.17.21.2.29.13.53-.06.22-.19.75-.24.96-.08.3-.32.41-.59.3-1.64-.69-2.44-2.55-2.44-4.64 0-3.44 2.89-7.55 8.62-7.55 4.6 0 7.63 3.33 7.63 6.92 0 4.73-2.62 8.24-6.47 8.24-1.3 0-2.52-.7-2.94-1.49l-.82 3.16c-.29 1.11-1.08 2.5-1.62 3.35.88.27 1.83.42 2.81.42 5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
    </svg>
  );
}

const footerNav = [
  { label: 'Strona główna', href: '#' },
  { label: 'Oferta',        href: '#oferta' },
  { label: 'Dlaczego my?',  href: '#dlaczego-my' },
  { label: 'Realizacje',    href: '#realizacje' },
  { label: 'Kontakt',       href: '#kontakt' },
];

const footerProducts = [
  { label: 'Zasłony',   href: '#oferta' },
  { label: 'Tkaniny',   href: '#oferta' },
  { label: 'Plisy',     href: '#oferta' },
  { label: 'Rolety',    href: '#oferta' },
  { label: 'Karnisze',  href: '#oferta' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">

      {/* ---- Górna część — 4 kolumny + dekoracja ---- */}
      <div className={styles.main}>

        {/* Kolumny */}
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
              <a href="#" className={styles.socialLink} aria-label="Pinterest" target="_blank" rel="noopener noreferrer">
                <IconPinterest />
              </a>
            </div>
          </div>

          {/* 2 — Nawigacja */}
          <div className={styles.col}>
            <p className={styles.colHeading}>Nawigacja</p>
            <ul className={styles.linkList}>
              {footerNav.map(item => (
                <li key={item.href + item.label}>
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
          <div className={`${styles.col} ${styles.colLast}`}>
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
                <MapPin size={15} strokeWidth={1.5} aria-hidden="true" />
                <span>
                  {site.contact.address.street}<br />
                  {site.contact.address.city}
                </span>
              </a>
              <div className={styles.contactItem}>
                <Phone size={15} strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <a href={site.contact.phoneHref} className={styles.contactLink}>
                    {site.contact.phone}
                  </a>
                  <span className={styles.contactSub}>Pon. – Pt. 8:00 – 17:00</span>
                </div>
              </div>
              <a href={site.contact.emailHref} className={styles.contactItem}>
                <Mail size={15} strokeWidth={1.5} aria-hidden="true" />
                <span>{site.contact.email}</span>
              </a>
            </address>
          </div>

        </div>

      </div>

      {/* ---- Dolny pasek ---- */}
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
