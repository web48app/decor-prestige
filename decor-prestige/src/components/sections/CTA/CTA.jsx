import { useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';
import { site } from '../../../data/site';
import Container from '../../ui/Container/Container';
import styles from './CTA.module.css';

/* Ornament identyczny jak w Intro */
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

export default function CTA() {
  const innerRef = useRef(null);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="kontakt" className={styles.section} aria-labelledby="cta-heading">
      <Container>
        <div className={`${styles.inner} ${styles.fadeIn}`} ref={innerRef}>

          <Ornament />

          <p className={styles.eyebrow}>Stwórzmy razem</p>

          <h2 id="cta-heading" className={styles.heading}>
            wyjątkową oprawę<br />Twoich okien.
          </h2>

          <p className={styles.lead}>
            Umów się na bezpłatny pomiar i indywidualną wycenę.
          </p>

          {/* Akcje */}
          <div className={styles.actions}>
            <a href={site.contact.phoneHref} className={styles.ctaBtn}>
              Umów bezpłatny pomiar →
            </a>

            <div className={styles.phoneBlock}>
              <span className={styles.phoneDot} aria-hidden="true">
                <Phone size={18} strokeWidth={1.4} />
              </span>
              <div className={styles.phoneInfo}>
                <a href={site.contact.phoneHref} className={styles.phoneNum}>
                  {site.contact.phone}
                </a>
                <span className={styles.phoneSub}>Porozmawiajmy o Twoim wnętrzu</span>
              </div>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
