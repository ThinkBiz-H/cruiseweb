import Seo from '../components/global/Seo.jsx';
import LegalPage from '../components/ui/LegalPage.jsx';
import { SITE } from '../data/site';

const SECTIONS = [
  { title: 'Who we are', body: [
    `Maristella Voyages LLC (“Maristella”, “we”, “us”) is an independent travel agency based at ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postal}. We are the controller of the personal information described in this policy.`,
    `If you have any question about how we handle your information, email ${SITE.email} or call ${SITE.phone}.`,
  ] },
  { title: 'Information we collect', body: [
    'We collect only what we need to plan and book your travel:',
    ['Contact details — name, email, phone number and postal address.', 'Travel details — dates, destinations, cabin preferences, dietary and accessibility needs you choose to share.', 'Passenger details required by cruise lines and authorities — legal names, dates of birth, nationality and passport information.', 'Payment information, processed by our payment provider; we never store full card numbers.', 'Technical data — browser type, pages visited and approximate location, collected through privacy-friendly analytics.'],
  ] },
  { title: 'How we use your information', body: [
    'We use your information to respond to enquiries, prepare shortlists, make and manage bookings, contact you about changes to your trip, meet legal and regulatory obligations, and — only if you opt in — send our fare-drop newsletter.',
    'We do not sell your personal information, and we do not use it for automated decisions that significantly affect you.',
  ] },
  { title: 'Who we share it with', body: [
    'To deliver your trip we share the relevant details with cruise lines, airlines, hotels, transfer companies, local guides and insurers you choose to buy from. Each acts as an independent controller under its own privacy policy.',
    'We also use trusted service providers for email, secure document storage, payment processing and analytics, under contracts that limit how they can use your data.',
  ] },
  { title: 'Health and accessibility information', body: [
    'If you tell us about a medical condition, mobility need or dietary requirement, we use it only to arrange suitable cabins, transfers, excursions and meals, and we share it only with the suppliers who need it. You can ask us to delete it after your trip.',
  ] },
  { title: 'How long we keep it', body: [
    'Booking records are kept for seven years to meet accounting and consumer-protection requirements. Enquiries that do not lead to a booking are deleted after 24 months. Newsletter data is kept until you unsubscribe.',
  ] },
  { title: 'Your rights', body: [
    'Depending on where you live, you may have the right to access, correct, delete or export your personal information, to object to or restrict certain processing, and to withdraw consent at any time.',
    `To make a request, email ${SITE.email}. We respond within 30 days and will never charge you for a reasonable request. You may also complain to your local data-protection authority.`,
  ] },
  { title: 'Cookies and analytics', body: [
    'This website uses essential storage to remember things like whether you have seen our opening animation. We use cookie-less analytics that do not identify you personally. We do not run advertising trackers.',
  ] },
  { title: 'Security', body: [
    'Data is encrypted in transit and at rest. Access is limited to staff who need it to plan your travel, protected by multi-factor authentication. Passport details are deleted from our working systems once your voyage is complete.',
  ] },
  { title: 'Changes to this policy', body: [
    'We will update this page when our practices change and, where the change is significant, tell you by email before it takes effect.',
  ] },
];

export default function PrivacyPolicy() {
  return (
    <>
      <Seo title="Privacy policy" description="How Maristella Voyages collects, uses and protects your personal information when you plan and book a cruise." breadcrumbs={[{ name: 'Privacy policy', path: '/privacy-policy' }]} />
      <LegalPage
        title="Privacy policy"
        intro="Plain language on what we collect, why we need it and the choices you have."
        updated="2026-09-01"
        crumb={{ name: 'Privacy policy', path: '/privacy-policy' }}
        sections={SECTIONS}
      />
    </>
  );
}
