import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, BellRing, CalendarDays, Compass, MapPin, Search, ShieldCheck, Star, Users } from 'lucide-react';
import { gsap } from '../../lib/gsap';
import OceanScene from '../../components/illustrations/OceanScene.jsx';
import Button from '../../components/ui/Button.jsx';
import { DESTINATIONS } from '../../data/content';
import usePrefersReducedMotion from '../../hooks/usePrefersReducedMotion';

const LINES = ['The sea is the easy part.', 'We handle everything else.'];
const PORTS = ['Barcelona', 'Marseille', 'Portofino', 'Civitavecchia'];

function useNextMonths(count = 12) {
  return useMemo(() => {
    const now = new Date();
    return Array.from({ length: count }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i + 1, 1);
      return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    });
  }, [count]);
}

function PlannerBar() {
  const navigate = useNavigate();
  const months = useNextMonths();
  const [form, setForm] = useState({ destination: '', month: '', guests: '2' });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(Object.entries(form).filter(([, v]) => v));
    navigate(`/contact?${params.toString()}#enquiry`);
  };

  const fieldWrap = 'flex min-w-0 flex-1 md:flex-[1_1_0] items-center gap-3 rounded-2xl px-4 py-3 transition-colors hover:bg-deep focus-within:bg-deep';
  const labelCls = 'block text-[0.7rem] font-bold tracking-[0.12em] text-mist uppercase';
  const selectCls = 'w-full min-w-0 cursor-pointer appearance-none bg-transparent text-[0.95rem] font-semibold text-foam focus:outline-none';
  const iconCls = 'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brass/[0.08] text-brass';

  return (
    <form onSubmit={submit} data-hero-fade className="mt-10 flex flex-col gap-1 rounded-[20px] border border-line bg-white p-2 shadow-lift md:flex-row md:items-center" aria-label="Find a sailing">
      <div className={fieldWrap}>
        <span className={iconCls}><MapPin className="h-5 w-5" aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <label htmlFor="hero-destination" className={labelCls}>Where</label>
          <select id="hero-destination" value={form.destination} onChange={set('destination')} className={selectCls}>
            <option value="">Anywhere</option>
            {DESTINATIONS.map((d) => <option key={d.name} value={d.name}>{d.name}</option>)}
          </select>
        </div>
      </div>
      <span className="hidden h-10 w-px bg-line md:block" aria-hidden="true" />
      <div className={fieldWrap}>
        <span className={iconCls}><CalendarDays className="h-5 w-5" aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <label htmlFor="hero-month" className={labelCls}>When</label>
          <select id="hero-month" value={form.month} onChange={set('month')} className={selectCls}>
            <option value="">I’m flexible</option>
            {months.map((mo) => <option key={mo} value={mo}>{mo}</option>)}
          </select>
        </div>
      </div>
      <span className="hidden h-10 w-px bg-line md:block" aria-hidden="true" />
      <div className={fieldWrap}>
        <span className={iconCls}><Users className="h-5 w-5" aria-hidden="true" /></span>
        <div className="min-w-0 flex-1">
          <label htmlFor="hero-guests" className={labelCls}>Who</label>
          <select id="hero-guests" value={form.guests} onChange={set('guests')} className={selectCls}>
            {['1', '2', '3', '4', '5', '6', '8+'].map((g) => <option key={g} value={g}>{g} {g === '1' ? 'guest' : 'guests'}</option>)}
          </select>
        </div>
      </div>
      <Button type="submit" size="lg" iconLeft={Search} className="rounded-2xl md:ml-1">Find sailings</Button>
    </form>
  );
}

function VoyageCard() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div data-float className="animate-float rounded-[20px] border border-line bg-white p-6 shadow-lift">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-mist">Shortlist pick · 7 nights</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight text-foam">Riviera & Rome</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Held 72h</span>
        </div>
        <ol className="relative mt-6 space-y-4 pl-6">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-brass via-brass/40 to-brass/0" />
          {PORTS.map((p, i) => (
            <li key={p} className="relative flex items-center justify-between text-[0.95rem]">
              <span aria-hidden="true" className={`absolute -left-6 h-[15px] w-[15px] rounded-full border-2 ${i === 0 ? 'border-brass bg-brass' : 'border-brass/40 bg-white'}`} />
              <span className="font-medium text-foam">{p}</span>
              <span className="text-sm text-mist">{['Sat', 'Sun', 'Mon', 'Wed'][i]}</span>
            </li>
          ))}
        </ol>
        <div className="mt-6 grid grid-cols-2 gap-3 border-t border-line pt-5 text-sm">
          <div>
            <p className="text-mist">Cabin</p>
            <p className="mt-0.5 font-bold text-foam">9214 · Midship balcony</p>
          </div>
          <div className="text-right">
            <p className="text-mist">Total for two</p>
            <p className="mt-0.5 text-lg font-extrabold text-brass">$3,486</p>
          </div>
        </div>
      </div>

      <div data-float className="animate-float-slow absolute -bottom-20 -left-10 hidden w-64 items-center gap-3 rounded-2xl border border-line bg-white p-4 shadow-lift lg:flex" style={{ animationDelay: '-3s' }}>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brass text-white">
          <BellRing className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="text-sm">
          <p className="font-bold text-foam">Fare dropped $180</p>
          <p className="text-mist">Rebooked at the new price</p>
        </div>
      </div>

      <div data-float className="absolute -top-8 -right-6 hidden items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm shadow-card lg:flex animate-float" style={{ animationDelay: '-1.5s' }}>
        <Compass className="h-4 w-4 text-brass" aria-hidden="true" />
        <span className="font-medium text-foam">Starboard side for the coast</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const root = useRef(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reduced) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'power4.out' } });
      tl.from('[data-word]', { yPercent: 110, rotate: 4, duration: 1.1, stagger: 0.06 })
        .from('[data-hero-fade]', { autoAlpha: 0, y: 24, duration: 0.9, stagger: 0.1 }, '-=0.8')
        .from('[data-float]', { autoAlpha: 0, filter: 'blur(10px)', duration: 1.1, stagger: 0.14, clearProps: 'filter' }, '-=0.9');

      if (window.__maristellaLoading) {
        const go = () => tl.play();
        window.addEventListener('maristella:ready', go, { once: true });
        return () => window.removeEventListener('maristella:ready', go);
      }
      tl.play();
      return undefined;
    }, root);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section ref={root} className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24 lg:pt-32" aria-labelledby="hero-title">
      <OceanScene reduced={reduced} />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.95)_0%,rgba(255,255,255,0.78)_40%,rgba(255,255,255,0)_72%)] max-lg:bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.75)_60%,rgba(255,255,255,0.2)_100%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p data-hero-fade className="inline-flex items-center gap-2 rounded-full border border-line bg-white/90 py-1.5 pr-4 pl-1.5 text-sm font-semibold text-foam shadow-soft">
            <span className="rounded-full bg-brass px-2.5 py-0.5 text-xs font-bold text-white">40+ lines</span>
            Independent cruise concierge · No booking fee
          </p>
          <h1 id="hero-title" className="mt-6 text-[2.6rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-foam sm:text-6xl lg:text-[4rem] xl:text-[4.4rem]">
            {LINES.map((line, li) => (
              <span key={line} className="block">
                {line.split(' ').map((w, wi) => (
                  <span key={wi} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <span data-word className={`inline-block ${li === 1 ? 'text-brassy' : 'text-foam'}`}>{w}&nbsp;</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p data-hero-fade className="mt-6 max-w-xl text-lg leading-relaxed text-mist sm:text-xl">
            Maristella is an independent cruise concierge. Tell us where and when — we compare sailings across 40+ lines, hold the right cabin and plan every port day.
          </p>
          <div data-hero-fade className="mt-9 flex flex-wrap items-center gap-3">
            <Button to="/contact" size="lg" icon={ArrowRight}>Plan my voyage</Button>
            <Button to="/services#destinations" variant="secondary" size="lg">See destinations</Button>
          </div>
          <PlannerBar />
          <ul data-hero-fade className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-foam/80">
            <li className="flex items-center gap-2">
              <span className="flex text-gold" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</span>
              4.9/5 from 3,100 reviews
            </li>
            <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brass" aria-hidden="true" />Protected payments</li>
            <li className="flex items-center gap-2"><BellRing className="h-4 w-4 text-brass" aria-hidden="true" />Fare watch included</li>
          </ul>
        </div>
        <div className="hidden md:block lg:col-span-5">
          <VoyageCard />
        </div>
      </div>
    </section>
  );
}
