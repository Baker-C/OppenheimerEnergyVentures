import Container from '../components/Container';
import HeroVideo from '../components/HeroVideo';

export default function Home() {
  return (
    <main>
      <div className="bg-secondary">
        <div className="max-w-[1400px] mx-auto">
          <HeroVideo />
        </div>
      </div>
      <Container className="py-12 shadow-top-sm bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-center text-balance text-lg sm:text-xl md:text-2xl leading-8 text-gray-800">
            Oppenheimer Energy Ventures backs visionary founders accelerating the transition to reliable, affordable, and sustainable energy. We partner early, support deeply, and build for the long term.
          </p>
          <p className="text-center italic text-primary/80 text-base sm:text-lg md:text-xl">
            “Build simple, dependable systems that last.”
          </p>
          <p className="text-center text-balance text-lg sm:text-xl md:text-2xl leading-8 text-gray-800">
            We invest at the intersections of advanced fission, grid reliability, and enabling software. Our network of operators and advisors helps teams navigate regulation, scale manufacturing, and earn the trust of customers.
          </p>
        </div>
      </Container>
    </main>
  );
}
