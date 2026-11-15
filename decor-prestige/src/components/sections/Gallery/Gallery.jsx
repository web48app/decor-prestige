import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import { realizacje } from '../../../data/products';
import styles from './Gallery.module.css';

/* Zdjęcia z montaży pokazywane na stronie głównej (id z data/products.js) */
const FEATURED = ['r01', 'r02', 'r26', 'r09', 'r22', 'r04'];

export default function Gallery() {
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

  const items = FEATURED
    .map((id) => realizacje.find((r) => r.id === id))
    .filter(Boolean);

  return (
    <section id="realizacje" className={styles.section} aria-labelledby="gallery-heading">
      <Container>
        <div className={`${styles.fadeIn}`} ref={ref}>

          <div className={styles.header}>
            <p className={styles.eyebrow}>Nasze realizacje</p>
            <h2 id="gallery-heading" className={styles.heading}>
              Zdjęcia z naszych<br />
              <em className={styles.headingAccent}>montaży</em>
            </h2>
          </div>

          <div className={styles.grid}>
            {items.map((item) => (
              <a key={item.id} href="/realizacje" className={styles.item}>
                <img
                  src={item.image}
                  alt={item.alt}
                  className={styles.image}
                  loading="lazy"
                />
                <span className={styles.caption}>{item.title}</span>
              </a>
            ))}
          </div>

          <div className={styles.viewAllWrap}>
            <a href="/realizacje" className={styles.viewAllBtn}>
              Zobacz wszystkie realizacje →
            </a>
          </div>

        </div>
      </Container>
    </section>
  );
}
