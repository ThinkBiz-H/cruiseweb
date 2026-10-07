import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import Seo from '../components/global/Seo.jsx';
import PageHero from '../components/ui/PageHero.jsx';
import SceneArt from '../components/illustrations/SceneArt.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { POSTS } from '../data/blog';
import { formatDate } from '../lib/format';
import { preloadRoute } from '../app/routes.jsx';
import { cn } from '../lib/cn';

const ALL = 'All';

function PostCard({ post }) {
  return (
    <m.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group glass overflow-hidden rounded-[20px] p-2 transition-transform duration-500 hover:-translate-y-1"
    >
      <Link to={`/blog/${post.slug}`} onMouseEnter={() => preloadRoute(`/blog/${post.slug}`)} className="block">
        <div className="relative h-52 overflow-hidden rounded-[16px]">
          <SceneArt scene={post.scene} className="h-full w-full transition-transform duration-[1.2s] ease-[var(--ease-tide)] group-hover:scale-110" />
          <span className="glass absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-foam">{post.category}</span>
        </div>
        <div className="px-4 pt-5 pb-4">
          <p className="flex items-center gap-3 text-sm text-mist">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-mist/50" />
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{post.readTime} min read</span>
          </p>
          <h3 className="mt-3 font-display text-2xl leading-snug text-foam transition-colors group-hover:text-brass">{post.title}</h3>
          <p className="mt-3 line-clamp-3 leading-relaxed text-mist">{post.excerpt}</p>
        </div>
      </Link>
    </m.article>
  );
}

export default function Blog() {
  const [featured, ...rest] = POSTS;
  const categories = useMemo(() => [ALL, ...new Set(rest.map((p) => p.category))], [rest]);
  const [active, setActive] = useState(ALL);
  const visible = active === ALL ? rest : rest.filter((p) => p.category === active);

  return (
    <>
      <Seo
        title="Journal"
        description="Practical cruise advice from Maristella planners: choosing cabins, reading fares, expedition prep and the best seasons to sail."
        breadcrumbs={[{ name: 'Journal', path: '/blog' }]}
        schema={[{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          name: 'The Maristella Journal',
          blogPost: POSTS.map((p) => ({ '@type': 'BlogPosting', headline: p.title, datePublished: p.date, url: `https://maristella.travel/blog/${p.slug}` })),
        }]}
      />
      <PageHero crumbs={[{ name: 'Journal', path: '/blog' }]} title="The journal" intro="Notes from our planners on choosing ships, cabins and seasons — the advice we give our own families." />

      <section className="pb-24" aria-labelledby="featured-title">
        <div className="container-x">
          <Reveal>
            <Link to={`/blog/${featured.slug}`} onMouseEnter={() => preloadRoute(`/blog/${featured.slug}`)} className="group glass grid overflow-hidden rounded-[20px] p-2 lg:grid-cols-2">
              <div className="relative h-72 overflow-hidden rounded-[16px] lg:h-[26rem]">
                <SceneArt scene={featured.scene} className="h-full w-full transition-transform duration-[1.4s] ease-[var(--ease-tide)] group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-12">
                <p className="text-sm font-semibold text-seaglass">Latest · {featured.category}</p>
                <h2 id="featured-title" className="mt-4 font-display text-3xl leading-tight text-foam sm:text-4xl lg:text-5xl">{featured.title}</h2>
                <p className="mt-5 text-lg leading-relaxed text-mist">{featured.excerpt}</p>
                <p className="mt-8 flex items-center gap-3 text-sm text-mist">
                  <span>{featured.author}</span>
                  <span aria-hidden="true" className="h-1 w-1 rounded-full bg-mist/50" />
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-semibold text-brass">
                  Read the article <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>

          <div className="mt-20 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <h2 className="font-display text-3xl text-foam sm:text-4xl">More from the journal</h2>
            <div role="toolbar" aria-label="Filter articles by category" className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={active === c}
                  onClick={() => setActive(c)}
                  className={cn('rounded-full border px-4 py-2 text-sm font-semibold transition-all', active === c ? 'border-brass bg-brass text-abyss' : 'border-line text-foam/80 hover:border-reef hover:text-foam')}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <m.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p) => <PostCard key={p.slug} post={p} />)}
            </AnimatePresence>
          </m.div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
