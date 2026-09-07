import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import { products } from '../../../data/products';
import styles from './Products.module.css';

/* ---- Opisy głównych produktów ---- */
const featuredMeta = {
  zaslony: { num: '01', desc: 'Oprawa okna, która nadaje wnętrzu charakter.' },
  tkaniny: { num: '02', desc: 'Starannie dobrane materiały i faktury.' },
};

/* ---- Duże zdjęcie edytorialne ---- */
function FeaturedCard({ product, offset }) {
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

  const meta = featuredMeta[product.id] || { num: '0?', desc: '' };

  return (
    <article
      className={`${styles.featuredCard} ${styles.fadeIn} ${offset ? styles.cardOffset : ''}`}
      ref={ref}
    >
      <div className={styles.imageWrap}>
        <img
          src={product.image}
          alt={product.alt}
          className={styles.image}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className={styles.imageFallback} aria-hidden="true" />
      </div>
      <div className={styles.caption}>
        <span className={styles.num}>{meta.num}</span>
        <h3 className={styles.name}>{product.title}</h3>
        <p className={styles.desc}>{meta.desc}</p>
      </div>
    </article>
  );
}

/* ============================================================
   PRODUCTS — editorial layout
   ============================================================ */
export default function Products() {
  const headerRef    = useRef(null);
  const secondaryRef = useRef(null);

  useEffect(() => {
    const els = [headerRef.current, secondaryRef.current].filter(Boolean);
    const observers = els.map(el => {
      const io = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.disconnect(); } },
        { threshold: 0.15 }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach(io => io.disconnect());
  }, []);

  const featured  = products.filter(p => ['zaslony', 'tkaniny'].includes(p.id));
  const secondary = products.filter(p => ['plisy', 'rolety', 'karnisze'].includes(p.id));

  return (
    <section id="produkty" className={styles.section} aria-labelledby="products-heading">
      <Container>

        {/* ---- Nagłówek ---- */}
        <div className={`${styles.header} ${styles.fadeIn}`} ref={headerRef}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>Nasze Produkty</p>
            <h2 id="products-heading" className={styles.heading}>
              Stylowe rozwiązania<br />
              <em className={styles.headingAccent}>dla Twojego wnętrza</em>
            </h2>
          </div>
          <div className={styles.headerRight}>
            <a href="#kontakt" className={styles.viewAll}>
              Zobacz pełną ofertę →
            </a>
          </div>
        </div>

        {/* ---- Dwa główne zdjęcia — editorial ---- */}
        <div className={styles.mainGrid}>
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} product={p} offset={i === 1} />
          ))}
        </div>

        {/* ---- Pozostałe produkty — minimalistyczny rząd ---- */}
        <div className={`${styles.secondary} ${styles.fadeIn}`} ref={secondaryRef}>
          {secondary.map((p, i) => (
            <span key={p.id} className={styles.secondaryGroup}>
              <a href="#kontakt" className={styles.secondaryItem}>{p.title}</a>
              {i < secondary.length - 1 && (
                <span className={styles.secondaryDot} aria-hidden="true">·</span>
              )}
            </span>
          ))}
        </div>

      </Container>
    </section>
  );
}
