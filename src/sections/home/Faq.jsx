import SectionHeading from '../../components/ui/SectionHeading.jsx';
import Accordion from '../../components/ui/Accordion.jsx';
import Button from '../../components/ui/Button.jsx';
import { Reveal } from '../../components/ui/Reveal.jsx';
import { FAQS } from '../../data/content';
import { SITE } from '../../data/site';

export default function Faq({ items = FAQS, title = 'Questions, answered' }) {
  return (
    <section className="section-y section-alt relative" aria-labelledby="faq-title">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="faq-title" eyebrow="FAQ" title={title} intro="Can’t find what you need? A planner will answer — usually within a few minutes." />
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact" variant="secondary">Ask a planner</Button>
              <Button href={`mailto:${SITE.email}`} variant="ghost">{SITE.email}</Button>
            </Reveal>
          </div>
        </div>
        <Reveal className="lg:col-span-8">
          <Accordion items={items} />
        </Reveal>
      </div>
    </section>
  );
}
