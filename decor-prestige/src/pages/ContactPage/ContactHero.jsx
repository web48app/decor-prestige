import { useEffect, useRef } from 'react';
import Container from '../../components/ui/Container/Container';
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
      <div className={styles.heroInner}>
        {/* Lewa — tekst */}
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

        {/* Prawa — zdjęcie */}
        <div className={styles.heroImageWrap}>
          <img
            src="/hero_kontakt.png"
            alt="Eleganckie dekoracje okienne DECOR-PRESTIGE"
            className={styles.heroImage}
            loading="eager"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div className={styles.heroImageOverlay} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
