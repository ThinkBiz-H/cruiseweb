import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { MEGA_MENU } from '../../data/navigation';
import { preloadRoute } from '../../app/routes.jsx';
import SceneArt from '../illustrations/SceneArt.jsx';

const panel = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.03, delayChildren: 0.05 } },
  exit: { opacity: 0, y: 8, scale: 0.985, transition: { duration: 0.2 } },
};
const item = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0, transition: { duration: 0.3 } } };

export default function MegaMenu({ id, onNavigate, onMouseEnter, onMouseLeave }) {
  const [types, places] = MEGA_MENU.columns;
  return (
    <m.div
      id={id}
      variants={panel}
      initial="hidden"
      animate="show"
      exit="exit"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-1/2 mt-1 w-[min(94vw,980px)] -translate-x-1/2 before:absolute before:inset-x-0 before:-top-3 before:h-3"
    >
      <div className="grid grid-cols-12 gap-2 rounded-[20px] border border-line bg-white p-3 shadow-[0_30px_80px_-20px_rgba(11,31,58,0.28)]">
        <div className="col-span-6 p-3">
          <p className="mb-2 px-3 text-sm font-medium text-mist">{types.title}</p>
          <ul className="grid grid-cols-1 gap-0.5">
            {types.links.map((l) => (
              <m.li key={l.label} variants={item}>
                <Link
                  to={l.to}
                  onClick={onNavigate}
                  onMouseEnter={() => preloadRoute(l.to)}
                  className="group flex items-start gap-3.5 rounded-2xl px-3 py-2.5 transition-colors hover:bg-deep"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brass/[0.08] text-brass transition-all duration-300 group-hover:bg-brass group-hover:text-white">
                    <l.icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-foam">{l.label}</span>
                    <span className="block text-sm text-mist">{l.note}</span>
                  </span>
                </Link>
              </m.li>
            ))}
          </ul>
        </div>
        <div className="col-span-3 border-l border-line p-3">
          <p className="mb-2 px-3 text-sm font-medium text-mist">{places.title}</p>
          <ul>
            {places.links.map((l) => (
              <m.li key={l.label} variants={item}>
                <Link
                  to={l.to}
                  onClick={onNavigate}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[0.95rem] text-foam/90 transition-colors hover:bg-deep hover:text-foam"
                >
                  <l.icon className="h-4 w-4 text-mist" aria-hidden="true" />
                  {l.label}
                </Link>
              </m.li>
            ))}
          </ul>
        </div>
        <m.div variants={item} className="col-span-3">
          <Link
            to={MEGA_MENU.feature.to}
            onClick={onNavigate}
            className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-line"
          >
            <SceneArt scene="sunset" className="h-36 w-full transition-transform duration-700 ease-[var(--ease-tide)] group-hover:scale-105" />
            <div className="flex flex-1 flex-col bg-deep p-4">
              <p className="font-display text-lg leading-snug text-foam">{MEGA_MENU.feature.title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-mist">{MEGA_MENU.feature.body}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-brass">
                {MEGA_MENU.feature.cta}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        </m.div>
      </div>
    </m.div>
  );
}
