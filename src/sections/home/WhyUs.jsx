import { Check, X } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading.jsx';
import Button from '../../components/ui/Button.jsx';
import { Reveal, Stagger, StaggerItem } from '../../components/ui/Reveal.jsx';
import { LogoMark } from '../../components/ui/Logo.jsx';
import { COMPARISON } from '../../data/content';

const NoMark = () => (
  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-mist" aria-hidden="true">
    <X className="h-3 w-3" strokeWidth={3} />
  </span>
);
const YesMark = () => (
  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brass text-white" aria-hidden="true">
    <Check className="h-3 w-3" strokeWidth={3} />
  </span>
);

function MobileComparison() {
  return (
    <Stagger as="ul" className="mt-12 space-y-4 sm:hidden" aria-label="Booking yourself compared with booking through Maristella">
      {COMPARISON.map((row) => (
        <StaggerItem as="li" key={row.label} className="card overflow-hidden">
          <p className="px-5 pt-4 font-sans text-sm font-bold text-foam">{row.label}</p>
          <dl className="mt-3 grid grid-cols-2 border-t border-line text-sm">
            <div className="p-4">
              <dt className="text-xs font-bold tracking-wide text-mist/80 uppercase">Yourself</dt>
              <dd className="mt-1.5 flex gap-2 text-mist"><NoMark />{row.self}</dd>
            </div>
            <div className="bg-brass/[0.06] p-4">
              <dt className="text-xs font-bold tracking-wide text-brass uppercase">Maristella</dt>
              <dd className="mt-1.5 flex gap-2 font-medium text-foam"><YesMark />{row.us}</dd>
            </div>
          </dl>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

export default function WhyUs() {
  return (
    <section className="section-y relative bg-white" aria-labelledby="why-title">
      <div className="container-x">
        <SectionHeading
          id="why-title"
          align="center"
          eyebrow="Why choose us"
          title="Why book through us, not direct?"
          intro="The price is the same. Everything around it isn’t."
        />
        <MobileComparison />
        <Reveal className="card mx-auto mt-14 hidden max-w-5xl overflow-hidden sm:block">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">Booking a cruise yourself compared with booking through Maristella</caption>
            <thead>
              <tr className="bg-deep">
                <th scope="col" className="w-1/3 px-5 py-6 text-sm font-medium text-mist sm:px-8"><span className="sr-only">What matters</span></th>
                <th scope="col" className="px-5 py-6 font-sans text-sm font-bold text-foam/70 sm:px-8 sm:text-base">Booking it yourself</th>
                <th scope="col" className="relative bg-brass px-5 py-6 font-sans text-sm font-bold text-white sm:px-8 sm:text-base">
                  <span className="flex items-center gap-2.5"><LogoMark className="h-7 w-7 rounded-lg ring-2 ring-white/40" />With Maristella</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.label} className="group border-t border-line transition-colors hover:bg-deep/70">
                  <th scope="row" className="px-5 py-5 align-top font-sans text-sm font-bold text-foam sm:px-8 sm:text-base">{row.label}</th>
                  <td className="px-5 py-5 align-top text-sm text-mist sm:px-8 sm:text-base">
                    <span className="flex gap-3"><NoMark />{row.self}</span>
                  </td>
                  <td className="bg-brass/[0.05] px-5 py-5 align-top text-sm font-medium text-foam transition-colors group-hover:bg-brass/[0.09] sm:px-8 sm:text-base">
                    <span className="flex gap-3"><YesMark />{row.us}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Button to="/contact" size="lg">Talk to a planner — it’s free</Button>
        </Reveal>
      </div>
    </section>
  );
}
