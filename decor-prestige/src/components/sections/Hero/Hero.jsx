import { useEffect, useRef } from 'react';
import Button from '../../ui/Button/Button';
import styles from './Hero.module.css';

const IconDiamond = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className={styles.icon}>
    <path d="M2.25 9l9.75 13 9.75-13M2.25 9h19.5M2.25 9L7.5 4h9l5.25 5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconRuler = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className={styles.icon}>
    <path d="M3.75 4.5l16.5 16.5M3.75 4.5L1.5 6.75l4.5 4.5 1.5-1.5M20.25 19.5l2.25-2.25-4.5-4.5-1.5 1.5M9 9l6 6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className={styles.icon}>
    <path d="M12 2.25c-5.25 3-7.5 6-7.5 10.5 0 5.25 7.5 9 7.5 9s7.5-3.75 7.5-9c0-4.5-2.25-7.5-7.5-10.5z" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12l2.25 2.25L15 9" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconHouse = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" className={styles.icon}>
    <path d="M3 12l9-9 9 9M5.25 10.5V21h4.5v-6h4.5v6h4.5V10.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const USP_ITEMS = [
  { icon: <IconDiamond />, title: 'Indywidualne',  sub: 'podejście' },
  { icon: <IconRuler />,   title: 'Pomiar',        sub: 'u klienta' },
  { icon: <IconShield />,  title: 'Sprawdzone',    sub: 'materiały' },
  { icon: <IconHouse />,   title: 'Montaż',        sub: 'i pełna obsługa' },
];

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add(styles.visible));
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="start" className={styles.hero} aria-labelledby="hero-heading">

      {/* BG image — full bleed */}
      <img
        src="/hero.png"
        alt=""
        aria-hidden="true"
        className={styles.bgImage}
      />

      {/* TEXT overlay — lewy obszar zdjęcia jest kremowy */}
      <div className={`${styles.content} ${styles.fadeIn}`} ref={heroRef}>
        <div className={styles.textCol}>
          <p className={styles.eyebrow}>STYL&nbsp;·&nbsp;KOMFORT&nbsp;·&nbsp;HARMONIA</p>

          <h1 id="hero-heading" className={styles.heading}>
            Piękne&nbsp;wnętrza<br />
            zaczynają&nbsp;się<br />
            <em className={styles.headingAccent}>od&nbsp;okien</em>
          </h1>

          <p className={styles.lead}>
            Tworzymy wyjątkowe dekoracje okien,<br className={styles.brDesktop} />
            które nadają wnętrzom charakter, podkreślają<br className={styles.brDesktop} />
            ich styl i tworzą niepowtarzalny klimat.
          </p>

          <div className={styles.buttons}>
            <Button
              as="a" href="#kontakt" variant="primary"
              onClick={(e) => { e.preventDefault(); scrollTo('kontakt'); }}
            >
              Umów bezpłatny pomiar&nbsp;→
            </Button>
            <Button
              as="a" href="#oferta" variant="secondary"
              onClick={(e) => { e.preventDefault(); scrollTo('oferta'); }}
            >
              Zobacz ofertę&nbsp;↓
            </Button>
          </div>
        </div>
      </div>

      {/* USP ROW */}
      <div className={styles.uspWrap}>
        <ul className={styles.uspList} role="list">
          {USP_ITEMS.map((item, i) => (
            <li key={i} className={styles.uspItem}>
              <div className={styles.uspIcon}>{item.icon}</div>
              <div className={styles.uspText}>
                <span className={styles.uspTitle}>{item.title}</span>
                <span className={styles.uspSub}>{item.sub}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
