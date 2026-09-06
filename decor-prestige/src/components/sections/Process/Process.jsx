import { useEffect, useRef } from 'react';
import { Ruler, Layers, FileText, Scissors, Hammer } from 'lucide-react';
import { steps } from '../../../data/process';
import styles from './Process.module.css';

const icons = {
  pomiar:  <Ruler     size={24} strokeWidth={1.2} />,
  wybor:   <Layers    size={24} strokeWidth={1.2} />,
  wycena:  <FileText  size={24} strokeWidth={1.2} />,
  szycie:  <Scissors  size={24} strokeWidth={1.2} />,
  montaz:  <Hammer    size={24} strokeWidth={1.2} />,
};

/* Każdy krok — pojawia się po tym jak linia go "dosięgnie" */
function Step({ step, index }) {
  return (
    <li
      className={styles.step}
      style={{ '--step-delay': `${0.3 + index * 0.35}s` }}
    >
      <span className={styles.num}>{step.num}</span>
      <div className={styles.iconWrap} aria-hidden="true">
        {icons[step.id]}
      </div>
      <span className={styles.title}>{step.title}</span>
      <span className={styles.sub}>{step.sub}</span>
    </li>
  );
}

export default function Process() {
  const headingRef  = useRef(null);
  const processRef  = useRef(null);

  /* Nagłówek fade-in */
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

  /* Linia + kroki — triggerowane jednym observerem na wrapperze */
  useEffect(() => {
    const el = processRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add(styles.animate);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="proces" className={styles.section} aria-labelledby="process-heading">

      <img src="/process-flower.png" alt="" className={styles.flower} aria-hidden="true" />

      <div className={styles.inner}>

        {/* Nagłówek */}
        <div className={`${styles.header} ${styles.fadeIn}`} ref={headingRef}>
          <p className={styles.eyebrow}>Jak to działa?</p>
          <h2 id="process-heading" className={styles.heading}>
            Od pomiaru do gotowej dekoracji
          </h2>
        </div>

        {/* Proces */}
        <div className={styles.processWrap} ref={processRef}>
          {/* Animowana linia biegnąca przez środek kółek */}
          <div className={styles.line} aria-hidden="true" />

          <ol className={styles.list}>
            {steps.map((step, i) => (
              <Step key={step.id} step={step} index={i} />
            ))}
          </ol>
        </div>

      </div>
    </section>
  );
}
