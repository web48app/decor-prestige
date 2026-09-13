import { useEffect, useRef } from 'react';
import { site } from '../../data/site';
import { products } from '../../data/products';
import Container from '../../components/ui/Container/Container';
import Footer from '../../components/layout/Footer/Footer';
import ProductsNavbar from './ProductsNavbar';
import styles from './ProductsPage.module.css';

/* ---- Pojedyncza sekcja produktu ---- */
function ProductSection({ product, index }) {
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
      <div className={styles.productImageWrap}>
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
      </div>

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

        <a href="/kontakt" className={styles.cta}>
          Umów bezpłatny pomiar →
        </a>
      </div>
    </article>
  );
}

/* ============================================================
   PRODUKTY PAGE
   ============================================================ */
export default function ProductsPage() {
  return (
    <>
      <ProductsNavbar />

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
                Zasłony, rolety, plisy i karnisze — dobieramy je indywidualnie
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
                <ProductSection key={product.id} product={product} index={i} />
              ))}
            </div>
          </Container>
        </section>

        {/* ---- Dolne CTA ---- */}
        <section className={styles.bottomCta}>
          <Container>
            <div className={styles.bottomCtaInner}>
              <h2 className={styles.bottomCtaHeading}>
                Nie wiesz, które rozwiązanie<br />pasuje do Twojego wnętrza?
              </h2>
              <p className={styles.bottomCtaText}>
                Przyjeżdżamy do klienta — bezpłatny pomiar i doradztwo
                na miejscu, bez zobowiązań.
              </p>
              <a href="/kontakt" className={styles.bottomCtaBtn}>
                Umów bezpłatny pomiar
              </a>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
