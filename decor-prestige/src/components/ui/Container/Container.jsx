import styles from './Container.module.css';

/**
 * Container — spójny wrapper z max-width i padding
 * @param {string} size - 'default' | 'narrow'
 * @param {string} as - tag HTML (domyślnie 'div')
 */
export default function Container({ children, size = 'default', as: Tag = 'div', className = '' }) {
  const sizeClass = size === 'narrow' ? styles.narrow : styles.default;

  return (
    <Tag className={`${styles.container} ${sizeClass} ${className}`}>
      {children}
    </Tag>
  );
}
