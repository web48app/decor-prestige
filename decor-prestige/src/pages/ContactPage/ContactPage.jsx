import ContactNavbar from './ContactNavbar';
import ContactHero from './ContactHero';
import ContactDetails from './ContactDetails';
import ContactCTA from './ContactCTA';
import ContactForm from './ContactForm';
import Footer from '../../components/layout/Footer/Footer';

export default function ContactPage() {
  return (
    <>
      <ContactNavbar />
      <main>
        <ContactHero />
        <ContactDetails />
        <ContactCTA />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
