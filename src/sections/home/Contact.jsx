import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { CircleCheck, Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading.jsx';
import Button from '../../components/ui/Button.jsx';
import { Reveal } from '../../components/ui/Reveal.jsx';
import { DESTINATIONS, PLANS } from '../../data/content';
import { SITE } from '../../data/site';

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT;

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = 'Enter your name so your planner knows who to ask for.';
  if (!v.email.trim()) e.email = 'Enter an email address for your shortlist.';
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = 'Enter an email in the format name@example.com.';
  if (v.phone && !/^[+()\d\s.-]{7,}$/.test(v.phone)) e.phone = 'Use digits, spaces and an optional + country code.';
  if (v.message.trim().length < 10) e.message = 'Add a sentence or two — dates, who’s travelling, anything you already know.';
  if (!v.consent) e.consent = 'Tick the box so we can contact you about this enquiry.';
  return e;
};

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-semibold text-foam">
        {label}
        {optional && <span className="text-xs font-normal text-mist">Optional</span>}
      </label>
      {children}
      <p id={`${id}-error`} className="mt-1.5 min-h-5 text-sm text-coral" aria-live="polite">{error}</p>
    </div>
  );
}

export default function Contact({ showHeading = true }) {
  const [params] = useSearchParams();
  const initial = useMemo(() => ({
    name: '', email: '', phone: '',
    destination: params.get('destination') || '',
    month: params.get('month') || '',
    guests: params.get('guests') || '2',
    plan: params.get('plan') || 'essential',
    message: '',
    consent: false,
  }), [params]);

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | failed

  // Pick up new query params (e.g. from the hero planner) while already on this page.
  useEffect(() => {
    setValues((v) => ({
      ...v,
      destination: params.get('destination') ?? v.destination,
      month: params.get('month') ?? v.month,
      guests: params.get('guests') ?? v.guests,
      plan: params.get('plan') ?? v.plan,
    }));
  }, [params]);

  const set = (k) => (e) => {
    const val = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setValues((v) => ({ ...v, [k]: val }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      if (ENDPOINT) {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, source: window.location.href }),
        });
        if (!res.ok) throw new Error('Request failed');
      } else {
        const body = Object.entries(values).filter(([k]) => k !== 'consent').map(([k, v]) => `${k}: ${v}`).join('\n');
        window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Voyage enquiry — ${values.name}`)}&body=${encodeURIComponent(body)}`;
      }
      setStatus('sent');
    } catch {
      setStatus('failed');
    }
  };

  const err = (k) => ({ 'aria-invalid': Boolean(errors[k]), 'aria-describedby': `contact-${k}-error` });

  return (
    <section id="enquiry" className="section-y relative scroll-mt-24" aria-labelledby="contact-title">
      <div className="container-x grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {showHeading ? (
            <SectionHeading id="contact-title" eyebrow="Get in touch" title="Start with a conversation" intro="Share what you know so far. A planner replies within the hour with first ideas, and sends a full shortlist within a day." />
          ) : (
            <h2 id="contact-title" className="sr-only">Send an enquiry</h2>
          )}
          <Reveal delay={0.1} className="mt-10 space-y-4">
            {[
              { icon: Phone, label: 'Call a planner', value: SITE.phone, href: SITE.phoneHref },
              { icon: Mail, label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: Clock, label: 'Hours', value: SITE.hours },
              { icon: MapPin, label: 'Office', value: `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region}` },
            ].map((c) => (
              <div key={c.label} className="card card-lift flex items-center gap-4 rounded-2xl p-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brass/[0.08] text-brass">
                  <c.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-mist">{c.label}</span>
                  {c.href ? (
                    <a href={c.href} className="block truncate font-semibold text-foam hover:text-brass">{c.value}</a>
                  ) : (
                    <span className="block font-semibold text-foam">{c.value}</span>
                  )}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="glass-strong relative overflow-hidden rounded-[20px] border-t-4 border-t-brass p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {status === 'sent' ? (
                <m.div key="sent" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex min-h-[32rem] flex-col items-center justify-center text-center" role="status">
                  <m.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }} className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CircleCheck className="h-10 w-10" aria-hidden="true" />
                  </m.span>
                  <h3 className="mt-7 font-display text-3xl text-foam">Enquiry sent</h3>
                  <p className="mt-3 max-w-sm leading-relaxed text-mist">Thanks, {values.name.split(' ')[0]}. A planner will reply to {values.email} within the hour during office hours, or first thing next morning.</p>
                  <Button variant="secondary" className="mt-8" onClick={() => { setValues(initial); setStatus('idle'); }}>Send another enquiry</Button>
                </m.div>
              ) : (
                <m.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={submit} noValidate className="grid gap-x-5 gap-y-1 sm:grid-cols-2">
                  <Field id="contact-name" label="Full name" error={errors.name}>
                    <input id="contact-name" className="field" autoComplete="name" value={values.name} onChange={set('name')} {...err('name')} />
                  </Field>
                  <Field id="contact-email" label="Email" error={errors.email}>
                    <input id="contact-email" type="email" className="field" autoComplete="email" value={values.email} onChange={set('email')} {...err('email')} />
                  </Field>
                  <Field id="contact-phone" label="Phone" optional error={errors.phone}>
                    <input id="contact-phone" type="tel" className="field" autoComplete="tel" value={values.phone} onChange={set('phone')} {...err('phone')} />
                  </Field>
                  <Field id="contact-destination" label="Destination" optional>
                    <select id="contact-destination" className="field" value={values.destination} onChange={set('destination')}>
                      <option value="">Not sure yet</option>
                      {DESTINATIONS.map((d) => <option key={d.name}>{d.name}</option>)}
                      {values.destination && !DESTINATIONS.some((d) => d.name === values.destination) && <option>{values.destination}</option>}
                    </select>
                  </Field>
                  <Field id="contact-month" label="When" optional>
                    <input id="contact-month" className="field" placeholder="e.g. late May, or flexible" value={values.month} onChange={set('month')} />
                  </Field>
                  <Field id="contact-guests" label="Guests">
                    <select id="contact-guests" className="field" value={values.guests} onChange={set('guests')}>
                      {['1', '2', '3', '4', '5', '6', '8+'].map((g) => <option key={g}>{g}</option>)}
                    </select>
                  </Field>
                  <div className="sm:col-span-2">
                    <Field id="contact-plan" label="Concierge plan">
                      <select id="contact-plan" className="field" value={values.plan} onChange={set('plan')}>
                        {PLANS.map((p) => <option key={p.id} value={p.id}>{p.name}{p.price.voyage ? ` — from $${p.price.voyage} per voyage` : ' — free'}</option>)}
                      </select>
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <Field id="contact-message" label="Tell us about the trip" error={errors.message}>
                      <textarea id="contact-message" rows={5} className="field resize-y" placeholder="Celebrating our 25th in September. We loved Greece, hated crowded tender ports…" value={values.message} onChange={set('message')} {...err('message')} />
                    </Field>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-start gap-3 text-sm text-mist">
                      <input id="contact-consent" type="checkbox" checked={values.consent} onChange={set('consent')} className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer accent-[#0B5ED7]" {...err('consent')} />
                      <span>You can contact me about this enquiry. Details are handled under our <a href="/privacy-policy" className="font-semibold text-brass underline underline-offset-4">privacy policy</a>.</span>
                    </label>
                    <p id="contact-consent-error" className="mt-1.5 min-h-5 text-sm text-coral" aria-live="polite">{errors.consent}</p>
                  </div>
                  <div className="mt-2 flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-mist" role="status">
                      {status === 'failed' ? <span className="text-coral">The message didn’t send. Check your connection and try again, or call {SITE.phone}.</span> : 'No deposit or commitment needed.'}
                    </p>
                    <Button type="submit" size="lg" iconLeft={Send} disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending…' : 'Send enquiry'}
                    </Button>
                  </div>
                </m.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
