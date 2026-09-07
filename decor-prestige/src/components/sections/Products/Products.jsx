import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import { products } from '../../../data/products';
import styles from './Products.module.css';

/* ---- Meta dla produktów ---- */
const productMeta = {
  zaslony: { num: '01', desc: 'Oprawa okna, która nadaje wnętrzu charakter.' },
  tkaniny: { num: '02', desc: 'Starannie dobrane materiały i faktury.' },
  plisy:   { num: '03', desc: null },
  rolety:  { num: '04', desc: null },
  karnisze:{ num: '05', desc: null },
};

/* ---- Pojedyncze zdjęcie ---- */
function ProductPhoto({ product, className, captionFull = false }) {
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

  const meta = productMeta[product.id] || { num: '—', desc: null };

  return (
    <article className={`${styles.photoItem} ${styles.fadeIn} ${className || ''}`} ref={ref}>
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
        {captionFull && meta.desc && (
          <p className={styles.desc}>{meta.desc}</p>
        )}
      </div>
    </article>
  );
}

/* ============================================================
   PRODUCTS — editorial 2 + 3 layout
   ============================================================ */
export default function Products() {
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

  const primary   = products.filter(p => ['zaslony', 'tkaniny'].includes(p.id));
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

        {/* ---- Górny rząd — 2 duże zdjęcia ---- */}
        <div className={styles.primaryRow}>
          {primary.map(p => (
            <ProductPhoto
              key={p.id}
              product={p}
              captionFull={true}
            />
          ))}
        </div>

        {/* ---- Dolny rząd — 3 mniejsze zdjęcia ---- */}
        <div className={styles.secondaryRow}>
          {secondary.map(p => (
            <ProductPhoto
              key={p.id}
              product={p}
              captionFull={false}
            />
          ))}
        </div>

      </Container>
    </section>
  );
}
