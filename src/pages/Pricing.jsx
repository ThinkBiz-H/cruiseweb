import { Check, Minus } from 'lucide-react';
import Seo, { faqSchema } from '../components/global/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import PricingSection from '../sections/home/Pricing.jsx';
import Faq from '../sections/home/Faq.jsx';
import { FAQS, PLANS } from '../data/content';

const MATRIX = [
  { label: 'Sailing shortlist within 24 hours', plans: [true, true, true] },
  { label: 'Agency perks and price matching', plans: [true, true, true] },
  { label: 'Fare watch until final payment', plans: [true, true, true] },
  { label: 'Named planner by phone and message', plans: [false, true, true] },
  { label: 'Flights, hotels and transfers', plans: [false, true, true] },
  { label: 'Shore days with vetted local guides', plans: [false, true, true] },
  { label: '24/7 on-call line while sailing', plans: [false, true, true] },
  { label: 'Suite, villa and charter specialists', plans: [false, false, true] },
  { label: 'Private guide and driver in every port', plans: [false, false, true] },
  { label: 'Meet-and-greet at embarkation', plans: [false, false, true] },
];

export default function Pricing() {
  const faqs = [FAQS[0], FAQS[1], FAQS[2], FAQS[4]];
  return (
    <>
      <Seo
        title="Pricing & concierge plans"
        description="Essential cruise booking is free. Signature and Atelier concierge plans add a dedicated planner, flights, hotels and private shore days."
        breadcrumbs={[{ name: 'Pricing', path: '/pricing' }]}
        schema={[
          {
            '@context': 'https://schema.org',
            '@type': 'OfferCatalog',
            name: 'Maristella concierge plans',
            itemListElement: PLANS.map((p) => ({ '@type': 'Offer', name: p.name, description: p.tagline, price: p.price.voyage, priceCurrency: 'USD' })),
          },
          faqSchema(faqs),
        ]}
      />
      <PageHero
        crumbs={[{ name: 'Pricing', path: '/pricing' }]}
        title="Pay for planning only when you want it"
        intro="The cruise fare is the same as booking direct. Our concierge plans cover everything around it — and they’re entirely optional."
      />
      <div className="-mt-20 sm:-mt-24">
        <PricingSection showHeading={false} />
      </div>

      <section className="section-y pt-0" aria-labelledby="matrix-title">
        <div className="container-x">
          <SectionHeading id="matrix-title" title="Compare plans in detail" />
          <Reveal className="mt-12 overflow-x-auto rounded-[20px] border border-line">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">Features included in each concierge plan</caption>
              <thead>
                <tr className="bg-deep">
                  <th scope="col" className="px-6 py-5 text-sm font-medium text-mist">Included</th>
                  {PLANS.map((p) => (
                    <th key={p.id} scope="col" className={`px-6 py-5 text-center font-display text-xl font-extrabold ${p.highlight ? 'bg-brass/[0.08] text-brass' : 'text-foam'}`}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row) => (
                  <tr key={row.label} className="border-t border-line transition-colors hover:bg-deep">
                    <th scope="row" className="px-6 py-4 font-sans text-[0.95rem] font-medium text-foam/90">{row.label}</th>
                    {row.plans.map((has, i) => (
                      <td key={PLANS[i].id} className={`px-6 py-4 text-center ${PLANS[i].highlight ? 'bg-brass/[0.08]' : ''}`}>
                        {has ? <Check className="mx-auto h-5 w-5 text-seaglass" aria-label="Included" /> : <Minus className="mx-auto h-5 w-5 text-mist/40" aria-label="Not included" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      <Faq items={faqs} title="About fees and fares" />
      <CtaBand title="Not sure which plan fits?" body="Start with Essential. You can upgrade to Signature or Atelier at any point before you sail, and the fee is only charged once." />
    </>
  );
}
