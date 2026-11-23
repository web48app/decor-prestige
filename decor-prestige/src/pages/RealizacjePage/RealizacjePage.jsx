import { useState, useEffect, useRef, useCallback } from 'react';
import { realizacje, realizacjeCategories } from '../../data/products';
import Container from '../../components/ui/Container/Container';
import Footer from '../../components/layout/Footer/Footer';
import RealizacjeNavbar from './RealizacjeNavbar';
import styles from './RealizacjePage.module.css';

/* ---- Karta realizacji ---- */
function RealizacjaCard({ item, index, onOpen }) {
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
      <button
        type="button"
        className={styles.cardImageWrap}
        onClick={onOpen}
        aria-label={`Powiększ: ${item.title}`}
      >
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
      </button>
      <div className={styles.cardCaption}>
        <span className={styles.cardTitle}>{item.title}</span>
      </div>
    </article>
  );
}

/* ---- Podgląd zdjęcia z nawigacją ---- */
function Lightbox({ items, index, onClose, onNav }) {
  const item = items[index];

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNav(1);
      if (e.key === 'ArrowLeft') onNav(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onNav]);

  /* przesuwanie palcem na telefonie */
  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 50) onNav(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  if (!item) return null;

  return (
    <div
      className={styles.lightbox}
      onClick={onClose}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <button type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Zamknij">×</button>
      {items.length > 1 && (
        <>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
            onClick={(e) => { e.stopPropagation(); onNav(-1); }}
            aria-label="Poprzednie zdjęcie"
          >‹</button>
          <button
            type="button"
            className={`${styles.lightboxNav} ${styles.lightboxNext}`}
            onClick={(e) => { e.stopPropagation(); onNav(1); }}
            aria-label="Następne zdjęcie"
          >›</button>
        </>
      )}
      <figure className={styles.lightboxFigure} onClick={(e) => e.stopPropagation()}>
        <img src={item.image} alt={item.alt} className={styles.lightboxImage} />
        <figcaption className={styles.lightboxCaption}>
          {item.title}
          <span className={styles.lightboxCount}>{index + 1} / {items.length}</span>
        </figcaption>
      </figure>
    </div>
  );
}

const PAGE_SIZE = 12;

/* ============================================================
   REALIZACJE PAGE
   ============================================================ */
export default function RealizacjePage() {
  const [activeCategory, setActiveCategory] = useState('wszystkie');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = activeCategory === 'wszystkie'
    ? realizacje
    : realizacje.filter(r => r.category === activeCategory);

  const navLightbox = useCallback((dir) => {
    setOpenIndex((i) => (i === null ? i : (i + dir + filtered.length) % filtered.length));
  }, [filtered.length]);
  const closeLightbox = useCallback(() => setOpenIndex(null), []);

  return (
    <>
      <RealizacjeNavbar />
      {openIndex !== null && (
        <Lightbox items={filtered} index={openIndex} onClose={closeLightbox} onNav={navLightbox} />
      )}

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
                  onClick={() => { setActiveCategory(cat.id); setVisibleCount(PAGE_SIZE); }}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Siatka */}
            <div className={styles.grid}>
              {filtered.slice(0, visibleCount).map((item, i) => (
                <RealizacjaCard key={item.id} item={item} index={i} onOpen={() => setOpenIndex(i)} />
              ))}
            </div>

            {visibleCount < filtered.length && (
              <div className={styles.moreWrap}>
                <button
                  type="button"
                  className={styles.moreBtn}
                  onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                >
                  Pokaż więcej ({filtered.length - visibleCount})
                </button>
              </div>
            )}

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
                Przyjeżdżamy do klienta — pomiar i doradztwo na terenie całej Polski.
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
