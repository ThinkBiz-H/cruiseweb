import {
  BellRing, LayoutGrid, Route, Headphones, Wallet, Compass,
  Ship, Waves, Mountain, Gem, Users, Heart,
  BadgePercent, Gift, LifeBuoy, ShieldCheck,
  Tag, Anchor, CalendarCheck,
} from 'lucide-react';

export const WHY_BOOK = [
  { icon: Tag, title: 'Best fare, plus perks', body: 'The same price as booking direct — often less once onboard credit and agency extras are added.' },
  { icon: Anchor, title: 'Planners who’ve sailed', body: 'Former pursers, expedition leaders and tour directors who know the ships from the inside.' },
  { icon: CalendarCheck, title: 'Free 72-hour cabin holds', body: 'We hold the right cabin while you decide. No deposit until you’re completely sure.' },
  { icon: Headphones, title: '24/7 support at sea', body: 'A real person answers our on-call line every hour of the year, wherever the ship is.' },
];

/** Example sailings shown on the homepage. Fares are typical per-person starting prices. */
export const PACKAGES = [
  {
    id: 'riviera-rome', title: 'Riviera & Rome', line: 'Aurelia Line', nights: 7, from: 1743, scene: 'sunset',
    region: 'Mediterranean', badge: 'Planner pick', season: 'May – Oct', rating: 4.9,
    ports: ['Barcelona', 'Marseille', 'Portofino', 'Rome'],
    perks: ['Balcony cabin', '$150 onboard credit'],
  },
  {
    id: 'inside-passage', title: 'Glaciers of the Inside Passage', line: 'Northwind Expeditions', nights: 7, from: 910, scene: 'polar',
    region: 'Alaska & Inside Passage', badge: 'Best for nature', season: 'May – Sep', rating: 4.8,
    ports: ['Seattle', 'Juneau', 'Skagway', 'Glacier Bay'],
    perks: ['Glacier-side cabin advice', 'Prepaid gratuities'],
  },
  {
    id: 'island-hopper', title: 'Eastern Caribbean Island Hopper', line: 'Coral Meridian', nights: 7, from: 640, scene: 'tropic',
    region: 'Caribbean & Bahamas', badge: 'Family favourite', season: 'Nov – Apr', rating: 4.8,
    ports: ['Miami', 'Nassau', 'St. Thomas', 'St. Maarten'],
    perks: ['Family cabin planning', 'Specialty dinner'],
  },
];

export const PARTNER_LINES = [
  'Aurelia Line', 'Northwind Expeditions', 'Coral Meridian', 'Saltglass River Co.',
  'Halvard & Sons', 'Pelagos Yachting', 'Bluewater Crown', 'Isola Cruises',
  'Fjordline Royal', 'Terra Australis',
];

export const FEATURES = [
  {
    icon: BellRing,
    title: 'Fare watch after you book',
    body: 'We keep checking your sailing until final payment. If the fare drops, we rebook you at the lower price or claim onboard credit.',
    anim: 'ring',
  },
  {
    icon: LayoutGrid,
    title: 'Cabins chosen from deck plans',
    body: 'We check what sits above and below every cabin — no theatre overhead, no laundry next door, no obstructed “ocean view”.',
    anim: 'grid',
  },
  {
    icon: Route,
    title: 'One itinerary, door to gangway',
    body: 'Flights, the pre-cruise hotel, port transfer and shore days live in one document that updates when anything changes.',
    anim: 'route',
  },
  {
    icon: Headphones,
    title: 'A planner who answers at sea',
    body: 'Message your planner from the ship’s Wi-Fi or call our 24/7 line. Missed tender, lost luggage, a sudden port change — we handle it.',
    anim: 'pulse',
  },
  {
    icon: Wallet,
    title: 'Deposits that stay flexible',
    body: 'We favour refundable fares and track every cancellation deadline, so a change of plans costs you as little as possible.',
    anim: 'tilt',
  },
  {
    icon: Compass,
    title: 'Shore days planned properly',
    body: 'Independent guides where they’re better, ship excursions where timing is tight. Always back aboard with time to spare.',
    anim: 'spin',
  },
];

export const SERVICES = [
  {
    id: 'ocean', icon: Ship, title: 'Ocean cruises', from: 640, scene: 'tropic',
    body: 'Caribbean islands, Mediterranean ports and Pacific crossings on ships with every dining room and pool deck you could want.',
    points: ['3 to 21-night sailings', 'Balcony and suite upgrades negotiated', 'Kids’ club and family cabin planning'],
  },
  {
    id: 'river', icon: Waves, title: 'River cruises', from: 1890, scene: 'river',
    body: 'Wake up in a new town most mornings. Danube, Rhine, Douro, the Nile and the Mekong on boats of 100–190 guests.',
    points: ['Docked in town centres', 'Wine, cycling and Christmas-market themes', 'Rail add-ons arranged'],
  },
  {
    id: 'expedition', icon: Mountain, title: 'Expedition voyages', from: 6200, scene: 'polar',
    body: 'Antarctica, Svalbard, the Galápagos and the Kimberley with naturalist teams, Zodiac landings and ice-class ships.',
    points: ['Gear lists and visa checks', 'Drake Passage fly-over options', 'Landing-day priority cabins'],
  },
  {
    id: 'luxury', icon: Gem, title: 'Small-ship luxury', from: 4100, scene: 'sunset',
    body: 'All-suite ships under 300 guests, where the bar tab, gratuities and most excursions are already in the fare.',
    points: ['Butler and suite-category advice', 'Marina-day and private tender ports', 'Pre-cruise villa stays'],
  },
  {
    id: 'groups', icon: Users, title: 'Groups & celebrations', from: 820, scene: 'harbour',
    body: 'Family reunions, milestone birthdays and company retreats — from eight connecting cabins to a full-ship charter.',
    points: ['Group fares from 8 cabins', 'Private dining and event space', 'One invoice per household'],
  },
  {
    id: 'honeymoon', icon: Heart, title: 'Honeymoons', from: 1750, scene: 'lagoon',
    body: 'Adults-focused ships, aft-wrap balconies and island days chosen for empty beaches rather than cruise-port crowds.',
    points: ['Registry-funded upgrades', 'Late-seating and in-suite dining', 'Overwater add-ons in Polynesia'],
  },
];

export const DESTINATIONS = [
  { name: 'Caribbean & Bahamas', from: 640, nights: '4–14 nights', season: 'Nov – Apr', scene: 'tropic' },
  { name: 'Mediterranean', from: 790, nights: '7–12 nights', season: 'Apr – Oct', scene: 'sunset' },
  { name: 'Alaska & Inside Passage', from: 910, nights: '7 nights', season: 'May – Sep', scene: 'polar' },
  { name: 'Norwegian fjords', from: 1180, nights: '7–14 nights', season: 'May – Aug', scene: 'fjord' },
  { name: 'Southeast Asia', from: 720, nights: '5–14 nights', season: 'Nov – Mar', scene: 'lagoon' },
  { name: 'Transatlantic crossings', from: 560, nights: '7–15 nights', season: 'Apr & Nov', scene: 'harbour' },
];

export const PROCESS = [
  { title: 'Tell us how you like to travel', body: 'A 15-minute call or a short form: who’s coming, when you can go, what made your last trip great — and what didn’t.', time: 'Day 1' },
  { title: 'Get a shortlist within a day', body: 'Three to five sailings side by side, with real cabin numbers, total cost including gratuities and port fees, and our honest pick.', time: 'Within 24 hours' },
  { title: 'Hold the cabin, then decide', body: 'We place a courtesy hold while you think it over. No deposit until you’re sure, and we confirm the fare in writing.', time: 'Up to 72-hour hold' },
  { title: 'Plan the details', body: 'Flights, hotel, transfers, dining times, spa slots and shore days — booked in order of what sells out first.', time: 'Weeks before sailing' },
  { title: 'Sail with someone on call', body: 'Your planner monitors weather and port changes and is reachable throughout. We check in when you’re home, too.', time: 'At sea and after' },
];

export const BENEFITS = [
  { icon: BadgePercent, title: 'No booking fee on Essential', body: 'Cruise lines pay us a commission, so the fare you see is the fare you pay. Our concierge tiers are optional.' },
  { icon: Gift, title: 'Perks the lines give agencies', body: 'Onboard credit, prepaid gratuities or a free specialty dinner on most sailings — stacked on top of public promotions.' },
  { icon: ShieldCheck, title: 'Protected payments', body: 'Funds go directly to the cruise line wherever possible, and our trust account is independently audited every year.' },
  { icon: LifeBuoy, title: 'Help when plans change', body: 'Hurricane reroutes, missed connections, medical disembarkation — we’ve handled them all and we know who to call.' },
];

export const STATS = [
  { value: 18400, suffix: '+', label: 'Guests sailed with us since 2014' },
  { value: 640, suffix: '', label: 'Ports our planners have visited' },
  { value: 4.9, decimals: 1, suffix: '/5', label: 'Average post-voyage rating' },
  { value: 11, suffix: ' min', label: 'Median reply time, day or night' },
];

export const COMPARISON = [
  { label: 'Price for the same cabin and fare', self: 'Public fare', us: 'Same fare, plus agency perks' },
  { label: 'Cabin selection', self: 'Guess from a deck map', us: 'Checked against what’s above and below' },
  { label: 'Fare drops after booking', self: 'You’d have to notice', us: 'Watched daily until final payment' },
  { label: 'Flights, hotel and transfers', self: 'Four separate bookings', us: 'One itinerary that updates itself' },
  { label: 'Help during the voyage', self: 'Cruise line call centre', us: 'Your own planner, 24/7' },
  { label: 'Cancellations and changes', self: 'Read the fine print alone', us: 'Deadlines tracked for you' },
];

export const TESTIMONIALS = [
  { name: 'Priya & Arjun Mehta', trip: 'Norwegian fjords, 10 nights', initials: 'PM', quote: 'We wanted fjords without a 4,000-guest ship. Maristella found a 600-guest sailing we’d never heard of, and our balcony faced the right side of the ship for every fjord. That detail alone made the trip.' },
  { name: 'Daniel Okafor', trip: 'Galápagos expedition, 8 nights', initials: 'DO', quote: 'Our flight to Guayaquil was cancelled. By the time I’d landed in Miami, our planner had rebooked us and moved the hotel night. We didn’t miss a single landing.' },
  { name: 'Hannah Lindqvist', trip: 'Danube Christmas markets, 7 nights', initials: 'HL', quote: 'I’d booked river cruises myself before. This time the fare dropped twice after booking and they claimed the difference both times. I wouldn’t have noticed either.' },
  { name: 'The Alvarez family', trip: 'Caribbean, 7 nights · 14 guests', initials: 'AF', quote: 'Fourteen of us, three generations, two wheelchairs. Connecting cabins, accessible excursions, one dinner table every night. It just worked.' },
  { name: 'Marcus Webb', trip: 'Transatlantic crossing, 7 nights', initials: 'MW', quote: 'Honest advice. They told me the cheaper inside cabin would be fine for a crossing and to spend the difference on the spa. They were right.' },
];

export const PLANS = [
  {
    id: 'essential', name: 'Essential', tagline: 'For travellers who know roughly where they want to go.',
    price: { voyage: 0, annual: 0 }, highlight: false, cta: 'Start planning',
    features: ['Sailing shortlist within 24 hours', 'Agency perks on every booking', 'Fare watch until final payment', 'Email support before and during your trip'],
  },
  {
    id: 'signature', name: 'Signature', tagline: 'A dedicated planner for the whole journey.',
    price: { voyage: 149, annual: 390 }, highlight: true, cta: 'Choose Signature',
    features: ['Everything in Essential', 'One named planner, by phone or message', 'Flights, hotels and transfers arranged', 'Shore days planned with vetted local guides', '24/7 on-call line while you sail'],
  },
  {
    id: 'atelier', name: 'Atelier', tagline: 'For suites, charters and multi-week journeys.',
    price: { voyage: 499, annual: 1290 }, highlight: false, cta: 'Talk to Atelier',
    features: ['Everything in Signature', 'Suite and charter specialists', 'Private guides and drivers in every port', 'Pre- and post-cruise villa or lodge stays', 'Meet-and-greet at embarkation'],
  },
];

export const FAQS = [
  { q: 'How do you make money if Essential is free?', a: 'Cruise lines pay licensed agencies a commission from the fare they already charge. You pay the same price as booking direct, and often less once our agency perks are added. Signature and Atelier are optional fees for planning work beyond the cruise itself.' },
  { q: 'Can you match a price I found elsewhere?', a: 'Usually, yes. Send us the quote for the same ship, date, cabin category and fare type. If we can’t match it, we’ll tell you, and explain whether the other offer has restrictions worth knowing about.' },
  { q: 'What if the fare drops after I book?', a: 'Until final payment (typically 60–120 days before sailing), we check your fare daily. When it falls, we reprice your booking or secure onboard credit, depending on the line’s rules.' },
  { q: 'Are you affiliated with any cruise line?', a: 'No. Maristella is independent. We book with more than 40 ocean, river and expedition lines and we recommend whichever ship suits you best — not the one paying the most.' },
  { q: 'How do cancellations and refunds work?', a: 'Each cruise line sets its own cancellation schedule, and the fees depend on the fare type and how close you are to departure. We show you the exact deadlines before you pay a deposit and remind you before each one passes. Refunds go back to your original payment method, usually within 5–15 business days of the line approving them.' },
  { q: 'Do I need travel insurance?', a: 'We strongly recommend it, particularly for expedition and long-haul voyages where medical evacuation can be costly. We can quote cover from independent insurers, but you’re free to buy it anywhere.' },
  { q: 'Can you help with visas and travel documents?', a: 'We’ll tell you which documents each port requires for your nationality and remind you of deadlines. For visas that need an application, we point you to the official process or a licensed visa service.' },
];

export const VALUES = [
  { title: 'Advice before sales', body: 'If a cheaper cabin or a different ship suits you better, we say so. Most of our guests come back, and that’s the only way it works.' },
  { title: 'Specific beats impressive', body: 'Which side of the ship faces the glacier. Which tender stop has the shorter queue. We trade in details you can act on.' },
  { title: 'Someone always picks up', body: 'Ships sail on weekends and holidays, so we do too. A real person answers the on-call line every hour of the year.' },
];

export const TEAM = [
  { name: 'Elena Marchetti', role: 'Founder · former ship’s purser', initials: 'EM' },
  { name: 'Tomás Rivera', role: 'Head of expedition voyages', initials: 'TR' },
  { name: 'Aisha Rahman', role: 'Lead planner, river & Europe', initials: 'AR' },
  { name: 'Grant Holloway', role: 'Groups & charters', initials: 'GH' },
];
