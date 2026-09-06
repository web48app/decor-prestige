import { useEffect, useRef } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import Container from '../../ui/Container/Container';
import styles from './Reviews.module.css';

/* Stała URL wizytówki Google — podmień na właściwą */
const GOOGLE_REVIEW_URL =
  'https://g.page/r/decor-prestige-tarnow/review';

const REVIEWS = [
  {
    id: 1,
    name: 'Anna Kowalska',
    rating: 5,
    date: 'Październik 2024',
    text: 'Pani Barbara to prawdziwa specjalistka w swoim fachu. Zasłony uszyte na miarę idealnie pasują do naszego salonu. Pomiar, dobór materiału i montaż — wszystko perfekcyjne. Serdecznie polecam!',
    location: 'Tarnów',
  },
  {
    id: 2,
    name: 'Marek Wiśniewski',
    rating: 5,
    date: 'Sierpień 2024',
    text: 'Skorzystaliśmy z usług Decor Prestige przy kompletnym urządzaniu sypialni. Firanki i zasłony wyszły fenomenalnie — dokładnie takie, jakich szukaliśmy. Profesjonalna obsługa od początku do końca.',
    location: 'Tarnów',
  },
  {
    id: 3,
    name: 'Joanna Nowak',
    rating: 5,
    date: 'Czerwiec 2024',
    text: 'Bardzo polecam! Doradztwo przy wyborze materiałów było rewelacyjne, pani Barbara ma niesamowite wyczucie stylu. Efekt końcowy przerósł nasze oczekiwania. Na pewno wrócimy przy kolejnych projektach.',
    location: 'Dębica',
  },
  {
    id: 4,
    name: 'Tomasz Jabłoński',
    rating: 4,
    date: 'Marzec 2024',
    text: 'Bardzo dobra jakość usług i materiałów. Rolety zamontowane terminowo i estetycznie. Widać doświadczenie i dbałość o detale. Zdecydowanie wrócę po więcej.',
    location: 'Rzeszów',
  },
];

const OVERALL_RATING = 4.9;
const TOTAL_REVIEWS = 47;

/* Gwiazdki — obsługuje ułamkowe wartości */
function Stars({ rating, size = 20 }) {
  return (
    <span className={styles.stars} aria-label={`${rating} na 5`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const fill = Math.min(1, Math.max(0, rating - (n - 1)));
        return (
          <span key={n} className={styles.starWrap} style={{ '--fill': fill }}>
            <Star size={size} className={styles.starEmpty} />
            <Star size={size} className={styles.starFull} style={{ clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)` }} />
          </span>
        );
      })}
    </span>
  );
}

/* Pojedyncza karta opinii */
function ReviewCard({ review, index }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <article
      className={`${styles.card} ${styles.fadeIn}`}
      ref={ref}
      style={{ '--card-delay': `${0.1 + index * 0.12}s` }}
    >
      <div className={styles.cardTop}>
        <Stars rating={review.rating} size={16} />
        <span className={styles.cardDate}>{review.date}</span>
      </div>
      <p className={styles.cardText}>„{review.text}"</p>
      <div className={styles.cardAuthor}>
        <span className={styles.authorInitial}>{review.name[0]}</span>
        <div>
          <span className={styles.authorName}>{review.name}</span>
          <span className={styles.authorLocation}>{review.location}</span>
        </div>
      </div>
    </article>
  );
}

export default function Reviews() {
  const headingRef = useRef(null);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add(styles.visible); io.disconnect(); } },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="opinie" className={styles.section} aria-labelledby="reviews-heading">
      <Container>

        {/* Nagłówek */}
        <div className={`${styles.header} ${styles.fadeIn}`} ref={headingRef}>
          <div className={styles.headerLeft}>
            <p className={styles.eyebrow}>Opinie klientów</p>
            <h2 id="reviews-heading" className={styles.heading}>
              Co mówią<br /><em className={styles.headingAccent}>nasi klienci?</em>
            </h2>
          </div>

          <div className={styles.headerRight}>
            {/* Ogólna ocena */}
            <div className={styles.overallRating}>
              <span className={styles.ratingScore}>{OVERALL_RATING.toFixed(1)}</span>
              <div className={styles.ratingMeta}>
                <Stars rating={OVERALL_RATING} size={22} />
                <span className={styles.ratingCount}>
                  {TOTAL_REVIEWS} opinii · Google
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Karty opinii */}
        <div className={styles.grid}>
          {REVIEWS.map((r, i) => (
            <ReviewCard key={r.id} review={r} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className={styles.cta}>
          <a
            href={GOOGLE_REVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaBtn}
          >
            Dodaj opinię
            <ExternalLink size={15} strokeWidth={1.6} />
          </a>
        </div>

      </Container>
    </section>
  );
}
