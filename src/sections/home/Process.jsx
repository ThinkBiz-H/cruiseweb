import { useLayoutEffect, useRef } from 'react';
import { gsap } from '../../lib/gsap';
import SectionHeading from '../../components/ui/SectionHeading.jsx';
import Button from '../../components/ui/Button.jsx';
import { PROCESS } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

/** Scroll-driven timeline: the line fills as you read, each step lights up when reached. */
export default function Process({ showCta = true }) {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo('[data-line]', { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '[data-steps]', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      });
      gsap.utils.toArray('[data-step]').forEach((step) => {
        const dot = step.querySelector('[data-dot]');
        gsap.from(step.querySelector('[data-body]'), {
          autoAlpha: 0, x: 40, duration: 0.9,
          scrollTrigger: { trigger: step, start: 'top 80%', once: true },
        });
        gsap.fromTo(dot, { scale: 0.75, backgroundColor: '#FFFFFF', color: '#55657C' }, {
          scale: 1, backgroundColor: '#0B5ED7', color: '#FFFFFF', duration: 0.4,
          scrollTrigger: { trigger: step, start: 'top 62%', toggleActions: 'play none none reverse' },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="section-y relative overflow-x-clip" aria-labelledby="process-title">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="process-title"
              eyebrow="How booking works"
              title="From first call to final night"
              intro="Five steps, one planner. Most guests have a confirmed cabin within three days of saying hello."
            />
            {showCta && <Button to="/contact" className="mt-9">Start with step one</Button>}
          </div>
        </div>
        <ol data-steps className="relative lg:col-span-7">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[23px] w-0.5 rounded-full bg-line" />
          <span data-line aria-hidden="true" className="absolute top-2 bottom-2 left-[23px] w-0.5 origin-top rounded-full bg-gradient-to-b from-brass via-brass/70 to-brass/20" />
          {PROCESS.map((s, i) => (
            <li key={s.title} data-step className="relative flex gap-5 pb-6 last:pb-0 sm:gap-7">
              <span data-dot className="relative z-10 mt-5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-brass/25 bg-brass text-lg font-extrabold text-white shadow-soft">
                {i + 1}
              </span>
              <div data-body className="card card-lift min-w-0 flex-1 p-6 sm:p-7">
                <p className="inline-flex rounded-full bg-brass/[0.08] px-3 py-1 text-xs font-bold text-brass">{s.time}</p>
                <h3 className="mt-3 text-xl font-extrabold text-foam sm:text-2xl">{s.title}</h3>
                <p className="mt-2.5 max-w-lg leading-relaxed text-mist">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
