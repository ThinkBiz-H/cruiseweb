import Seo from '../components/global/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import ContactSection from '../sections/home/Contact.jsx';
import Faq from '../sections/home/Faq.jsx';
import { FAQS } from '../data/content';
import { faqSchema } from '../components/global/Seo.jsx';

export default function Contact() {
  const faqs = FAQS.slice(3, 7);
  return (
    <>
      <Seo
        title="Contact a planner"
        description="Call, email or send an enquiry. A Maristella planner replies within the hour and sends a cruise shortlist within a day — no deposit needed."
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
        schema={[faqSchema(faqs)]}
      />
      <PageHero
        crumbs={[{ name: 'Contact', path: '/contact' }]}
        title="Talk to a planner"
        intro="Tell us what you know so far — even if that’s only “somewhere warm in March”. We’ll take it from there."
      />
      <div className="-mt-16 sm:-mt-24">
        <ContactSection showHeading={false} />
      </div>
      <Faq items={faqs} title="Good to know" />
    </>
  );
}
