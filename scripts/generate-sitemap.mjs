import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { STATIC_ROUTES } from '../src/data/routes.js';
import { POSTS } from '../src/data/blog.js';

const root = dirname(fileURLToPath(import.meta.url));
const SITE_URL = (process.env.VITE_SITE_URL || 'https://maristella.travel').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const urls = [
  ...STATIC_ROUTES.map((r) => ({ loc: `${SITE_URL}${r.path}`, lastmod: today, changefreq: r.changefreq, priority: r.priority })),
  ...POSTS.map((p) => ({ loc: `${SITE_URL}/blog/${p.slug}`, lastmod: p.date, changefreq: 'monthly', priority: '0.6' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(root, '../public/sitemap.xml'), xml);
console.log(`sitemap.xml written with ${urls.length} URLs`);
