import { Reveal } from './Reveal.jsx';
import { cn } from '../../lib/cn';

export default function SectionHeading({ title, intro, eyebrow, align = 'left', as: Tag = 'h2', id, className, children }) {
  const centered = align === 'center';
  return (
    <div className={cn('max-w-3xl', centered && 'mx-auto text-center', className)}>
      {eyebrow && (
        <Reveal y={16}>
          <span className="eyebrow mb-5">{eyebrow}</span>
        </Reveal>
      )}
      <Reveal>
        <Tag id={id} className="text-[2rem] leading-[1.12] font-extrabold tracking-[-0.03em] text-foam sm:text-[2.6rem] lg:text-[3rem]">
          {title}
        </Tag>
      </Reveal>
      {intro && (
        <Reveal delay={0.08}>
          <p className={cn('mt-5 max-w-2xl text-lg leading-relaxed text-mist', centered && 'mx-auto')}>{intro}</p>
        </Reveal>
      )}
      {children}
    </div>
  );
}
