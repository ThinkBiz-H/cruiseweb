# Maristella Voyages

Marketing site for an independent cruise concierge. React 19 · Vite · Tailwind CSS v4 · Framer Motion · GSAP · Lenis · React Router 7 · Lucide.

Design reference: ecruisecare.com (layout and section rhythm only). All copy, branding, illustrations and data are original.

## Quick start

```bash
npm install
cp .env.example .env   # set VITE_SITE_URL and the form endpoints
npm run dev            # http://localhost:5173
npm run build          # regenerates public/sitemap.xml, then builds to dist/
npm run preview        # serve dist/ on http://localhost:4173
```

Node 20.19+ (required by Vite 8).

## Environment

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Public origin. Used for canonical URLs, Open Graph, JSON-LD and `sitemap.xml`. |
| `VITE_CONTACT_ENDPOINT` | POST target for the enquiry form (JSON). Unset → pre-filled `mailto:`. |
| `VITE_NEWSLETTER_ENDPOINT` | POST target for the footer newsletter (`{ email }`). Unset → pre-filled `mailto:`. |

Any JSON-accepting endpoint works (Formspree, Basin, a serverless function, your own Express route). Non-2xx responses surface an inline error.

## Structure

```
public/                 favicon, og-image (.png served, .svg source), manifest, robots, sitemap, _redirects
scripts/
  generate-sitemap.mjs  builds sitemap.xml from src/data/routes.js + src/data/blog.js
src/
  app/                  App (router, LazyMotion), routes (lazy pages + preload), RootLayout
  components/
    global/             TransitionRoutes (GSAP curtain), Seo, Loader, ScrollProgress, BackToTop
    layout/             Navbar, MegaMenu, MobileMenu, Footer
    ui/                 Button (ripple), Reveal/Stagger, SectionHeading, Counter, SpotlightCard,
                        Accordion, PageHero, CtaBand, LegalPage, Logo, SocialIcons
    illustrations/      OceanScene (hero), Ship, SceneArt (postcard scenes), svgUtils
  data/                 site, routes, navigation, content, blog — all copy lives here
  hooks/                reduced motion, Lenis bootstrap, pointer spotlight
  lib/                  gsap registration, Lenis singleton, cn, formatters
  pages/                Home, About, Services, Pricing, Blog, BlogPost, Contact, PrivacyPolicy, Terms, NotFound
  sections/home/        Hero, TrustedBy, Features, Services, Process, Benefits, Stats, WhyUs,
                        Testimonials, Pricing, Faq, Contact
  index.css             Tailwind @theme tokens, keyframes, glass/gradient/prose utilities
```

## Editing content

- Brand, contact details, socials: `src/data/site.js`
- Nav, mega menu, footer columns: `src/data/navigation.js`
- Home/services/pricing/FAQ/testimonials/team: `src/data/content.js`
- Journal posts: `src/data/blog.js` (slug, meta, body blocks). New posts are picked up by the router and the sitemap automatically.
- Routes and per-page SEO defaults: `src/data/routes.js`

Before launch, replace the placeholder business details: company name, address, `555-01xx` phone, email, social handles, partner cruise-line names, testimonials, team, stats and legal copy. All are fictional. Have the Privacy Policy and Terms reviewed for your jurisdiction.

## SEO

- `<Seo>` sets title, description, canonical, robots, OG/Twitter tags and JSON-LD per route: Organization/TravelAgency, WebSite, BreadcrumbList, FAQPage, BlogPosting.
- `index.html` carries static defaults so crawlers that do not run JS still get meta and OG tags.
- `robots.txt` and the generated `sitemap.xml` (14 URLs) live in `public/`. The 404 page is `noindex`.
- This is a client-rendered SPA. Google renders JS; social scrapers and some crawlers do not. For per-page OG cards, prerender the routes, e.g. `vite-plugin-prerender` / `react-snap`, or Vercel/Netlify prerendering.

## Performance and accessibility

- Home is eager; every other page is `React.lazy` and is preloaded on nav hover. Vendor chunks: react, router, motion, gsap.
- Framer Motion runs through `LazyMotion` + `m` components. Fonts are self-hosted variable woff2. There are no raster images in the UI: scenes are inline SVG.
- `prefers-reduced-motion` disables the loader, Lenis, GSAP timelines, marquee and parallax.
- Skip link, focus management on route change, keyboard-operable mega menu/accordion/carousel (Esc closes menus), labelled form fields with inline errors, `sr-only` final values for animated counters.
- The loader shows once per session (~1.1 s) and delays LCP on that first view. Remove `<Loader />` in `RootLayout.jsx` if Lighthouse LCP is the priority.

## Deploy

- **Vercel:** `vercel.json` handles the SPA rewrite and immutable caching for `/assets/*`.
- **Netlify:** `public/_redirects` handles the SPA rewrite. Build command `npm run build`, publish `dist`.
- **Other hosts:** rewrite all unknown paths to `/index.html`.

Set `VITE_SITE_URL` in the host's environment before building; it is inlined at build time.
