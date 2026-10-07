import Seo from '../components/global/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import SpotlightCard from '../components/ui/SpotlightCard.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import SceneArt from '../components/illustrations/SceneArt.jsx';
import { Reveal, Stagger, StaggerItem } from '../components/ui/Reveal.jsx';
import Stats from '../sections/home/Stats.jsx';
import { TEAM, VALUES } from '../data/content';

const LOGBOOK = [
  { year: '2014', text: 'Elena Marchetti leaves her post as a ship’s purser and opens a two-desk office above a Charleston chandlery.' },
  { year: '2017', text: 'River cruising joins the line-up after Aisha Rahman, a former Danube programme director, joins the team.' },
  { year: '2020', text: 'Every booking is unwound and refunded or rebooked during the pause in sailing. Not one guest loses money.' },
  { year: '2023', text: 'Expedition voyages launch with Tomás Rivera, who has led more than 60 Antarctic landings.' },
  { year: '2026', text: 'A team of 28 planners across three time zones, still answering the phone at 3am.' },
];

export default function About() {
  return (
    <>
      <Seo title="About us" description="Maristella was founded in 2014 by a former ship’s purser. Meet the planners behind 18,000+ voyages and learn how we work." breadcrumbs={[{ name: 'About', path: '/about' }]} />
      <PageHero
        crumbs={[{ name: 'About', path: '/about' }]}
        title="Started by someone who used to work on board"
        intro="Maristella began with one idea: guests deserve the advice crew members give their own families. We still work that way, twelve years and 18,000 guests later."
      />

      <section className="section-y pt-8" aria-labelledby="story-title">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[20px] border border-line">
              <SceneArt scene="harbour" className="aspect-[4/3] w-full" label="Illustration of a lighthouse at the harbour mouth at night" />
            </div>
            <div className="glass-strong absolute -right-4 -bottom-8 max-w-[15rem] rounded-2xl p-5 sm:-right-8 animate-float">
              <p className="font-display text-4xl text-brass">12 yrs</p>
              <p className="mt-1 text-sm text-mist">at sea and on the phone, every day of the year</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading id="story-title" title="What a purser knows" />
            <Reveal delay={0.1}>
              <div className="prose-sea mt-6">
                <p>A purser hears every complaint on a ship. The cabin under the gym. The excursion that missed the tide. The family split across three decks because they booked a week apart. Almost all of it could have been avoided before anyone left home.</p>
                <p>Elena founded Maristella to fix that part. We don’t own ships and we don’t favour any line. We match people to sailings, check the details nobody reads, and stay reachable until everyone is home.</p>
                <p>Most of our guests now come back, or come because a friend did. That’s the measure we care about.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-y pt-0" aria-labelledby="values-title">
        <div className="container-x">
          <SectionHeading id="values-title" title="How we work" />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {VALUES.map((v) => (
              <SpotlightCard key={v.title} className="p-8">
                <h3 className="font-display text-2xl text-foam">{v.title}</h3>
                <p className="mt-4 leading-relaxed text-mist">{v.body}</p>
              </SpotlightCard>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y pt-0" aria-labelledby="logbook-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="logbook-title" title="The logbook" intro="A few entries from the first twelve years." />
          </div>
          <Stagger as="ol" className="lg:col-span-8">
            {LOGBOOK.map((e) => (
              <StaggerItem as="li" key={e.year} className="grid grid-cols-[5.5rem_1fr] gap-6 border-t border-line py-7 sm:grid-cols-[8rem_1fr]">
                <span className="font-display text-3xl text-brass tabular-nums">{e.year}</span>
                <p className="text-lg leading-relaxed text-foam/85">{e.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <Stats />

      <section className="section-y" aria-labelledby="team-title">
        <div className="container-x">
          <SectionHeading id="team-title" title="Some of the people who’ll pick up" intro="Every planner has worked on board, led tours ashore, or both." />
          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM.map((p, i) => (
              <SpotlightCard key={p.name} className="group p-6">
                <div className="relative h-56 overflow-hidden rounded-[16px]">
                  <SceneArt scene={['sunset', 'polar', 'river', 'tropic'][i % 4]} className="h-full w-full transition-transform duration-1000 group-hover:scale-110" />
                  <span aria-hidden="true" className="glass-strong absolute bottom-4 left-4 flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl text-foam">{p.initials}</span>
                </div>
                <h3 className="mt-6 font-sans text-lg font-semibold text-foam">{p.name}</h3>
                <p className="mt-1 text-sm text-mist">{p.role}</p>
              </SpotlightCard>
            ))}
          </Stagger>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
