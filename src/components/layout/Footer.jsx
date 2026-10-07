import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BadgePercent, Check, Headphones, Mail, MapPin, Phone, Send, ShieldCheck, Ship } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import SocialIcons from '../ui/SocialIcons.jsx';
import { Reveal } from '../ui/Reveal.jsx';
import { FOOTER_COLUMNS } from '../../data/navigation';
import { SITE } from '../../data/site';

const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

const TRUST = [
  { icon: BadgePercent, label: 'No booking fee', note: 'Same fare as direct' },
  { icon: ShieldCheck, label: 'Protected payments', note: 'Audited trust account' },
  { icon: Headphones, label: '24/7 at-sea support', note: 'A real person, always' },
  { icon: Ship, label: '40+ cruise lines', note: 'Independent advice' },
];

/** Newsletter call-to-action band. Submission logic is unchanged from the original footer form. */
function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle'); // idle | sending | done | error

  const submit = async (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) { setState('error'); return; }
    setState('sending');
    try {
      if (NEWSLETTER_ENDPOINT) {
        const res = await fetch(NEWSLETTER_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ email }) });
        if (!res.ok) throw new Error('Request failed');
      } else {
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent('Subscribe: Fare drops')}&body=${encodeURIComponent(`Please add ${email} to the fare-drop list.`)}`;
      }
      setState('done');
      setEmail('');
    } catch {
      setState('error');
    }
  };

  return (
    <Reveal className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(120deg,#0A3F94_0%,#0B5ED7_50%,#2F80ED_100%)] px-6 py-10 shadow-lift sm:px-12 sm:py-14">
      <div aria-hidden="true" className="absolute -top-20 -right-10 h-72 w-72 rounded-full bg-white/10 blur-[70px]" />
      <div aria-hidden="true" className="absolute -bottom-24 left-10 h-60 w-96 rounded-full bg-cyan-300/20 blur-[80px]" />
      <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-bold tracking-[0.14em] text-white uppercase">
            <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Newsletter
          </span>
          <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">Fare drops, first.</h2>
          <p className="mt-3 max-w-md leading-relaxed text-white/80">One email a fortnight with sailings that just fell in price. No spam, unsubscribe in one click.</p>
        </div>
        <form onSubmit={submit} noValidate className="w-full">
          <label htmlFor="newsletter-email" className="sr-only">Email address</label>
          <div className="flex flex-col gap-2 rounded-2xl bg-white p-2 shadow-lift sm:flex-row sm:items-center">
            <input
              id="newsletter-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (state === 'error') setState('idle'); }}
              aria-invalid={state === 'error'}
              aria-describedby="newsletter-status"
              placeholder="you@example.com"
              className="h-12 min-w-0 flex-1 rounded-xl bg-transparent px-4 text-foam placeholder:text-mist/70 focus:outline-none"
            />
            <button
              type="submit"
              disabled={state === 'sending'}
              className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brass px-6 text-sm font-bold text-white shadow-blue transition-all hover:-translate-y-0.5 hover:bg-brass-deep disabled:opacity-60"
            >
              {state === 'done' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Send className="h-4 w-4" aria-hidden="true" />}
              {state === 'done' ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
          <p id="newsletter-status" role="status" className="mt-3 min-h-5 pl-2 text-sm">
            {state === 'error' && <span className="font-semibold text-white">Enter a valid email address, like name@example.com.</span>}
            {state === 'done' && <span className="font-semibold text-white">You’re on the list. The next issue lands in your inbox soon.</span>}
          </p>
        </form>
      </div>
    </Reveal>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>

      {/* Newsletter band straddles the page and the navy footer */}
      <div className="bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_50%,#0b1f3a_50%,#0b1f3a_100%)] pt-8">
        <div className="container-x">
          <Newsletter />
        </div>
      </div>

      <div className="relative overflow-hidden bg-[#0b1f3a] text-white/70">
        <div aria-hidden="true" className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brass/20 blur-[120px]" />
        <div className="container-x relative pt-16 pb-24 sm:pb-10">
          <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:bg-white/[0.07]">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brass text-white">
                  <t.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold text-white">{t.label}</span>
                  <span className="block text-xs text-white/60">{t.note}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Logo tone="light" />
              <p className="mt-6 max-w-sm leading-relaxed">
                An independent cruise concierge. We compare sailings across more than 40 lines and look after every detail from the first call to the trip home.
              </p>
              <SocialIcons tone="light" className="mt-7" />
            </div>
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title}>
                  <h3 className="font-sans text-sm font-bold tracking-[0.12em] text-white uppercase">{col.title}</h3>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((l) => (
                      <li key={l.label}>
                        {l.href ? (
                          <a href={l.href} className="text-[0.95rem] transition-colors hover:text-white">{l.label}</a>
                        ) : (
                          <Link to={l.to} className="text-[0.95rem] transition-colors hover:text-white">{l.label}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="lg:col-span-3">
              <h3 className="font-sans text-sm font-bold tracking-[0.12em] text-white uppercase">Talk to a planner</h3>
              <ul className="mt-5 space-y-4 text-[0.95rem]">
                <li>
                  <a href={SITE.phoneHref} className="group inline-flex items-center gap-3 transition-colors hover:text-white">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors group-hover:bg-brass"><Phone className="h-4 w-4" aria-hidden="true" /></span>
                    {SITE.phone}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${SITE.email}`} className="group inline-flex items-center gap-3 transition-colors hover:text-white">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white transition-colors group-hover:bg-brass"><Mail className="h-4 w-4" aria-hidden="true" /></span>
                    {SITE.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-white"><MapPin className="h-4 w-4" aria-hidden="true" /></span>
                  <address className="pt-1.5 not-italic">{SITE.address.street}, {SITE.address.city}, {SITE.address.region} {SITE.address.postal}</address>
                </li>
              </ul>
              <p className="mt-5 text-sm text-white/50">{SITE.hours}</p>
            </div>
          </div>

          <div className="mt-16 h-px bg-white/10" />
          <p className="mt-8 max-w-4xl text-xs leading-relaxed text-white/45">
            Maristella Voyages is an independent travel agency and is not owned by, or acting on behalf of, any cruise line. Ship names and fares
            shown are examples; prices, itineraries and availability change and are confirmed only at booking, subject to each supplier’s terms.
          </p>
          <div className="mt-6 flex flex-col-reverse items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="text-sm text-white/55">© {year} Maristella Voyages LLC. All rights reserved.</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <li><Link to="/privacy-policy" className="hover:text-white">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
              <li><a href="/sitemap.xml" className="hover:text-white">Sitemap</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
