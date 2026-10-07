import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { wavePath } from '../illustrations/svgUtils';

const EASE = [0.22, 1, 0.36, 1];

/** Inner-page hero: breadcrumb, large title, intro and a slow swell along the bottom edge. */
export default function PageHero({ title, intro, crumbs = [], children }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-tide via-[#f3f8fe] to-white pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-reef/70 blur-[120px] animate-float-slow" />
        <div className="absolute top-20 left-[-8%] h-80 w-80 rounded-full bg-brass/10 blur-[100px] animate-float" />
        <svg className="absolute bottom-0 left-0 h-24 w-[200%] max-w-none animate-swell text-white" viewBox="0 0 2880 96" preserveAspectRatio="none">
          <path fill="currentColor" d={wavePath({ y: 48, amp: 12, wavelength: 480, width: 2880, bottom: 96 })} />
        </svg>
      </div>
      <div className="container-x relative">
        {crumbs.length > 0 && (
          <m.nav aria-label="Breadcrumb" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}>
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-mist">
              <li><Link to="/" className="hover:text-foam">Home</Link></li>
              {crumbs.map((c, i) => (
                <li key={c.name} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden="true" />
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="font-semibold text-brass">{c.name}</span>
                  ) : (
                    <Link to={c.path} className="hover:text-foam">{c.name}</Link>
                  )}
                </li>
              ))}
            </ol>
          </m.nav>
        )}
        <m.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
          className="mt-6 max-w-4xl text-[2.5rem] leading-[1.06] font-extrabold tracking-[-0.035em] text-foam sm:text-6xl lg:text-[4.25rem]"
        >
          {title}
        </m.h1>
        {intro && (
          <m.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-mist sm:text-xl"
          >
            {intro}
          </m.p>
        )}
        {children}
      </div>
    </section>
  );
}
