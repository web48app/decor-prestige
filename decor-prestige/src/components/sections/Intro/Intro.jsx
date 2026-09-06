import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import styles from './Intro.module.css';

/* Subtelny ornament: linia — romb — linia */
const Ornament = () => (
  <div className={styles.ornament} aria-hidden="true">
    <span className={styles.ornamentLine} />
    <svg className={styles.ornamentDiamond} viewBox="0 0 10 10" width="8" height="8">
      <rect x="1" y="1" width="8" height="8" transform="rotate(45 5 5)"
            fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
    <span className={styles.ornamentLine} />
  </div>
);

export default function Intro() {
  const innerRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="intro" className={styles.intro} aria-labelledby="intro-heading">
      <Container>
        <div className={`${styles.inner} ${styles.fadeIn}`} ref={innerRef}>

          <Ornament />

          <p className={styles.eyebrow}>DECOR‑PRESTIGE&nbsp;•&nbsp;TARNÓW</p>

          <h2 id="intro-heading" className={styles.heading}>
            Oprawa okna,<br />
            która <em className={styles.headingAccent}>zmienia</em> charakter&nbsp;wnętrza.
          </h2>

          <p className={styles.lead}>
            Odpowiednio dobrane dekoracje okienne to nie tylko estetyka.
            To także komfort, funkcjonalność i wyjątkowy klimat każdego pomieszczenia.
          </p>

        </div>
      </Container>
    </section>
  );
}
