import { useEffect, useRef } from 'react';
import Container from '../../ui/Container/Container';
import { site } from '../../../data/site';
import styles from './About.module.css';

const pillars = [
  { title: 'Szycie na miarę',     sub: 'Każda dekoracja dopasowana do okna' },
  { title: 'Doradztwo u klienta', sub: 'Dobór tkanin i rozwiązań na miejscu' },
  { title: 'Montaż',              sub: 'Tarnów i cała Małopolska' },
];

export default function About() {
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

  return (
    <section id="o-firmie" className={styles.section} aria-labelledby="about-heading">
      <Container>
        <div className={`${styles.grid} ${styles.fadeIn}`} ref={ref}>

          <div className={styles.media}>
            <div className={styles.frame} aria-hidden="true" />
            <img
              src="/Services/szycie.png"
              alt="Szycie zasłon na miarę w pracowni DECOR-PRESTIGE"
              className={styles.image}
              loading="lazy"
            />
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>O firmie</p>

            <h2 id="about-heading" className={styles.heading}>
              Dekoracje okienne<br />
              z <em className={styles.headingAccent}>pasją</em> do detalu
            </h2>

            <div className={styles.text}>
              <p>
                {site.name} to pracownia dekoracji okiennych z Tarnowa, prowadzona
                przez {site.owner}. Tworzymy zasłony, rolety, plisy i karnisze,
                które nie tylko pięknie wyglądają, ale przede wszystkim pasują
                do stylu wnętrza i potrzeb domowników.
              </p>
              <p>
                Każde zlecenie traktujemy indywidualnie. Przyjeżdżamy do klienta,
                doradzamy w wyborze tkanin i rozwiązań, a następnie szyjemy
                i montujemy dekoracje na miarę — od pierwszej rozmowy aż po
                ostatni montaż masz jedną osobę kontaktową.
              </p>
              <p>
                Działamy w Tarnowie i na terenie całej Małopolski — w domach,
                mieszkaniach i biurach.
              </p>
            </div>

            <p className={styles.signature}>{site.owner}</p>

            <ul className={styles.pillars}>
              {pillars.map((p) => (
                <li key={p.title} className={styles.pillar}>
                  <span className={styles.pillarTitle}>{p.title}</span>
                  <span className={styles.pillarSub}>{p.sub}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </Container>
    </section>
  );
}
