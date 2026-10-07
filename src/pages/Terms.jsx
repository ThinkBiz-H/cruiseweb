import Seo from '../components/global/Seo.jsx';
import LegalPage from '../components/ui/LegalPage.jsx';
import { SITE } from '../data/site';

const SECTIONS = [
  { title: 'Our role', body: [
    'Maristella Voyages LLC acts as a booking agent for independent travel suppliers, including cruise lines, airlines, hotels and tour operators. Your contract for each travel service is with that supplier, and their terms and conditions apply in addition to these terms.',
    'We are not owned by, and do not act on behalf of, any cruise line.',
  ] },
  { title: 'Quotes, holds and confirmation', body: [
    'Quotes and shortlists are based on availability at the time they are prepared and may change until a booking is confirmed. Courtesy holds are offered at the supplier’s discretion and lapse automatically if not converted to a booking.',
    'A booking is confirmed only when the supplier issues a confirmation number and we send it to you in writing.',
  ] },
  { title: 'Prices and payment', body: [
    'Fares are quoted per person in US dollars unless stated otherwise and include the taxes and port fees shown in your quote. Deposits and final payments are due on the dates set by each supplier, which we confirm in writing.',
    'If final payment is not received by the due date, the supplier may cancel your booking and apply cancellation charges.',
  ] },
  { title: 'Concierge plan fees', body: [
    'Signature and Atelier fees cover our planning services beyond the cruise booking. They are charged when your cruise is confirmed and are non-refundable once planning work has begun, except where a supplier cancels the voyage, in which case the fee is refunded in full.',
    'Annual plans renew only if you choose to renew them; we will never auto-renew without asking.',
  ] },
  { title: 'Changes and cancellations', body: [
    'If you wish to change or cancel a booking, contact us in writing. Supplier change and cancellation fees apply according to their published schedules, and we will tell you the exact cost before making any change.',
    'Refunds approved by a supplier are returned to the original payment method, typically within 5–15 business days of their approval.',
  ] },
  { title: 'Travel documents and health requirements', body: [
    'You are responsible for holding a valid passport, any visas and any health documentation required for every port on your itinerary. We provide general guidance but cannot guarantee entry, and suppliers may deny boarding to guests without correct documents.',
  ] },
  { title: 'Travel insurance', body: [
    'We strongly recommend comprehensive travel insurance covering cancellation, medical expenses and evacuation. If you decline insurance, you accept responsibility for costs it would have covered.',
  ] },
  { title: 'Our liability', body: [
    'We are responsible for the care and skill of our own planning and booking services. We are not liable for the acts or omissions of independent suppliers, or for events outside our reasonable control, such as weather, strikes, port closures or itinerary changes made by a cruise line.',
    'Nothing in these terms limits liability that cannot be limited by law.',
  ] },
  { title: 'Complaints', body: [
    `If something goes wrong, tell your planner straight away so we can help while you are still travelling. Formal complaints can be sent to ${SITE.email} within 30 days of your return; we acknowledge them within two business days.`,
  ] },
  { title: 'Governing law', body: [
    'These terms are governed by the laws of the State of South Carolina, without regard to conflict-of-law rules. Consumers retain any protections of the law where they live.',
  ] },
];

export default function Terms() {
  return (
    <>
      <Seo title="Terms & conditions" description="The terms that apply when you book a cruise or concierge plan with Maristella Voyages." breadcrumbs={[{ name: 'Terms & conditions', path: '/terms' }]} />
      <LegalPage
        title="Terms & conditions"
        intro="What you can expect from us, what your suppliers are responsible for, and how changes and refunds work."
        updated="2026-09-01"
        crumb={{ name: 'Terms & conditions', path: '/terms' }}
        sections={SECTIONS}
      />
    </>
  );
}
