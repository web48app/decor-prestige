import styles from './Button.module.css';

/**
 * Button — system przycisków
 * @param {string} variant - 'primary' | 'secondary' | 'text'
 * @param {string} as - 'button' | 'a'
 */
export default function Button({
  children,
  variant = 'primary',
  as: Tag = 'button',
  href,
  onClick,
  className = '',
  ...props
}) {
  const variantClass = {
    primary:   styles.primary,
    secondary: styles.secondary,
    text:      styles.text,
  }[variant] ?? styles.primary;

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`${styles.btn} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
