import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronDown, Phone } from 'lucide-react';
import { MEGA_MENU, NAV_LINKS } from '../../data/navigation';
import { SITE } from '../../data/site';
import Button from '../ui/Button.jsx';
import { cn } from '../../lib/cn';

const list = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } };
const row = { hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };

export default function MobileMenu({ id, onClose }) {
  const [cruisesOpen, setCruisesOpen] = useState(false);
  return (
    <m.div
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 top-[72px] z-[95] overflow-y-auto bg-white lg:hidden"
    >
      <nav aria-label="Mobile">
        <m.ul variants={list} initial="hidden" animate="show" className="container-x flex flex-col py-6">
          <m.li variants={row} className="border-b border-line">
            <button
              type="button"
              aria-expanded={cruisesOpen}
              onClick={() => setCruisesOpen((v) => !v)}
              className="flex w-full items-center justify-between py-5 font-display text-2xl text-foam"
            >
              {MEGA_MENU.label}
              <ChevronDown className={cn('h-6 w-6 text-mist transition-transform duration-300', cruisesOpen && 'rotate-180')} aria-hidden="true" />
            </button>
            <AnimatePresence initial={false}>
              {cruisesOpen && (
                <m.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  {MEGA_MENU.columns[0].links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} onClick={onClose} className="flex items-center gap-3 py-3 pl-1 text-lg text-foam/85">
                        <l.icon className="h-5 w-5 text-brass" aria-hidden="true" />
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  <li className="pb-4">
                    <Link to="/services#destinations" onClick={onClose} className="block py-3 pl-1 text-lg font-semibold text-brass">
                      All destinations
                    </Link>
                  </li>
                </m.ul>
              )}
            </AnimatePresence>
          </m.li>
          {NAV_LINKS.map((l) => (
            <m.li key={l.to} variants={row} className="border-b border-line">
              <NavLink
                to={l.to}
                onClick={onClose}
                className={({ isActive }) => cn('block py-5 font-display text-2xl', isActive ? 'text-brass' : 'text-foam')}
              >
                {l.label}
              </NavLink>
            </m.li>
          ))}
          <m.li variants={row} className="mt-8 flex flex-col gap-3">
            <Button to="/contact" size="lg" onClick={onClose} className="w-full">Plan my voyage</Button>
            <Button href={SITE.phoneHref} variant="secondary" size="lg" iconLeft={Phone} className="w-full">{SITE.phone}</Button>
            <p className="mt-2 text-center text-sm text-mist">{SITE.hours}</p>
          </m.li>
        </m.ul>
      </nav>
    </m.div>
  );
}
