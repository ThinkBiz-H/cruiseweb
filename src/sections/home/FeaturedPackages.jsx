import { Link } from 'react-router-dom';
import { ArrowRight, Check, Moon, Ship, Star } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading.jsx';
import SpotlightCard from '../../components/ui/SpotlightCard.jsx';
import SceneArt from '../../components/illustrations/SceneArt.jsx';
import Button from '../../components/ui/Button.jsx';
import { Stagger } from '../../components/ui/Reveal.jsx';
import { PACKAGES } from '../../data/content';
import { formatUSD } from '../../lib/format';

export default function FeaturedPackages() {
  return (
    <section className="section-y section-alt relative" aria-labelledby="packages-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="packages-title"
            eyebrow="Featured cruise packages"
            title="Sailings our planners recommend"
            intro="Hand-picked itineraries with agency perks already added. Fares are typical per-person starting prices and are confirmed at booking."
          />
          <Button to="/services" variant="secondary" icon={ArrowRight} className="shrink-0 self-start lg:self-auto">Browse cruise types</Button>
        </div>

        <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PACKAGES.map((p) => {
            const enquire = `/contact?destination=${encodeURIComponent(p.region)}#enquiry`;
            return (
              <SpotlightCard key={p.id} as="article" className="group flex flex-col overflow-hidden">
                <Link to={enquire} tabIndex={-1} aria-hidden="true" className="relative block h-60 overflow-hidden">
                  <SceneArt scene={p.scene} className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-110" />
                  <span className="absolute top-4 left-4 rounded-full bg-brass px-3 py-1 text-xs font-bold text-white shadow-blue">{p.badge}</span>
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-foam shadow-soft">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden="true" />{p.rating}
                  </span>
                </Link>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium text-mist">
                    <span className="inline-flex items-center gap-1.5"><Ship className="h-4 w-4 text-brass" aria-hidden="true" />{p.line}</span>
                    <span className="inline-flex items-center gap-1.5"><Moon className="h-4 w-4 text-brass" aria-hidden="true" />{p.nights} nights</span>
                  </div>
                  <h3 className="mt-3 text-xl font-extrabold text-foam transition-colors group-hover:text-brass">
                    <Link to={enquire} className="focus-visible:outline-offset-4">{p.title}</Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">
                    {p.ports.join(' → ')}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.perks.map((perk) => (
                      <li key={perk} className="inline-flex items-center gap-1.5 rounded-full bg-tide px-3 py-1 text-xs font-semibold text-foam/80">
                        <Check className="h-3.5 w-3.5 text-brass" aria-hidden="true" />{perk}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6">
                    <div className="flex items-end justify-between gap-4 border-t border-line pt-5">
                      <div>
                        <p className="text-xs font-semibold text-mist uppercase">From, per person</p>
                        <p className="text-2xl font-extrabold text-foam">{formatUSD(p.from)}</p>
                      </div>
                      <Button to={enquire} size="sm" icon={ArrowRight} aria-label={`Enquire about ${p.title}`}>Enquire</Button>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
