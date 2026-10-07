import { useEffect, useState } from 'react';
import PageHero from './PageHero.jsx';
import { scrollToTarget } from '../../lib/smoothScroll';
import { formatDate } from '../../lib/format';
import { cn } from '../../lib/cn';

const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

/** Long-form legal layout with a sticky, scroll-spied table of contents. */
export default function LegalPage({ title, intro, updated, crumb, sections }) {
  const [active, setActive] = useState(slugify(sections[0].title));

  useEffect(() => {
    const ids = sections.map((s) => slugify(s.title));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      setActive(atBottom ? ids[ids.length - 1] : current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [sections]);

  return (
    <>
      <PageHero crumbs={[crumb]} title={title} intro={intro}>
        <p className="mt-6 text-sm text-mist">Last updated <time dateTime={updated}>{formatDate(updated)}</time></p>
      </PageHero>
      <div className="container-x grid gap-14 pb-28 lg:grid-cols-12">
        <aside className="hidden lg:col-span-4 lg:block">
          <nav aria-label="On this page" className="sticky top-32">
            <p className="mb-4 text-sm font-semibold text-foam">On this page</p>
            <ol className="space-y-1 border-l border-line">
              {sections.map((s, i) => {
                const id = slugify(s.title);
                return (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      onClick={(e) => { e.preventDefault(); scrollToTarget(`#${id}`); history.replaceState(null, '', `#${id}`); }}
                      className={cn('-ml-px block border-l py-2 pl-5 text-sm transition-colors', active === id ? 'border-brass text-foam' : 'border-transparent text-mist hover:text-foam')}
                    >
                      {i + 1}. {s.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>
        </aside>
        <div className="prose-sea max-w-3xl lg:col-span-8">
          {sections.map((s, i) => (
            <section key={s.title} id={slugify(s.title)} className="scroll-mt-28">
              <h2 className={i === 0 ? '!mt-0' : undefined}>{i + 1}. {s.title}</h2>
              {s.body.map((b, j) => (Array.isArray(b) ? <ul key={j}>{b.map((li) => <li key={li}>{li}</li>)}</ul> : <p key={j}>{b}</p>))}
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
