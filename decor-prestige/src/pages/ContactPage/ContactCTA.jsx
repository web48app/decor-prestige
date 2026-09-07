import { useEffect, useRef } from 'react';
import { CheckCircle } from 'lucide-react';
import { site } from '../../data/site';
import styles from './ContactPage.module.css';

const points = [
  'Profesjonalne doradztwo',
  'Indywidualne podejście',
  'Realne wzory i próbki tkanin na miejscu',
];

export default function ContactCTA() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.ctaSection} aria-label="Pomoc i doradztwo">
      {/* Tło-zdjęcie */}
      <div className={styles.ctaBg} aria-hidden="true">
        <img
          src="/hero.png"
          alt=""
          className={styles.ctaBgImage}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className={styles.ctaBgOverlay} />
      </div>

      {/* Treść */}
      <div className={`${styles.ctaContent} ${styles.fadeIn}`} ref={ref}>
        <p className={styles.eyebrowLight}>Masz pytania?</p>
        <h2 className={styles.ctaHeading}>Chętnie pomożemy.</h2>
        <p className={styles.ctaLead}>
          Nie wiesz, jakie rozwiązanie będzie najlepsze?
          Napisz, zadzwoń lub odwiedź naszą pracownię.
        </p>

        <ul className={styles.ctaPoints}>
          {points.map((p) => (
            <li key={p} className={styles.ctaPoint}>
              <CheckCircle size={16} strokeWidth={1.5} className={styles.ctaPointIcon} />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <div className={styles.ctaActions}>
          <a href={site.contact.phoneHref} className={styles.ctaBtn}>
            Zadzwoń: {site.contact.phone}
          </a>
          <a href={site.contact.emailHref} className={styles.ctaBtnSecondary}>
            Napisz do nas
          </a>
        </div>
      </div>
    </section>
  );
}
