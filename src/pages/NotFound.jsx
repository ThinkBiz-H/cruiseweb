import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowLeft, Compass } from 'lucide-react';
import Seo from '../components/global/Seo.jsx';
import Button from '../components/ui/Button.jsx';

const LINKS = [
  { label: 'Cruise types', to: '/services' },
  { label: 'Concierge plans', to: '/pricing' },
  { label: 'Journal', to: '/blog' },
  { label: 'Contact a planner', to: '/contact' },
];

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" description="This page has drifted off course. Head back to the Maristella homepage or contact a planner." noindex />
      <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
        <div aria-hidden="true" className="pointer-events-none absolute top-1/2 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-reef/30 blur-[140px]" />
        <div className="container-x relative text-center">
          <m.div
            aria-hidden="true"
            className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-line text-brass glass"
            animate={{ rotate: [0, 40, -30, 20, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Compass className="h-14 w-14" strokeWidth={1.2} />
          </m.div>
          <p className="mt-10 font-display text-[7rem] leading-none text-brass/10 sm:text-[11rem]" aria-hidden="true">404</p>
          <h1 className="text-moonlit -mt-12 text-4xl sm:-mt-20 sm:text-6xl">This page has drifted off course</h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-mist">The link may be old or mistyped. Try one of these, or head back to the homepage.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Button to="/" iconLeft={ArrowLeft}>Back to homepage</Button>
            <Button to="/contact" variant="secondary">Contact a planner</Button>
          </div>
          <ul className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm">
            {LINKS.map((l) => (
              <li key={l.to}><Link to={l.to} className="text-mist underline-offset-4 hover:text-foam hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
