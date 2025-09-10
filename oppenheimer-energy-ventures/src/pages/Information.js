import Container from '../components/Container';
import Section from '../components/Section';
import MaterialRow from '../components/MaterialRow';
import PeopleList from '../components/PeopleList';
import materials from '../data/materials.json';
import advisors from '../data/advisors.json';
import team from '../data/team.json';
import about from '../data/about.json';

export default function Information() {
  return (
    <main>
      <Container>
        <Section title="About Us" animatedLine className="mt-10">
          <div className="space-y-6 text-lg sm:text-xl md:text-2xl leading-8 text-balance">
            {about.about.paragraphs.map((p, i) => (
              <p key={i} className="fade-up" style={{ animationDelay: `${420 + i * 120}ms` }}>{p}</p>
            ))}
          </div>
        </Section>
        <Section title="Resources" animatedLine className="mt-16">
          <p className="text-lg sm:text-xl md:text-2xl text-black-muted dark:text-white-muted mb-8 fade-up" style={{ animationDelay: '420ms' }}>{materials.subtitle}</p>
          <div className="overflow-x-hidden pb-6">
            {(materials.items || materials).map((m, i, arr) => (
              <div key={i} className="fade-up" style={{ animationDelay: `${480 + i * 120}ms` }}>
                <MaterialRow name={m.name} href={m.href} isLast={i === (arr.length - 1)} />
              </div>
            ))}
          </div>
        </Section>
        <Section title="Leaders" animatedLine className="mt-16">
          <div className="fade-up" style={{ animationDelay: '420ms' }}>
            <PeopleList people={team} />
          </div>
        </Section>
        <Section title="Advisors & Investors" animatedLine className="mt-16">
          <div className="fade-up" style={{ animationDelay: '420ms' }}>
            <PeopleList people={advisors} />
          </div>
        </Section>
      </Container>
    </main>
  );
}
