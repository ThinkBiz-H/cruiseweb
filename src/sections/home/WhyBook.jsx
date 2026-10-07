import SectionHeading from '../../components/ui/SectionHeading.jsx';
import SpotlightCard from '../../components/ui/SpotlightCard.jsx';
import { Stagger } from '../../components/ui/Reveal.jsx';
import { WHY_BOOK } from '../../data/content';

export default function WhyBook() {
  return (
    <section className="section-y section-alt relative" aria-labelledby="why-book-title">
      <div className="container-x">
        <SectionHeading
          id="why-book-title"
          align="center"
          eyebrow="Why book with us"
          title="Cruise booking, done properly"
          intro="Everything you’d get booking direct, plus a planner who checks the details and stays with you until you’re home."
        />
        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_BOOK.map((f, i) => (
            <SpotlightCard key={f.title} className="group p-7">
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brass/[0.08] text-brass transition-all duration-500 group-hover:scale-110 group-hover:bg-brass group-hover:text-white group-hover:shadow-blue">
                  <f.icon className="h-6 w-6" aria-hidden="true" strokeWidth={1.9} />
                </span>
                <span aria-hidden="true" className="text-4xl font-extrabold text-tide transition-colors duration-500 group-hover:text-reef">0{i + 1}</span>
              </div>
              <h3 className="mt-7 text-lg font-bold text-foam">{f.title}</h3>
              <p className="mt-2.5 leading-relaxed text-mist">{f.body}</p>
            </SpotlightCard>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
