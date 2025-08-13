import HeroVideo from '../components/HeroVideo';
import LineDot from '../components/LineDot';
import home from '../data/home.json';

export default function Home() {
  return (
    <main>
  <div className="w-full bg-white shadow-bottom-over relative z-10 min-h-[200px]">
      </div>
      <div className="bg-secondary shadow-bottom-hard relative z-0">
        <div className="max-w-[1400px] mx-auto">
          <HeroVideo />
        </div>
      </div>
        <div className="w-full bg-white shadow-top-over relative z-10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-20 sm:pb-28">
            <div className="space-y-14 sm:space-y-18">
              {home.intro.quote && (
                <div className="space-y-5">
                  <p className="fade-up [animation-delay:240ms] text-center italic text-gray-600 text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto">
                    “{home.intro.quote.text}”
                  </p>
                  {home.intro.quote.author && (
                    <p className="fade-up [animation-delay:300ms] text-center italic text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
                      — {home.intro.quote.author}
                    </p>
                  )}
                </div>
              )}
              <div className="flex items-center justify-center">
                <LineDot width="64px" />
              </div>
              {home.intro.copy && home.intro.copy.map((line, idx) => (
                <p
                  key={idx}
                  className={`fade-up justify-edge text-2xl sm:text-2xl md:text-3xl leading-9 text-charcoal [animation-delay:${120 + idx * 180}ms]`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
    </main>
  );
}
