import { useEffect, useRef, useState } from 'react';
import { site } from '../../data/site';
import { products } from '../../data/products';
import Container from '../../components/ui/Container/Container';
import Footer from '../../components/layout/Footer/Footer';
import ProductsNavbar from './ProductsNavbar';
import styles from './ProductsPage.module.css';

/* ---- Podgląd zdjęcia na pełnym ekranie ---- */
function Lightbox({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className={styles.lightbox} onClick={onClose} role="dialog" aria-modal="true" aria-label={item.label}>
      <button type="button" className={styles.lightboxClose} onClick={onClose} aria-label="Zamknij">×</button>
      <figure className={styles.lightboxFigure} onClick={(e) => e.stopPropagation()}>
        <img src={item.image} alt={item.label} className={styles.lightboxImage} />
        <figcaption className={styles.lightboxCaption}>{item.label}</figcaption>
      </figure>
    </div>
  );
}

/* ---- Pojedyncza sekcja produktu ---- */
function ProductSection({ product, index, onOpen }) {
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

  const isEven = index % 2 === 0;

  return (
    <article
      className={`${styles.productRow} ${styles.fadeIn} ${isEven ? styles.rowNormal : styles.rowReverse}`}
      ref={ref}
    >
      {/* Zdjęcie */}
      <button
        type="button"
        className={styles.productImageWrap}
        onClick={() => onOpen({ image: product.full || product.image, label: product.title })}
        aria-label={`Powiększ zdjęcie: ${product.title}`}
      >
        <img
          src={product.image}
          alt={product.alt}
          className={styles.productImage}
          loading="lazy"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
        <div className={styles.productNum} aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </div>
      </button>

      {/* Treść */}
      <div className={styles.productContent}>
        <p className={styles.eyebrow}>Oferta</p>
        <h2 className={styles.productTitle}>{product.title}</h2>
        <p className={styles.productDesc}>{product.description}</p>

        <ul className={styles.featureList}>
          {product.features.map((f) => (
            <li key={f} className={styles.featureItem}>
              <span className={styles.featureDot} aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        {product.types && (
          <div className={styles.typesGrid}>
            {product.types.map((t) => (
              <figure key={t.label} className={styles.typeItem}>
                <button
                  type="button"
                  className={styles.typeButton}
                  onClick={() => onOpen(t)}
                  aria-label={`Powiększ: ${t.label}`}
                >
                  <img src={t.image} alt={t.label} className={styles.typeImage} loading="lazy" />
                </button>
                <figcaption className={styles.typeLabel}>{t.label}</figcaption>
              </figure>
            ))}
          </div>
        )}

        <a href="/kontakt" className={styles.cta}>
          Umów wizytę i pomiar →
        </a>
      </div>
    </article>
  );
}

/* ============================================================
   PRODUKTY PAGE
   ============================================================ */
export default function ProductsPage() {
  const [preview, setPreview] = useState(null);

  return (
    <>
      <ProductsNavbar />
      {preview && <Lightbox item={preview} onClose={() => setPreview(null)} />}

      <main>
        {/* ---- Hero ---- */}
        <section className={styles.hero}>
          <Container>
            <div className={styles.heroInner}>
              <p className={styles.heroEyebrow}>Nasze Produkty</p>
              <h1 className={styles.heroHeading}>
                Dekoracje okien<br />
                <em className={styles.heroAccent}>szyte na miarę</em>
              </h1>
              <p className={styles.heroSub}>
                Zasłony, rolety, plisy, karnisze i dodatki — dobieramy je indywidualnie
                do Twojego wnętrza, stylu i potrzeb.
              </p>
            </div>
          </Container>
        </section>

        {/* ---- Produkty ---- */}
        <section className={styles.productsSection}>
          <Container>
            <div className={styles.productsList}>
              {products.map((product, i) => (
                <ProductSection key={product.id} product={product} index={i} onOpen={setPreview} />
              ))}
            </div>
          </Container>
        </section>

        {/* ---- Dolne CTA ---- */}
        <section className={styles.bottomCta}>
          <Container>
            <div className={styles.bottomCtaInner}>
              <h2 className={styles.bottomCtaHeading}>
                Nie wiesz, które rozwiązanie najlepiej<br />sprawdzi się w Twoim wnętrzu?
              </h2>
              <p className={styles.bottomCtaText}>
                Oferujemy profesjonalną wizytę pomiarowo-doradczą w Twoim domu.
                Pomożemy dobrać odpowiednie tkaniny, dekoracje okienne oraz
                rozwiązania dopasowane do charakteru wnętrza.
              </p>
              <a href="/kontakt" className={styles.bottomCtaBtn}>
                Umów wizytę i pomiar
              </a>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
