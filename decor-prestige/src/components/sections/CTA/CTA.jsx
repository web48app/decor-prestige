import { useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';
import { site } from '../../../data/site';
import Container from '../../ui/Container/Container';
import styles from './CTA.module.css';

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

          {/* Tekst */}
          <div className={styles.text}>
            <p className={styles.eyebrow}>Stwórzmy razem</p>
            <h2 id="cta-heading" className={styles.heading}>
              wyjątkową oprawę<br />Twoich okien.
            </h2>
            <p className={styles.lead}>
              Umów się na bezpłatny pomiar i indywidualną wycenę.
            </p>
          </div>

          {/* Akcje */}
          <div className={styles.actions}>
            <a href={site.contact.phoneHref} className={styles.ctaBtn}>
              Umów bezpłatny pomiar →
            </a>

            <div className={styles.phoneBlock}>
              <span className={styles.phoneDot} aria-hidden="true">
                <Phone size={20} strokeWidth={1.4} />
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
