import HeroVideo from '../components/HeroVideo';

export default function Home() {
  return (
    <main>
      <div className="bg-secondary shadow-bottom-hard relative z-0">
        <div className="max-w-[1400px] mx-auto">
          <HeroVideo />
        </div>
      </div>
        <div className="w-full bg-white shadow-top-over relative z-10">
          <div className="max-w-[1000px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-20 sm:pb-28">
            <div className="space-y-14 sm:space-y-18">
              <p className="text-center text-balance text-xl sm:text-2xl md:text-3xl leading-9 text-gray-800">
                Oppenheimer Energy Ventures backs visionary founders accelerating the transition to reliable, affordable, and sustainable energy. We partner early, support deeply, and build for the long term.
              </p>
              <p className="text-center italic text-primary/80 text-lg sm:text-xl md:text-2xl">
                “Build simple, dependable systems that last.”
              </p>
              <p className="text-center text-balance text-xl sm:text-2xl md:text-3xl leading-9 text-gray-800">
                We invest at the intersections of advanced fission, grid reliability, and enabling software. Our network of operators and advisors helps teams navigate regulation, scale manufacturing, and earn the trust of customers.
              </p>
            </div>
          </div>
        </div>
    </main>
  );
}
