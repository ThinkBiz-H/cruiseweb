import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from '../../lib/gsap';
import { LogoMark } from '../ui/Logo.jsx';

const KEY = 'maristella:loaded';

const shouldShow = () => {
  const show = shouldShowInner();
  if (typeof window !== "undefined") window.__maristellaLoading = show;
  return show;
};

const shouldShowInner = () => {
  if (typeof window === 'undefined') return false;
  try {
    if (sessionStorage.getItem(KEY)) return false;
  } catch { /* storage unavailable */ }
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/** First-visit splash: a short GSAP sequence (≈1.1s), shown once per session. */
export default function Loader() {
  const [visible, setVisible] = useState(shouldShow);
  const root = useRef(null);

  useLayoutEffect(() => {
    if (!visible) return undefined;
    const ctx = gsap.context(() => {
      const count = { v: 0 };
      const label = root.current.querySelector('[data-count]');
      const tl = gsap.timeline({
        onComplete: () => {
          try { sessionStorage.setItem(KEY, '1'); } catch { /* ignore */ }
          window.__maristellaLoading = false;
          setVisible(false);
          window.dispatchEvent(new Event('maristella:ready'));
        },
      });
      tl.from('[data-mark]', { scale: 0.6, autoAlpha: 0, duration: 0.5, ease: 'back.out(1.6)' })
        .from('[data-word]', { yPercent: 110, duration: 0.55, ease: 'power4.out' }, '-=0.25')
        .to(count, { v: 100, duration: 0.7, ease: 'power2.inOut', onUpdate: () => { label.textContent = `${Math.round(count.v)}`; } }, '<')
        .to('[data-bar]', { scaleX: 1, duration: 0.7, ease: 'power2.inOut' }, '<')
        .to(root.current, { yPercent: -100, duration: 0.7, ease: 'power4.inOut' }, '+=0.05');
    }, root);
    return () => ctx.revert();
  }, [visible]);

  if (!visible) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-abyss" aria-hidden="true">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(11,94,215,0.10),transparent_70%)]" />
      <div data-mark className="relative">
        <LogoMark className="h-16 w-16" />
      </div>
      <div className="relative mt-5 overflow-hidden">
        <span data-word className="block font-display text-3xl text-foam">Maristella</span>
      </div>
      <div className="relative mt-8 h-px w-40 overflow-hidden bg-line">
        <span data-bar className="absolute inset-0 origin-left scale-x-0 bg-gradient-to-r from-[#2F80ED] to-brass" />
      </div>
      <span data-count className="relative mt-3 text-xs tabular-nums text-mist">0</span>
    </div>
  );
}
