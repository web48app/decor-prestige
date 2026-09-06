import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import { services } from '../../../data/services';
import styles from './Services.module.css';

/* ---- Inline SVG icons ---- */
const icons = {
  doradztwo: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
         stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* ruler / measuring tape — doradztwo */}
      <path d="M2 6h20v12H2z" />
      <path d="M6 6v4M10 6v3M14 6v4M18 6v3" />
    </svg>
  ),
  szycie: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
         stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* sewing machine silhouette */}
      <path d="M3 17h18v2H3z" />
      <path d="M5 17V8a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v9" />
      <circle cx="8" cy="12" r="1.5" />
      <path d="M8 13.5V17" />
      <path d="M12 5v4M14 7h3" />
    </svg>
  ),
  montaz: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
         stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {/* window frame */}
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M3 12h18M12 3v18" />
    </svg>
  ),
};

function ServiceCard({ service, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      className={`${styles.card} ${styles.fadeIn}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className={styles.cardImageWrap}>
        <img
          src={service.image}
          alt={service.imageAlt}
          className={styles.cardImage}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className={styles.cardImageFallback} aria-hidden="true" />
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardIcon} aria-hidden="true">
          {icons[service.id]}
        </div>
        <h3 className={styles.cardTitle}>{service.title}</h3>
        <p className={styles.cardDesc}>{service.description}</p>
      </div>
    </article>
  );
}

export default function Services() {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="oferta" className={styles.section} aria-labelledby="services-heading">
      <Container>

        {/* ---- Section header ---- */}
        <div className={`${styles.header} ${styles.fadeIn}`} ref={headingRef}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>Nasze Usługi</p>
            <h2 id="services-heading" className={styles.heading}>
              Kompleksowa obsługa<br />
              <em className={styles.headingAccent}>od pomiaru po montaż</em>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <p className={styles.lead}>
              Zadbamy o każdy etap – doradzimy, uszyjemy i zamontujemy,
              abyś mogła cieszyć się pięknymi oknami bez żadnych zmartwień.
            </p>
          </div>
        </div>

        {/* ---- Cards ---- */}
        <div className={styles.cards}>
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>

      </Container>
    </section>
  );
}
