import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading.jsx';
import SpotlightCard from '../../components/ui/SpotlightCard.jsx';
import SceneArt from '../../components/illustrations/SceneArt.jsx';
import Button from '../../components/ui/Button.jsx';
import { Stagger } from '../../components/ui/Reveal.jsx';
import { SERVICES } from '../../data/content';
import { formatUSD } from '../../lib/format';

export default function Services() {
  return (
    <section className="section-y relative" aria-labelledby="services-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Cruise types"
            title="Six ways to go to sea"
            intro="Big ships, river boats, ice-class expedition vessels and everything between. Fares shown are typical starting prices per person."
          />
          <Button to="/services" variant="secondary" className="shrink-0 self-start lg:self-auto">Compare all cruise types</Button>
        </div>
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <SpotlightCard key={s.id} as="article" className="group overflow-hidden">
              <Link to={`/services#${s.id}`} className="block rounded-[20px] focus-visible:outline-offset-[-2px]">
                <div className="relative h-60 overflow-hidden">
                  <SceneArt scene={s.scene} className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-110" />
                  <span className="absolute top-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brass shadow-soft">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="absolute top-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-brass text-white opacity-0 shadow-blue transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-xl font-extrabold text-foam transition-colors group-hover:text-brass">{s.title}</h3>
                    <p className="shrink-0 text-sm text-mist">from <span className="text-base font-extrabold text-foam">{formatUSD(s.from)}</span></p>
                  </div>
                  <p className="mt-3 leading-relaxed text-mist">{s.body}</p>
                </div>
              </Link>
            </SpotlightCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
