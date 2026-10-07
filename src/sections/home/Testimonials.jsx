import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading.jsx';
import SceneArt from '../../components/illustrations/SceneArt.jsx';
import { Reveal } from '../../components/ui/Reveal.jsx';
import { TESTIMONIALS } from '../../data/content';
import { cn } from '../../lib/cn';

const AUTOPLAY_MS = 7000;
const SCENES = ['fjord', 'polar', 'river', 'tropic', 'harbour'];
const slide = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 80 : -80, filter: 'blur(6px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -80 : 80, filter: 'blur(6px)', transition: { duration: 0.4 } }),
};

export default function Testimonials() {
  const [[index, dir], setState] = useState([0, 1]);
  const [paused, setPaused] = useState(false);
  const timer = useRef(null);
  const total = TESTIMONIALS.length;
  const t = TESTIMONIALS[index];

  const go = useCallback((step) => setState(([i]) => [(i + step + total) % total, step]), [total]);
  const goTo = (i) => setState(([cur]) => [i, i > cur ? 1 : -1]);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    timer.current = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(timer.current);
  }, [index, paused, go]);

  const navBtn = 'flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-foam shadow-soft transition-all hover:-translate-y-0.5 hover:border-brass hover:bg-brass hover:text-white';

  return (
    <section className="section-y section-alt relative overflow-hidden" aria-labelledby="testimonials-title">
      <div className="container-x relative">
        <SectionHeading id="testimonials-title" align="center" eyebrow="Customer testimonials" title="Postcards from our guests" intro="Rated 4.9 out of 5 across 3,100 post-voyage reviews." />

        <Reveal
          className="relative mx-auto mt-14 max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="card relative grid overflow-hidden md:grid-cols-[2fr_3fr]" aria-roledescription="carousel" aria-label="Guest testimonials">
            <div className="relative hidden md:block" aria-hidden="true">
              <AnimatePresence initial={false}>
                <m.div key={index} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9 }} className="absolute inset-0">
                  <SceneArt scene={SCENES[index % SCENES.length]} className="h-full w-full" />
                </m.div>
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0b1f3a]/80 to-transparent p-6 pt-16">
                <p className="text-sm font-semibold text-white">{t.trip}</p>
              </div>
            </div>

            <div className="relative min-h-[24rem] px-7 py-10 sm:min-h-[22rem] sm:px-12 sm:py-12">
              <Quote aria-hidden="true" className="absolute top-8 right-8 h-16 w-16 fill-brass/[0.08] text-brass/10 sm:h-20 sm:w-20" strokeWidth={1} />
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <m.figure
                  key={index}
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 80) go(info.offset.x < 0 ? 1 : -1); }}
                  className="relative cursor-grab active:cursor-grabbing"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${total}`}
                >
                  <div className="flex gap-1 text-gold" aria-label="Rated 5 out of 5">
                    {Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-5 w-5 fill-current" aria-hidden="true" />)}
                  </div>
                  <blockquote className="mt-6">
                    <p className="text-xl leading-[1.6] font-medium text-foam sm:text-[1.4rem]">“{t.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
                    <span aria-hidden="true" className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#2F80ED] to-brass font-bold text-white shadow-blue">
                      {t.initials}
                    </span>
                    <span>
                      <span className="block font-bold text-foam">{t.name}</span>
                      <span className="block text-sm text-mist">{t.trip}</span>
                    </span>
                  </figcaption>
                </m.figure>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2" role="group" aria-label="Choose testimonial">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Show testimonial from ${item.name}`}
                  aria-current={i === index}
                  className="group flex h-6 items-center"
                >
                  <span className={cn('block h-2 rounded-full transition-all duration-500', i === index ? 'w-10 bg-brass' : 'w-2.5 bg-reef group-hover:bg-mist/50')} />
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className={navBtn}>
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className={navBtn}>
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
          <p className="sr-only" aria-live="polite">{`Testimonial ${index + 1} of ${total}: ${t.name}`}</p>
        </Reveal>
      </div>
    </section>
  );
}
