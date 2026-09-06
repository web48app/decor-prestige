import styles from './SectionHeading.module.css';

/**
 * SectionHeading — spójny nagłówek sekcji
 * @param {string} eyebrow  - mały label nad tytułem
 * @param {string} title    - główny tytuł (h2)
 * @param {string} description - opcjonalny podtytuł / lead
 * @param {string} align    - 'center' | 'left'
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const alignClass = align === 'left' ? styles.left : styles.center;

  return (
    <div className={`${styles.wrapper} ${alignClass} ${className}`}>
      {eyebrow && (
        <span className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</span>
      )}
      <h2 className={styles.title}>{title}</h2>
      {description && (
        <p className={`lead ${styles.description}`}>{description}</p>
      )}
      <div className={`divider ${align === 'left' ? 'divider--left' : ''} ${styles.divider}`} />
    </div>
  );
}
