import { Anchor, Ship, Waves, Compass, Sailboat } from 'lucide-react';
import { Reveal } from '../../components/ui/Reveal.jsx';
import { PARTNER_LINES } from '../../data/content';

const STYLES = [
  'font-serif italic text-xl font-medium',
  'font-sans font-extrabold tracking-[0.16em] text-[0.8rem] uppercase',
  'font-serif text-xl font-semibold',
  'font-sans font-semibold tracking-[0.24em] text-[0.8rem] uppercase',
  'font-sans text-lg font-extrabold tracking-tight',
];
const MARKS = [Anchor, Ship, Waves, Compass, Sailboat];

function LogoTile({ name, i }) {
  const Mark = MARKS[i % MARKS.length];
  return (
    <li className="group flex h-20 shrink-0 items-center gap-3 rounded-2xl border border-line bg-white px-7 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-brass/30 hover:shadow-card">
      <Mark className="h-5 w-5 text-mist/60 transition-colors duration-300 group-hover:text-brass" aria-hidden="true" />
      <span className={`whitespace-nowrap text-foam/55 transition-colors duration-300 group-hover:text-foam ${STYLES[i % STYLES.length]}`}>{name}</span>
    </li>
  );
}

function Row({ items, hidden, offset = 0 }) {
  return (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden || undefined}>
      {items.map((name, i) => <LogoTile key={name} name={name} i={i + offset} />)}
    </ul>
  );
}

/** Cruise lines we book — two counter-scrolling rows of wordmark tiles. */
export default function TrustedBy() {
  const half = Math.ceil(PARTNER_LINES.length / 2);
  const rows = [PARTNER_LINES.slice(0, half), PARTNER_LINES.slice(half)];
  return (
    <section className="relative border-b border-line bg-white py-16 sm:py-20" aria-labelledby="trusted-title">
      <div className="container-x">
        <Reveal className="flex flex-col items-center text-center">
          <span className="eyebrow">Cruise lines</span>
          <h2 id="trusted-title" className="mt-4 text-2xl font-extrabold tracking-tight text-foam sm:text-3xl">
            We book more than 40 ocean, river and expedition lines
          </h2>
          <p className="mt-3 max-w-xl text-mist">Independent advice across the whole market — we recommend the ship that suits you, not the one paying the most.</p>
        </Reveal>
      </div>
      <Reveal delay={0.1} className="group relative mt-12 space-y-4 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        {rows.map((items, r) => (
          <div
            key={r}
            className={`flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center ${r === 1 ? '[animation-direction:reverse] [animation-duration:56s]' : ''}`}
          >
            <Row items={items} offset={r * half} />
            <Row items={items} offset={r * half} hidden />
          </div>
        ))}
      </Reveal>
    </section>
  );
}
