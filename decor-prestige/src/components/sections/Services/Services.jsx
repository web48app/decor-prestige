import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import { services } from '../../../data/services';
import styles from './Services.module.css';

/* ---- Inline SVG icons — styl jak Hero (strokeWidth 1.2, eleganckie) ---- */
const IconDoradztwo = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
       stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    {/* chat bubble z gwiazdką / doradztwo */}
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M12 8v4M12 12l2-2" />
  </svg>
);

const IconSzycie = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
       stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    {/* igła z nicią */}
    <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
    <path d="M16 8L2 22" />
    <path d="M17.5 15H9" />
  </svg>
);

const IconMontaz = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
       stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
       aria-hidden="true">
    {/* okno z ramą */}
    <rect x="3" y="3" width="18" height="18" rx="1.5" />
    <path d="M3 12h18M12 3v18" />
    <path d="M3 3l2 2M21 3l-2 2M3 21l2-2M21 21l-2-2" />
  </svg>
);

const icons = {
  doradztwo: <IconDoradztwo />,
  szycie:    <IconSzycie />,
  montaz:    <IconMontaz />,
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
