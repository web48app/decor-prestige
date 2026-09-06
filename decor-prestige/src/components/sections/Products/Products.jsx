import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import { products } from '../../../data/products';
import styles from './Products.module.css';

function ProductItem({ product, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      className={`${styles.item} ${styles.fadeIn}`}
      ref={ref}
      style={{ transitionDelay: `${index * 0.08}s` }}
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
        <div className={styles.overlay} aria-hidden="true" />
      </div>
      <p className={styles.name}>{product.title}</p>
    </article>
  );
}

export default function Products() {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add(styles.visible);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="produkty" className={styles.section} aria-labelledby="products-heading">

      {/* Header wewnątrz Container */}
      <Container>
        <div className={`${styles.header} ${styles.fadeIn}`} ref={headingRef}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>Nasze Produkty</p>
            <h2 id="products-heading" className={styles.heading}>
              Stylowe rozwiązania<br />dla Twojego wnętrza
            </h2>
          </div>
          <div className={styles.headerRight}>
            <a href="#kontakt" className={styles.viewAll}>
              Zobacz pełną ofertę →
            </a>
          </div>
        </div>
      </Container>

      {/* Grid full-width — poza Container */}
      <div className={styles.grid}>
        {products.map((p, i) => (
          <ProductItem key={p.id} product={p} index={i} />
        ))}
      </div>

    </section>
  );
}
