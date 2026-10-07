import { m } from 'framer-motion';
import SectionHeading from '../../components/ui/SectionHeading.jsx';
import SpotlightCard from '../../components/ui/SpotlightCard.jsx';
import { Stagger } from '../../components/ui/Reveal.jsx';
import { FEATURES } from '../../data/content';

const ICON_MOTION = {
  ring: { rotate: [0, -16, 14, -10, 6, 0], transition: { duration: 0.8 } },
  grid: { scale: [1, 0.85, 1.1, 1], transition: { duration: 0.6 } },
  route: { x: [0, 4, -2, 0], y: [0, -3, 2, 0], transition: { duration: 0.7 } },
  pulse: { scale: [1, 1.18, 1], transition: { duration: 0.6 } },
  tilt: { rotate: [0, -10, 8, 0], y: [0, -3, 0], transition: { duration: 0.7 } },
  spin: { rotate: [0, 200, 180], transition: { duration: 0.9 } },
};

export default function Features() {
  return (
    <section className="section-y section-alt relative" aria-labelledby="features-title">
      <div className="container-x relative">
        <SectionHeading
          id="features-title"
          eyebrow="The planner difference"
          title="Booking is one click. Getting it right takes a planner."
          intro="Anyone can sell you a cabin. These are the small, unglamorous checks that decide whether the week goes smoothly."
        />
        <Stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <SpotlightCard key={f.title} whileHover="hover" className="group p-7 sm:p-8">
              <m.span
                variants={{ hover: ICON_MOTION[f.anim] }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brass/[0.08] text-brass transition-colors duration-300 group-hover:bg-brass group-hover:text-white"
              >
                <f.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.9} />
              </m.span>
              <h3 className="mt-6 font-sans text-xl font-bold text-foam">{f.title}</h3>
              <p className="mt-3 leading-relaxed text-mist">{f.body}</p>
            </SpotlightCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
