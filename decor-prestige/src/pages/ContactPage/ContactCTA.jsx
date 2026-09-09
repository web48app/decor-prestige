import { useEffect, useRef } from 'react';
import { Gem, Heart, Home } from 'lucide-react';
import styles from './ContactPage.module.css';

const features = [
  { Icon: Gem,  label: 'Profesjonalne doradztwo' },
  { Icon: Heart, label: 'Indywidualne podejście' },
  { Icon: Home,  label: 'Realne wzory i próbki tkanin na miejscu' },
];

export default function ContactCTA() {
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
    <section className={styles.ctaSection} aria-label="Pomoc i doradztwo">

      {/* Lewa: zdjęcie z gradientem fade w krem */}
      <div className={styles.ctaImageWrap} aria-hidden="true">
        <img
          src="/footer_kontakt.png"
          alt=""
          className={styles.ctaBgImage}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* Prawa: tekst | linia | ikony */}
      <div className={`${styles.ctaRight} ${styles.fadeIn}`} ref={ref}>

        {/* Blok tekstowy */}
        <div className={styles.ctaTextBlock}>
          <p className={styles.eyebrow}>Masz pytania?</p>
          <h2 className={styles.ctaHeading}>Chętnie pomożemy.</h2>
          <p className={styles.ctaLead}>
            Nie wiesz, jakie rozwiązanie będzie najlepsze?<br />
            Napisz, zadzwoń lub odwiedź naszą pracownię.
          </p>
        </div>

        {/* Pionowa linia */}
        <div className={styles.ctaDivider} aria-hidden="true" />

        {/* Ikony */}
        <ul className={styles.ctaFeatures}>
          {features.map(({ Icon, label }) => (
            <li key={label} className={styles.ctaFeatureItem}>
              <span className={styles.ctaFeatureIcon}>
                <Icon size={22} strokeWidth={1.3} />
              </span>
              <span>{label}</span>
            </li>
          ))}
        </ul>

      </div>

    </section>
  );
}
