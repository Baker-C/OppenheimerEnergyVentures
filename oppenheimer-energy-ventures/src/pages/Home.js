import Container from '../components/Container';
import HeroVideo from '../components/HeroVideo';

export default function Home() {
  return (
    <main>
      <HeroVideo />
      <Container className="py-10">
        <p className="max-w-3xl mx-auto text-center text-balance text-base sm:text-lg leading-7 text-gray-800">
          Oppenheimer Energy Ventures backs visionary founders accelerating the transition to reliable, affordable, and sustainable energy. We partner early, support deeply, and build for the long term.
        </p>
      </Container>
    </main>
  );
}
