import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowUpRight, CalendarDays, Moon } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading.jsx';
import SceneArt from '../../components/illustrations/SceneArt.jsx';
import Button from '../../components/ui/Button.jsx';
import { Stagger, fadeUp } from '../../components/ui/Reveal.jsx';
import { DESTINATIONS } from '../../data/content';
import { formatUSD } from '../../lib/format';
import { cn } from '../../lib/cn';

// Bento placement for the six destinations on large screens
const LAYOUT = ['lg:col-span-2 lg:row-span-2', '', '', '', '', 'sm:col-span-2 lg:col-span-4'];

export default function Destinations() {
  return (
    <section className="section-y relative bg-white" aria-labelledby="destinations-home-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="destinations-home-title"
            eyebrow="Popular destinations"
            title="Where our guests are sailing"
            intro="Starting fares are per person for an inside cabin on a mainstream line, before agency perks."
          />
          <Button to="/services#destinations" variant="secondary" icon={ArrowUpRight} className="shrink-0 self-start lg:self-auto">All destinations</Button>
        </div>

        <Stagger className="mt-14 grid auto-rows-[18rem] gap-5 sm:grid-cols-2 lg:auto-rows-[17rem] lg:grid-cols-4">
          {DESTINATIONS.map((d, i) => (
            <m.article key={d.name} variants={fadeUp} className={cn('group relative', LAYOUT[i])}>
              <Link
                to={`/contact?destination=${encodeURIComponent(d.name)}#enquiry`}
                className="card-lift relative block h-full overflow-hidden rounded-[20px] shadow-card"
                aria-label={`${d.name} — from ${formatUSD(d.from)} per person. Get sailings`}
              >
                <SceneArt scene={d.scene} className="absolute inset-0 h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-110" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0b1f3a]/85 via-[#0b1f3a]/25 to-transparent" />
                <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-foam shadow-soft">
                  Best {d.season}
                </span>
                <span aria-hidden="true" className="absolute top-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-brass opacity-0 shadow-soft transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className={cn('font-extrabold text-white', i === 0 || i === 5 ? 'text-3xl sm:text-4xl' : 'text-2xl')}>{d.name}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/85">
                    <span className="inline-flex items-center gap-1.5"><Moon className="h-4 w-4" aria-hidden="true" />{d.nights}</span>
                    <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4" aria-hidden="true" />{d.season}</span>
                    <span className="ml-auto text-white">from <span className="text-lg font-extrabold">{formatUSD(d.from)}</span></span>
                  </div>
                </div>
              </Link>
            </m.article>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
