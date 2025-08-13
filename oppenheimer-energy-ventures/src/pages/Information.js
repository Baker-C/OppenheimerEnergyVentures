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
  <Section title="About" animatedLine className="mt-16">
          <div className="space-y-6 text-gray-800 text-lg sm:text-xl md:text-2xl leading-8 text-balance">
            {about.about.paragraphs.map((p, i) => (
              <p key={i} >{p}</p>
            ))}
          </div>
        </Section>
  <Section title="Resources" animatedLine className="mt-16">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8">{materials.subtitle}</p>
          <div>
            {(materials.items || materials).map((m, i, arr) => (
              <MaterialRow key={i} name={m.name} href={m.href} isLast={i === (arr.length - 1)} />
            ))}
          </div>
        </Section>
  <Section title="Team" animatedLine className="mt-16">
          <PeopleList people={team} />
        </Section>
  <Section title="Advisors" animatedLine className="mt-16">
          <PeopleList people={advisors} />
        </Section>
      </Container>
    </main>
  );
}
