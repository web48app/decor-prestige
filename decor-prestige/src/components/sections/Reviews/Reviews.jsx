import { useEffect, useRef, useState } from 'react';
import { Star, ExternalLink } from 'lucide-react';
import Container from '../../ui/Container/Container';
import styles from './Reviews.module.css';

import { googleReviews } from '../../../data/reviews';

const { reviewUrl } = googleReviews;

/* Pobiera opinie z /api/reviews; przy braku konfiguracji używa danych z reviews.js */
function useGoogleReviews() {
  const [state, setState] = useState({
    rating: googleReviews.rating,
    total: googleReviews.total,
    profileUrl: googleReviews.profileUrl,
    items: googleReviews.items,
  });

  useEffect(() => {
    let alive = true;
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (!alive || !d?.ok) return;
        setState({
          rating: d.rating,
          total: d.total,
          profileUrl: d.mapsUrl || googleReviews.profileUrl,
          items: d.reviews,
        });
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  return state;
}

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
          {review.location && <span className={styles.authorLocation}>{review.location}</span>}
        </div>
      </div>
    </article>
  );
}

export default function Reviews() {
  const { rating, total, profileUrl, items: REVIEWS } = useGoogleReviews();
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

  if (!REVIEWS.length && !reviewUrl) return null;

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

          {rating && (
          <div className={styles.headerRight}>
            {/* Ogólna ocena */}
            <div className={styles.overallRating}>
              <span className={styles.ratingScore}>{rating.toFixed(1)}</span>
              <div className={styles.ratingMeta}>
                <Stars rating={rating} size={22} />
                <span className={styles.ratingCount}>
                  {total} opinii · Google
                </span>
              </div>
            </div>
          </div>
          )}
        </div>

        {/* Karty opinii */}
        {REVIEWS.length > 0 ? (
          <div className={styles.grid}>
            {REVIEWS.map((r, i) => (
              <ReviewCard key={r.id} review={r} index={i} />
            ))}
          </div>
        ) : (
          <p className={styles.emptyText}>
            Byli Państwo naszymi klientami? Będzie nam miło, jeśli podzielą się Państwo opinią w Google.
          </p>
        )}

        {/* CTA */}
        <div className={styles.cta}>
          {profileUrl && REVIEWS.length > 0 && (
            <a href={profileUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
              Zobacz wszystkie opinie
              <ExternalLink size={15} strokeWidth={1.6} />
            </a>
          )}
          {reviewUrl && (
            <a href={reviewUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
              Wystaw opinię w Google
              <ExternalLink size={15} strokeWidth={1.6} />
            </a>
          )}
        </div>

      </Container>
    </section>
  );
}
