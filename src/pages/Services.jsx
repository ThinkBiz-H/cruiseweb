import { Check, Clock, Moon } from 'lucide-react';
import Seo from '../components/global/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import SpotlightCard from '../components/ui/SpotlightCard.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import Button from '../components/ui/Button.jsx';
import SceneArt from '../components/illustrations/SceneArt.jsx';
import { Reveal, Stagger } from '../components/ui/Reveal.jsx';
import Process from '../sections/home/Process.jsx';
import Features from '../sections/home/Features.jsx';
import Faq from '../sections/home/Faq.jsx';
import { DESTINATIONS, FAQS, SERVICES } from '../data/content';
import { formatUSD } from '../lib/format';
import { faqSchema } from '../components/global/Seo.jsx';
import { cn } from '../lib/cn';

export default function Services() {
  const faqs = FAQS.slice(1, 5);
  return (
    <>
      <Seo
        title="Cruises & services"
        description="Ocean, river, expedition, small-ship luxury, group and honeymoon cruises — compared across 40+ lines and planned end to end by Maristella."
        breadcrumbs={[{ name: 'Cruises', path: '/services' }]}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Cruise planning services',
            itemListElement: SERVICES.map((s, i) => ({
              '@type': 'ListItem', position: i + 1,
              item: { '@type': 'Service', name: s.title, description: s.body, provider: { '@id': 'https://maristella.travel/#organization' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: s.from } },
            })),
          },
          faqSchema(faqs),
        ]}
      />
      <PageHero
        crumbs={[{ name: 'Cruises', path: '/services' }]}
        title="Every kind of voyage, one planner"
        intro="We book with more than 40 ocean, river and expedition lines. Here’s what each kind of cruise is like — and what we take care of for you."
      />

      <section className="pb-12" aria-label="Cruise types">
        <div className="container-x space-y-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} as="article" id={s.id} className="scroll-mt-28">
              <div className={cn('glass grid items-center gap-8 overflow-hidden rounded-[20px] p-3 lg:grid-cols-2 lg:gap-14')}>
                <div className={cn('group relative h-72 overflow-hidden rounded-[16px] lg:h-full lg:min-h-[24rem]', i % 2 === 1 && 'lg:order-2')}>
                  <SceneArt scene={s.scene} className="h-full w-full transition-transform duration-[1.4s] group-hover:scale-105" />
                  <span className="glass absolute top-4 left-4 flex items-center gap-2 rounded-full px-4 py-2 text-sm text-foam">
                    <s.icon className="h-4 w-4 text-seaglass" aria-hidden="true" />{s.title}
                  </span>
                </div>
                <div className="px-4 pb-6 lg:px-6 lg:py-10">
                  <h2 className="font-display text-4xl text-foam sm:text-5xl">{s.title}</h2>
                  <p className="mt-2 text-mist">Typical fares from <span className="font-semibold text-brass">{formatUSD(s.from)}</span> per person</p>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-foam/85">{s.body}</p>
                  <ul className="mt-7 space-y-3">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-3 text-foam/85"><Check className="mt-1 h-4 w-4 shrink-0 text-seaglass" aria-hidden="true" />{p}</li>
                    ))}
                  </ul>
                  <Button to={`/contact?destination=${encodeURIComponent(s.title)}#enquiry`} variant="secondary" className="mt-9">Ask about {s.title.toLowerCase()}</Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="destinations" className="section-y scroll-mt-20" aria-labelledby="destinations-title">
        <div className="container-x">
          <SectionHeading id="destinations-title" title="Where we sail most" intro="Starting fares are per person for an inside cabin on a mainstream line, before agency perks." />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DESTINATIONS.map((d) => (
              <SpotlightCard key={d.name} as="article" className="group overflow-hidden p-2">
                <div className="relative h-56 overflow-hidden rounded-[16px]">
                  <SceneArt scene={d.scene} className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-110" />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-abyss/80 to-transparent" />
                  <p className="absolute bottom-4 left-5 text-sm text-foam/90">from <span className="font-display text-2xl text-foam">{formatUSD(d.from)}</span></p>
                </div>
                <div className="px-5 pt-5 pb-5">
                  <h3 className="font-display text-2xl text-foam">{d.name}</h3>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-mist">
                    <span className="inline-flex items-center gap-1.5"><Moon className="h-4 w-4" aria-hidden="true" />{d.nights}</span>
                    <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4" aria-hidden="true" />Best {d.season}</span>
                  </div>
                  <Button to={`/contact?destination=${encodeURIComponent(d.name)}#enquiry`} variant="ghost" size="sm" className="mt-4 -ml-3 text-brass">Get sailings for {d.name}</Button>
                </div>
              </SpotlightCard>
            ))}
          </Stagger>
        </div>
      </section>

      <Features />
      <Process />
      <Faq items={faqs} title="Before you book" />
      <CtaBand />
    </>
  );
}
