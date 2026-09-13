import { useState, useEffect, useRef } from 'react';
import { realizacje, realizacjeCategories } from '../../data/products';
import Container from '../../components/ui/Container/Container';
import Footer from '../../components/layout/Footer/Footer';
import RealizacjeNavbar from './RealizacjeNavbar';
import styles from './RealizacjePage.module.css';

/* ---- Karta realizacji ---- */
function RealizacjaCard({ item, index }) {
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

  return (
    <article
      className={`${styles.card} ${styles.fadeIn}`}
      ref={ref}
      style={{ '--card-delay': `${(index % 3) * 0.08}s` }}
    >
      <div className={styles.cardImageWrap}>
        <img
          src={item.image}
          alt={item.alt}
          className={styles.cardImage}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className={styles.cardOverlay}>
          <span className={styles.cardCategory}>
            {realizacjeCategories.find(c => c.id === item.category)?.label}
          </span>
        </div>
      </div>
      <div className={styles.cardCaption}>
        <span className={styles.cardTitle}>{item.title}</span>
      </div>
    </article>
  );
}

/* ============================================================
   REALIZACJE PAGE
   ============================================================ */
export default function RealizacjePage() {
  const [activeCategory, setActiveCategory] = useState('wszystkie');

  const filtered = activeCategory === 'wszystkie'
    ? realizacje
    : realizacje.filter(r => r.category === activeCategory);

  return (
    <>
      <RealizacjeNavbar />

      <main>
        {/* ---- Hero ---- */}
        <section className={styles.hero}>
          <Container>
            <div className={styles.heroInner}>
              <p className={styles.heroEyebrow}>Portfolio</p>
              <h1 className={styles.heroHeading}>
                Nasze<br />
                <em className={styles.heroAccent}>Realizacje</em>
              </h1>
              <p className={styles.heroSub}>
                Każde wnętrze jest inne — każde wymaga indywidualnego podejścia.
                Zobacz, co tworzymy dla naszych klientów.
              </p>
            </div>
          </Container>
        </section>

        {/* ---- Galeria ---- */}
        <section className={styles.gallerySection}>
          <Container>

            {/* Filtry */}
            <div className={styles.filters} role="tablist" aria-label="Filtruj realizacje">
              {realizacjeCategories.map(cat => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterActive : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Siatka */}
            <div className={styles.grid}>
              {filtered.map((item, i) => (
                <RealizacjaCard key={item.id} item={item} index={i} />
              ))}
            </div>

          </Container>
        </section>

        {/* ---- CTA ---- */}
        <section className={styles.cta}>
          <Container>
            <div className={styles.ctaInner}>
              <h2 className={styles.ctaHeading}>
                Chcesz takie dekoracje<br />w swoim wnętrzu?
              </h2>
              <p className={styles.ctaText}>
                Przyjeżdżamy do klienta — bezpłatny pomiar i doradztwo w całej Małopolsce.
              </p>
              <a href="/kontakt" className={styles.ctaBtn}>
                Umów się na pomiar
              </a>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
