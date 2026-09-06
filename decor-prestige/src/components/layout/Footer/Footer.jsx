import { site } from '../../../data/site';
import Container from '../../ui/Container/Container';
import styles from './Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer} role="contentinfo">
      <Container>
        <div className={styles.inner}>
          <div className={styles.brand}>
            <span className={styles.brandName}>{site.name}</span>
            <span className={styles.brandTagline}>{site.tagline}</span>
          </div>

          <address className={styles.contact}>
            <a href={site.contact.phoneHref}>{site.contact.phone}</a>
            <a href={site.contact.emailHref}>{site.contact.email}</a>
            <span>{site.contact.address.street}, {site.contact.address.city}</span>
          </address>

          <p className={styles.copy}>
            © {year} {site.name}. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </Container>
    </footer>
  );
}
