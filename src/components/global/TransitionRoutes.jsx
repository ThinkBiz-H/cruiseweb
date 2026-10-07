import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { scrollToTarget } from '../../lib/smoothScroll';
import { ROUTES } from '../../app/routes.jsx';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';
import { LogoMark } from '../ui/Logo.jsx';

function RouteFallback() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center" role="status" aria-live="polite">
      <span className="sr-only">Loading page</span>
      <span className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-brass" />
    </div>
  );
}

/**
 * GSAP curtain transition: the tide rises over the old page, the route swaps
 * underneath, then the tide drains away to reveal the new page.
 */
export default function TransitionRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const curtainRef = useRef(null);
  const markRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  const shownRef = useRef(location);

  useEffect(() => {
    const shown = shownRef.current;
    const swap = () => {
      shownRef.current = location;
      setDisplayLocation(location);
    };

    if (location.pathname === shown.pathname) {
      if (location.key !== shown.key) swap();
      return undefined;
    }
    if (reduced) {
      swap();
      return undefined;
    }

    const curtain = curtainRef.current;
    const tl = gsap.timeline();
    tl.set(curtain, { display: 'flex', yPercent: 100 })
      .to(curtain, { yPercent: 0, duration: 0.55, ease: 'power4.inOut' })
      .fromTo(markRef.current, { autoAlpha: 0, scale: 0.85 }, { autoAlpha: 1, scale: 1, duration: 0.3 }, '-=0.2')
      .add(swap)
      .to(markRef.current, { autoAlpha: 0, duration: 0.2 }, '+=0.15')
      .to(curtain, { yPercent: -100, duration: 0.6, ease: 'power4.inOut' }, '<')
      .set(curtain, { display: 'none' });

    return () => {
      tl.kill();
      gsap.set(curtain, { display: 'none' });
    };
  }, [location, reduced]);

  // After the visible route changes: reset scroll, honour #hash, refresh triggers, move focus.
  useLayoutEffect(() => {
    const { hash } = displayLocation;
    if (hash) {
      const id = decodeURIComponent(hash.slice(1));
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) scrollToTarget(el);
      }, 120);
      return () => clearTimeout(t);
    }
    scrollToTarget(0, { immediate: true });
    document.getElementById('main')?.focus({ preventScroll: true });
    const r = setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => clearTimeout(r);
  }, [displayLocation]);

  return (
    <>
      <div
        ref={curtainRef}
        aria-hidden="true"
        className="fixed inset-0 z-[120] hidden items-center justify-center bg-deep"
        style={{ display: 'none' }}
      >
        <svg className="absolute -top-16 left-0 h-16 w-full text-deep" viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path fill="currentColor" d="M0 64V32c120 0 120-24 240-24s120 24 240 24 120-24 240-24 120 24 240 24 120-24 240-24 120 24 240 24v32z" />
        </svg>
        <svg className="absolute -bottom-16 left-0 h-16 w-full rotate-180 text-deep" viewBox="0 0 1440 64" preserveAspectRatio="none">
          <path fill="currentColor" d="M0 64V32c120 0 120-24 240-24s120 24 240 24 120-24 240-24 120 24 240 24 120-24 240-24 120 24 240 24v32z" />
        </svg>
        <div ref={markRef} className="flex flex-col items-center gap-4">
          <LogoMark className="h-14 w-14" />
          <span className="font-display text-xl text-foam">Maristella</span>
        </div>
      </div>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={displayLocation}>
          {ROUTES.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Routes>
      </Suspense>
    </>
  );
}
