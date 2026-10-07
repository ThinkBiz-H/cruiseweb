import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import Seo from '../components/global/Seo.jsx';
import SceneArt from '../components/illustrations/SceneArt.jsx';
import CtaBand from '../components/ui/CtaBand.jsx';
import { Reveal } from '../components/ui/Reveal.jsx';
import { POSTS, getPost } from '../data/blog';
import { SITE } from '../data/site';
import { formatDate } from '../lib/format';
import NotFound from './NotFound.jsx';

function Block({ block }) {
  if (block.type === 'h2') return <h2>{block.text}</h2>;
  if (block.type === 'ul') return <ul>{block.items.map((i) => <li key={i}>{i}</li>)}</ul>;
  return <p>{block.text}</p>;
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPost(slug);
  if (!post) return <NotFound />;
  const related = POSTS.filter((p) => p.slug !== slug).slice(0, 3);
  const path = `/blog/${post.slug}`;

  return (
    <>
      <Seo
        title={post.title}
        description={post.excerpt}
        type="article"
        article={{ published: post.date, author: post.author }}
        breadcrumbs={[{ name: 'Journal', path: '/blog' }, { name: post.title, path }]}
        schema={[{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          dateModified: post.date,
          author: { '@type': 'Person', name: post.author },
          publisher: { '@id': `${SITE.url}/#organization` },
          mainEntityOfPage: `${SITE.url}${path}`,
          image: `${SITE.url}${SITE.ogImage}`,
          articleSection: post.category,
          wordCount: post.body.reduce((n, b) => n + (b.text || b.items?.join(' ') || '').split(/\s+/).length, 0),
        }]}
      />
      <article>
        <header className="relative pt-32 sm:pt-40">
          <div className="container-x max-w-4xl">
            <Reveal>
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-mist hover:text-foam">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All articles
              </Link>
              <p className="mt-8 text-sm font-semibold text-seaglass">{post.category}</p>
              <h1 className="text-moonlit mt-3 text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">{post.title}</h1>
              <p className="mt-6 text-xl leading-relaxed text-mist">{post.excerpt}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-mist">
                <span className="flex items-center gap-3">
                  <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-brass to-seaglass text-xs font-bold text-abyss">
                    {post.author.split(' ').map((n) => n[0]).join('')}
                  </span>
                  <span className="text-foam">{post.author}</span>
                </span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{post.readTime} min read</span>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="container-x mt-12 max-w-6xl">
            <div className="overflow-hidden rounded-[20px] border border-line">
              <SceneArt scene={post.scene} className="aspect-[21/9] w-full" />
            </div>
          </Reveal>
        </header>
        <div className="container-x max-w-3xl py-16 sm:py-20">
          <div className="prose-sea text-[1.075rem]">
            {post.body.map((b, i) => <Block key={i} block={b} />)}
          </div>
        </div>
      </article>

      <section className="section-y pt-0" aria-labelledby="related-title">
        <div className="container-x">
          <h2 id="related-title" className="font-display text-3xl text-foam">Keep reading</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} className="group glass rounded-[20px] p-2 transition-transform duration-500 hover:-translate-y-1">
                <div className="h-40 overflow-hidden rounded-[16px]">
                  <SceneArt scene={p.scene} className="h-full w-full transition-transform duration-1000 group-hover:scale-110" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-mist">{p.category}</p>
                  <h3 className="mt-2 font-display text-xl leading-snug text-foam group-hover:text-brass">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
