import Counter from '../../components/ui/Counter.jsx';
import { Stagger, StaggerItem } from '../../components/ui/Reveal.jsx';
import { STATS } from '../../data/content';

export default function Stats() {
  return (
    <section className="relative bg-white py-16 sm:py-20" aria-labelledby="stats-title">
      <h2 id="stats-title" className="sr-only">Maristella in numbers</h2>
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[20px] bg-[linear-gradient(120deg,#0A3F94_0%,#0B5ED7_55%,#2F80ED_100%)] shadow-lift">
          <div aria-hidden="true" className="absolute -top-24 right-10 h-64 w-64 rounded-full bg-white/10 blur-[80px]" />
          <div aria-hidden="true" className="absolute -bottom-32 left-1/4 h-64 w-[36rem] rounded-full bg-cyan-300/15 blur-[100px]" />
          <Stagger as="dl" className="relative grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <StaggerItem
                key={s.label}
                className={`flex flex-col-reverse justify-end gap-2 p-7 sm:p-10 ${i % 2 === 0 ? 'border-r' : ''} ${i < 2 ? 'border-b lg:border-b-0' : ''} ${i === 1 ? 'lg:border-r' : ''} border-white/15`}
              >
                <dt className="text-sm leading-snug text-white/75 sm:text-base">{s.label}</dt>
                <dd className="text-4xl font-extrabold tracking-tight text-white tabular-nums sm:text-5xl lg:text-[3.5rem]">
                  <Counter value={s.value} decimals={s.decimals || 0} suffix={s.suffix} />
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
