import { useEffect, useRef } from 'react';
import { steps } from '../../../data/process';
import styles from './Process.module.css';

function Arrow() {
  return (
    <svg
      className={styles.arrow}
      width="32" height="12"
      viewBox="0 0 32 12"
      fill="none"
      aria-hidden="true"
    >
      <line x1="0" y1="6" x2="26" y2="6" stroke="currentColor" strokeWidth="1" />
      <polyline points="22,2 28,6 22,10" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

function Step({ step, index }) {
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
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Icon = step.icon;

  return (
    <li
      ref={ref}
      className={`${styles.step} ${styles.fadeIn}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <span className={styles.num}>{step.num}</span>
      <div className={styles.iconWrap} aria-hidden="true">
        <Icon size={20} strokeWidth={1.2} />
      </div>
      <span className={styles.title}>{step.title}</span>
      <span className={styles.sub}>{step.sub}</span>
    </li>
  );
}

export default function Process() {
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
    <section id="proces" className={styles.section} aria-labelledby="process-heading">

      {/* Dekoracyjny kwiat — absolutnie pozycjonowany */}
      <img
        src="/process-flower.png"
        alt=""
        className={styles.flower}
        aria-hidden="true"
      />

      <div className={styles.inner}>
        {/* Nagłówek */}
        <div
          className={`${styles.header} ${styles.fadeIn}`}
          ref={headingRef}
        >
          <p className={styles.eyebrow}>Jak to działa?</p>
          <h2 id="process-heading" className={styles.heading}>
            Od pomiaru do gotowej dekoracji
          </h2>
        </div>

        {/* Proces */}
        <div className={styles.processWrap}>
          <ol className={styles.list}>
            {steps.flatMap((step, i) => {
              const items = [<Step key={step.id} step={step} index={i} />];
              if (i < steps.length - 1) {
                items.push(
                  <li key={`arrow-${i}`} className={styles.arrowItem} aria-hidden="true">
                    <Arrow />
                  </li>
                );
              }
              return items;
            })}
          </ol>
        </div>
      </div>

    </section>
  );
}
