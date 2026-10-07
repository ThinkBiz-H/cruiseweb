import { Ship, Waves, Mountain, Gem, Users, Heart, Compass, Anchor, Snowflake, Sun, Landmark, Leaf } from 'lucide-react';

export const MEGA_MENU = {
  label: 'Cruises',
  columns: [
    {
      title: 'Ways to sail',
      links: [
        { label: 'Ocean cruises', to: '/services#ocean', icon: Ship, note: 'Big-ship sailings, 3 to 21 nights' },
        { label: 'River cruises', to: '/services#river', icon: Waves, note: 'Europe, the Nile and the Mekong' },
        { label: 'Expeditions', to: '/services#expedition', icon: Mountain, note: 'Polar, Galápagos, Kimberley' },
        { label: 'Small-ship luxury', to: '/services#luxury', icon: Gem, note: 'Under 300 guests, all-suite' },
        { label: 'Groups & celebrations', to: '/services#groups', icon: Users, note: '8 cabins or a full charter' },
        { label: 'Honeymoons', to: '/services#honeymoon', icon: Heart, note: 'Quiet decks, late dinners' },
      ],
    },
    {
      title: 'Where to go',
      links: [
        { label: 'Caribbean & Bahamas', to: '/services#destinations', icon: Sun },
        { label: 'Mediterranean', to: '/services#destinations', icon: Landmark },
        { label: 'Alaska & Inside Passage', to: '/services#destinations', icon: Snowflake },
        { label: 'Norwegian fjords', to: '/services#destinations', icon: Compass },
        { label: 'Southeast Asia', to: '/services#destinations', icon: Leaf },
        { label: 'Transatlantic crossings', to: '/services#destinations', icon: Anchor },
      ],
    },
  ],
  feature: {
    title: 'Shoulder-season sailings',
    body: 'Late-autumn Mediterranean departures run 20–30% below summer fares, with warmer seas than you would expect.',
    to: '/blog/shoulder-season-mediterranean',
    cta: 'Read the guide',
  },
};

export const NAV_LINKS = [
  { label: 'About', to: '/about' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Journal', to: '/blog' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_COLUMNS = [
  {
    title: 'Cruises',
    links: [
      { label: 'Ocean cruises', to: '/services#ocean' },
      { label: 'River cruises', to: '/services#river' },
      { label: 'Expeditions', to: '/services#expedition' },
      { label: 'Small-ship luxury', to: '/services#luxury' },
      { label: 'Destinations', to: '/services#destinations' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About us', to: '/about' },
      { label: 'Concierge plans', to: '/pricing' },
      { label: 'Journal', to: '/blog' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', to: '/privacy-policy' },
      { label: 'Terms & conditions', to: '/terms' },
      { label: 'Sitemap', href: '/sitemap.xml' },
    ],
  },
];
