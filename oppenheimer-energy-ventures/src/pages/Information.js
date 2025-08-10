import Container from '../components/Container';
import Section from '../components/Section';
import MaterialRow from '../components/MaterialRow';
import PeopleList from '../components/PeopleList';
import materials from '../data/materials.json';
import advisors from '../data/advisors.json';
import team from '../data/team.json';

export default function Information() {
  return (
    <main>
      <Container>
        <Section title="Materials">
          <div>
            {materials.map((m, i) => (
              <MaterialRow key={i} name={m.name} href={m.href} isLast={i === materials.length - 1} />
            ))}
          </div>
        </Section>
        <Section title="Advisors">
          <PeopleList people={advisors} />
        </Section>
        <Section title="Team">
          <PeopleList people={team} />
        </Section>
      </Container>
    </main>
  );
}
