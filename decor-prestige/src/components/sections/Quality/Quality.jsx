import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import { uspItems } from '../../../data/whyUs';
import styles from './Quality.module.css';

function UspItem({ item, index }) {
  const Icon = item.icon;
  return (
    <li
      className={styles.uspItem}
      style={{ '--usp-delay': `${0.3 + index * 0.15}s` }}
    >
      <span className={styles.uspIcon} aria-hidden="true">
        <Icon size={22} strokeWidth={1.2} />
      </span>
      <span className={styles.uspText}>{item.text}</span>
    </li>
  );
}

export default function Quality() {
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const refs = [leftRef, rightRef];
    const observers = refs.map((ref) => {
      const el = ref.current;
      if (!el) return null;
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.disconnect(); } },
        { threshold: 0.15 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io?.disconnect());
  }, []);

  return (
    <section id="dlaczego-my" className={styles.section} aria-labelledby="quality-heading">

      <div className={styles.overlay} aria-hidden="true" />

      <Container className={styles.container}>

        {/* LEWA — tekst */}
        <div className={`${styles.left} ${styles.fadeIn}`} ref={leftRef}>
          <p className={styles.eyebrow}>Dlaczego my?</p>
          <h2 id="quality-heading" className={styles.heading}>
            Jakość, która<br />robi różnicę
          </h2>
          <p className={styles.lead}>
            Pracujemy na starannie dobranych, wysokiej jakości materiałach
            renomowanych producentów. Dzięki temu nasze dekoracje są nie tylko
            piękne, ale również trwałe i funkcjonalne.
          </p>
          <a href="#produkty" className={styles.ctaBtn}>
            Poznaj naszą ofertę →
          </a>
        </div>

        {/* PRAWA — USP + dekoracja */}
        <div className={`${styles.right} ${styles.fadeIn}`} ref={rightRef}>
          <p className={styles.handwritten} aria-hidden="true">
            Detale<br />tworzą<br />wyjątkowe<br />wnętrza
          </p>
          <ol className={styles.uspList}>
            {uspItems.map((item, i) => (
              <UspItem key={item.id} item={item} index={i} />
            ))}
          </ol>
        </div>

      </Container>
    </section>
  );
}
