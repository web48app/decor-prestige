import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import { uspItems } from '../../../data/whyUs';
import styles from './Quality.module.css';

function UspItem({ item, index }) {
  const Icon = item.icon;
  return (
    <li
      className={styles.uspItem}
      style={{ '--usp-delay': `${0.25 + index * 0.2}s` }}
    >
      <span className={styles.uspDot} aria-hidden="true">
        <Icon size={26} strokeWidth={1.2} />
      </span>
      <span className={styles.uspText}>{item.text}</span>
    </li>
  );
}

export default function Quality() {
  const leftRef = useRef(null);
  const uspRef  = useRef(null);   /* wrapper na linię + listę */

  /* Lewa — fade-in */
  useEffect(() => {
    const el = leftRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /* Linia + USP — jeden observer na wrapperze */
  useEffect(() => {
    const el = uspRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.animate); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
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

        {/* PRAWA — animowana linia + USP */}
        <div className={styles.right}>
          <div className={styles.uspWrap} ref={uspRef}>
            {/* Pionowa linia rysuje się od góry do dołu */}
            <div className={styles.line} aria-hidden="true" />

            <ol className={styles.uspList}>
              {uspItems.map((item, i) => (
                <UspItem key={item.id} item={item} index={i} />
              ))}
            </ol>
          </div>
        </div>

      </Container>
    </section>
  );
}
