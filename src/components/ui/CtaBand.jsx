import { ArrowRight, Phone } from 'lucide-react';
import Button from './Button.jsx';
import { Reveal } from './Reveal.jsx';
import SceneArt from '../illustrations/SceneArt.jsx';
import { SITE } from '../../data/site';

export default function CtaBand({ title = 'Tell us where you’d like to wake up.', body = 'A planner replies within the hour with first ideas, and a full shortlist within a day. No deposit, no obligation.' }) {
  return (
    <section className="section-y pt-0" aria-labelledby="cta-band-title">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[20px] border border-line bg-tide shadow-card">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 w-full lg:w-3/5">
            <SceneArt scene="harbour" className="h-full w-full" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/10" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent lg:hidden" />
          <div className="relative grid gap-10 px-7 py-14 sm:px-12 sm:py-20 lg:grid-cols-12 lg:items-end lg:px-16">
            <div className="lg:col-span-8">
              <h2 id="cta-band-title" className="text-4xl leading-[1.08] font-extrabold tracking-[-0.03em] text-foam sm:text-5xl">{title}</h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-mist">{body}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-stretch">
              <Button to="/contact" size="lg" icon={ArrowRight}>Plan my voyage</Button>
              <Button href={SITE.phoneHref} variant="secondary" size="lg" iconLeft={Phone}>Call {SITE.phone}</Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
