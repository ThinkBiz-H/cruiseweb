import Seo, { faqSchema, websiteSchema } from '../components/global/Seo.jsx';
import Hero from '../sections/home/Hero.jsx';
import TrustedBy from '../sections/home/TrustedBy.jsx';
import WhyBook from '../sections/home/WhyBook.jsx';
import Destinations from '../sections/home/Destinations.jsx';
import FeaturedPackages from '../sections/home/FeaturedPackages.jsx';
import Features from '../sections/home/Features.jsx';
import Services from '../sections/home/Services.jsx';
import Process from '../sections/home/Process.jsx';
import Benefits from '../sections/home/Benefits.jsx';
import Stats from '../sections/home/Stats.jsx';
import WhyUs from '../sections/home/WhyUs.jsx';
import Testimonials from '../sections/home/Testimonials.jsx';
import Pricing from '../sections/home/Pricing.jsx';
import Faq from '../sections/home/Faq.jsx';
import Contact from '../sections/home/Contact.jsx';
import { FAQS } from '../data/content';

export default function Home() {
  return (
    <>
      <Seo schema={[websiteSchema(), faqSchema(FAQS)]} />
      <Hero />
      <TrustedBy />
      <WhyBook />
      <Destinations />
      <FeaturedPackages />
      <Services />
      <Features />
      <Process />
      <Benefits />
      <Stats />
      <WhyUs />
      <Testimonials />
      <Pricing />
      <Faq />
      <Contact />
    </>
  );
}
