import { useEffect, useRef } from 'react';
import styles from './ContactPage.module.css';

export default function ContactHero() {
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
    <section className={styles.hero} aria-label="Hero kontakt">
      {/* Pełne zdjęcie jako tło */}
      <img
        src="/hero_kontakt.png"
        alt=""
        className={styles.heroBg}
        loading="eager"
        aria-hidden="true"
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />
      {/* Kremowy gradient — wygaszenie po lewej dla czytelności tekstu */}
      <div className={styles.heroBgOverlay} aria-hidden="true" />

      {/* Tekst na tle zdjęcia */}
      <div className={`${styles.heroText} ${styles.fadeIn}`} ref={ref}>
        <p className={styles.heroEyebrow}>Kontakt</p>
        <h1 className={styles.heroHeading}>
          Porozmawiajmy<br />
          <em className={styles.heroAccent}>o Twoim wnętrzu.</em>
        </h1>
        <p className={styles.heroLead}>
          Z przyjemnością doradzimy, pomożemy dobrać rozwiązania
          i umówimy się na bezpłatny pomiar u Ciebie.
        </p>
      </div>
    </section>
  );
}
