import { useEffect, useRef } from 'react';
import { Lightbulb, Scissors, Wrench } from 'lucide-react';
import Container from '../../ui/Container/Container';
import { services } from '../../../data/services';
import styles from './Services.module.css';

const icons = {
  doradztwo: <Lightbulb size={22} strokeWidth={1.2} />,
  szycie:    <Scissors  size={22} strokeWidth={1.2} />,
  montaz:    <Wrench    size={22} strokeWidth={1.2} />,
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
