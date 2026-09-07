import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import { services } from '../../../data/services';
import styles from './Services.module.css';

const serviceMeta = {
  doradztwo: { num: '01' },
  szycie:    { num: '02' },
  montaz:    { num: '03' },
};

function ServiceItem({ service, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.disconnect(); } },
      { threshold: 0.08 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const meta = serviceMeta[service.id] || { num: '0' + (index + 1) };

  return (
    <article
      className={`${styles.item} ${styles.fadeIn}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.13}s` }}
    >
      <div className={styles.imageWrap}>
        <img
          src={service.image}
          alt={service.imageAlt}
          className={styles.image}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className={styles.imageFallback} aria-hidden="true" />
      </div>

      <div className={styles.caption}>
        <span className={styles.num}>{meta.num}</span>
        <h3 className={styles.title}>{service.title}</h3>
        <p className={styles.desc}>{service.description}</p>
      </div>
    </article>
  );
}

export default function Services() {
  const headerRef = useRef(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="oferta" className={styles.section} aria-labelledby="services-heading">
      <Container>

        {/* ---- Nagłówek ---- */}
        <div className={`${styles.header} ${styles.fadeIn}`} ref={headerRef}>
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

        {/* ---- Editorial grid — 3 kolumny ---- */}
        <div className={styles.grid}>
          {services.map((s, i) => (
            <ServiceItem key={s.id} service={s} index={i} />
          ))}
        </div>

      </Container>
    </section>
  );
}
