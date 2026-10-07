import { useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading.jsx';
import Button from '../../components/ui/Button.jsx';
import SpotlightCard from '../../components/ui/SpotlightCard.jsx';
import { Stagger } from '../../components/ui/Reveal.jsx';
import { PLANS } from '../../data/content';
import { cn } from '../../lib/cn';

function BillingToggle({ value, onChange }) {
  const options = [
    { id: 'voyage', label: 'Per voyage' },
    { id: 'annual', label: 'Annual, unlimited voyages' },
  ];
  return (
    <div role="radiogroup" aria-label="Billing period" className="glass inline-flex rounded-full p-1.5">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="radio"
          aria-checked={value === o.id}
          onClick={() => onChange(o.id)}
          className={cn('relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors', value === o.id ? 'text-white' : 'text-foam/75 hover:text-foam')}
        >
          {value === o.id && <m.span layoutId="billing-pill" className="absolute inset-0 rounded-full bg-brass" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
          <span className="relative">{o.label}</span>
        </button>
      ))}
    </div>
  );
}

export default function Pricing({ headingLevel = 'h2', showHeading = true }) {
  const [billing, setBilling] = useState('voyage');
  return (
    <section className="section-y relative" aria-labelledby="pricing-title">
      <div className="container-x">
        {showHeading ? (
          <SectionHeading
            as={headingLevel}
            id="pricing-title"
            align="center"
            eyebrow="Pricing"
            title="Concierge plans"
            intro="Essential costs nothing — cruise lines pay us. Add a dedicated planner when you’d like someone to handle the whole trip."
          />
        ) : (
          <h2 id="pricing-title" className="sr-only">Concierge plans</h2>
        )}
        <div className="mt-10 flex justify-center">
          <BillingToggle value={billing} onChange={setBilling} />
        </div>
        <Stagger className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan) => {
            const price = plan.price[billing];
            return (
              <SpotlightCard
                key={plan.id}
                className={cn('flex flex-col p-8 sm:p-9', plan.highlight && 'bg-gradient-to-b from-brass/[0.07] to-white shadow-glow lg:-my-4 lg:py-12')}
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-2xl font-extrabold text-foam">{plan.name}</h3>
                  {plan.highlight && <span className="rounded-full bg-brass px-3 py-1 text-xs font-bold text-white shadow-blue">Most chosen</span>}
                </div>
                <p className="mt-3 min-h-12 leading-relaxed text-mist">{plan.tagline}</p>
                <div className="mt-8 flex h-16 items-end gap-2">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <m.span
                      key={`${plan.id}-${billing}`}
                      initial={{ y: 24, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -24, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="text-5xl leading-none font-extrabold tracking-tight text-foam tabular-nums sm:text-6xl"
                    >
                      {price === 0 ? 'Free' : `$${price.toLocaleString('en-US')}`}
                    </m.span>
                  </AnimatePresence>
                  {price > 0 && <span className="pb-1.5 text-sm text-mist">{billing === 'voyage' ? 'per voyage' : 'per year'}</span>}
                </div>
                <Button to={`/contact?plan=${plan.id}#enquiry`} variant={plan.highlight ? 'primary' : 'secondary'} className="mt-8 w-full">
                  {plan.cta}
                </Button>
                <ul className="mt-9 space-y-3.5 border-t border-line pt-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-3 text-[0.95rem] text-foam/85">
                      <Check className={cn('mt-0.5 h-4 w-4 shrink-0', plan.highlight ? 'text-brass' : 'text-brass/70')} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            );
          })}
        </Stagger>
        <p className="mt-12 text-center text-sm text-mist">Planning fees are charged once your cruise is booked and refunded in full if the cruise line cancels.</p>
      </div>
    </section>
  );
}
