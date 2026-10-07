import { m } from 'framer-motion';
import { Gift, Utensils, Wine, Wifi } from 'lucide-react';
import SectionHeading from '../../components/ui/SectionHeading.jsx';
import SpotlightCard from '../../components/ui/SpotlightCard.jsx';
import { Reveal, Stagger } from '../../components/ui/Reveal.jsx';
import { BENEFITS } from '../../data/content';

const PERKS = [
  { icon: Gift, label: '$150 onboard credit', meta: 'Per cabin', tone: 'text-brass' },
  { icon: Utensils, label: 'Specialty dinner for two', meta: 'Chef’s table night', tone: 'text-seaglass' },
  { icon: Wine, label: 'Prepaid gratuities', meta: 'Saves ~$250 a week', tone: 'text-coral' },
  { icon: Wifi, label: 'Wi-Fi package', meta: 'One device', tone: 'text-seaglass' },
];

export default function Benefits() {
  return (
    <section className="section-y section-alt relative" aria-labelledby="benefits-title">
      <div className="container-x">
        <SectionHeading
          id="benefits-title"
          eyebrow="Agency perks"
          title="Same fare. More aboard."
          intro="Cruise lines reward the agencies that send them guests. We pass those rewards to you, on top of any public promotion."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <Reveal className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(145deg,#2F80ED_0%,#0B5ED7_45%,#0A3F94_100%)] p-8 shadow-lift sm:p-10 lg:col-span-5 lg:row-span-2">
            <div aria-hidden="true" className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/15 blur-[80px]" />
            <div aria-hidden="true" className="absolute -bottom-20 -left-16 h-60 w-60 rounded-full bg-cyan-300/20 blur-[80px]" />
            <h3 className="relative text-3xl font-extrabold text-white">A typical week with us</h3>
            <p className="relative mt-3 max-w-sm leading-relaxed text-white/80">Perks vary by line and fare, but this is what guests usually find waiting in their cabin.</p>
            <ul className="relative mt-10 space-y-3">
              {PERKS.map((p, i) => (
                <m.li
                  key={p.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 8 }}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card"
                  style={{ marginLeft: `${(i % 2) * 1.5}rem` }}
                >
                  <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-tide ${p.tone}`}>
                    <p.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-foam">{p.label}</span>
                    <span className="block text-sm text-mist">{p.meta}</span>
                  </span>
                </m.li>
              ))}
            </ul>
          </Reveal>
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {BENEFITS.map((b) => (
              <SpotlightCard key={b.title} className="group p-7 sm:p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brass/[0.08] text-brass transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-brass group-hover:text-white">
                  <b.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.9} />
                </span>
                <h3 className="mt-6 font-sans text-xl font-bold text-foam">{b.title}</h3>
                <p className="mt-3 leading-relaxed text-mist">{b.body}</p>
              </SpotlightCard>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
