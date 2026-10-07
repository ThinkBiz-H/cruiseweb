import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE } from '../../data/site';

const upsertMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) { el?.remove(); return; }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

const absolute = (path) => (path?.startsWith('http') ? path : `${SITE.url.replace(/\/$/, '')}${path || ''}`);

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: absolute('/favicon.svg'),
  image: absolute(SITE.ogImage),
  description: SITE.description,
  telephone: SITE.phone,
  email: SITE.email,
  priceRange: '$$–$$$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postal,
    addressCountry: SITE.address.country,
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '08:00', closes: '20:00' },
  ],
  sameAs: Object.values(SITE.social),
});

export const websiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  publisher: { '@id': `${SITE.url}/#organization` },
  inLanguage: 'en-US',
});

export const faqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
});

const breadcrumbSchema = (crumbs) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: absolute(c.path) })),
});

/**
 * Per-route head management: title, description, canonical, robots,
 * Open Graph, Twitter Card and JSON-LD structured data.
 */
export default function Seo({ title, description = SITE.description, image = SITE.ogImage, type = 'website', noindex = false, schema = [], breadcrumbs, article }) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : `${SITE.name} — ${SITE.tagline}`;
    const url = absolute(pathname === '/' ? '/' : pathname.replace(/\/$/, ''));
    const img = absolute(image);

    document.title = fullTitle;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');
    upsertLink('canonical', url);

    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:title', fullTitle);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', img);
    upsertMeta('property', 'og:image:alt', title || SITE.name);
    upsertMeta('property', 'article:published_time', article?.published);
    upsertMeta('property', 'article:author', article?.author);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', SITE.twitter);
    upsertMeta('name', 'twitter:title', fullTitle);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', img);

    const graph = [organizationSchema(), ...schema];
    if (breadcrumbs?.length) graph.push(breadcrumbSchema([{ name: 'Home', path: '/' }, ...breadcrumbs]));
    let script = document.getElementById('ld-json');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'ld-json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph.length === 1 ? graph[0] : graph);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, image, type, noindex, pathname, JSON.stringify(schema), JSON.stringify(breadcrumbs), JSON.stringify(article)]);

  return null;
}
