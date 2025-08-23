import { useEffect, useRef, useState } from 'react';
import HeroVideo, { hasHeroVideoPlayed } from '../components/HeroVideo';
import LineDot from '../components/LineDot';
import home from '../data/home.json';

const DARK_COLOR = '#333333';
const LIGHT_COLOR = '#fbfdfa';
const DARK_RGB = [0x33, 0x33, 0x33];
const LIGHT_RGB = [251, 253, 250];

export default function Home() {
  const [revealHeroTitle, setRevealHeroTitle] = useState(false);
  const timerRef = useRef(null);
  const bgRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [finished, setFinished] = useState(hasHeroVideoPlayed());

  // On mount: if video already played this session, reveal immediately & set final bg color.
  useEffect(() => {
    if (hasHeroVideoPlayed()) {
      setRevealHeroTitle(true);
      if (bgRef.current) bgRef.current.style.backgroundColor = LIGHT_COLOR;
    } else {
      // Fallback in case autoplay is blocked: show text after 1s regardless.
      timerRef.current = setTimeout(() => setRevealHeroTitle(true), 1000);
      if (bgRef.current) bgRef.current.style.backgroundColor = DARK_COLOR;
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleFirstPlayStart = () => {
    // Start the 9.5s delay only for the first actual playback.
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => setRevealHeroTitle(true), 9500);
    // Respect reduced motion: jump to final state
    const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduce) {
      if (bgRef.current) bgRef.current.style.backgroundColor = LIGHT_COLOR;
      setRevealHeroTitle(true);
      setFinished(true);
      setPlaying(false);
    } else {
      setPlaying(true);
      setFinished(false);
    }
  };

  // Background timing: 0-2.5s fixed dark, 2.5s -> (total-2s) lerp to light, final 2s fixed light.
  useEffect(() => {
    if (!playing || finished || !bgRef.current) return;
    const elem = bgRef.current;
    const total = 9500; // ms (assumed)
    const holdDark = 3500; // ms
    const lightLockStart = total - 1000; // 8500ms
    const lerpDuration = lightLockStart - holdDark; // 5000ms
    const start = Date.now();
    let frame;
    const step = () => {
      const elapsed = Date.now() - start;
      if (elapsed < holdDark) {
        elem.style.backgroundColor = DARK_COLOR;
      } else if (elapsed < lightLockStart) {
        const t = (elapsed - holdDark) / lerpDuration; // 0..1
        const c = DARK_RGB.map((d, i) => Math.round(d + (LIGHT_RGB[i] - d) * t));
        elem.style.backgroundColor = `rgb(${c[0]},${c[1]},${c[2]})`;
      } else {
        elem.style.backgroundColor = LIGHT_COLOR;
        setFinished(true); // stop further animation for bg
        return;
      }
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [playing, finished]);

  return (
    <main>
  <div className="w-full bg-white shadow-bottom-over relative z-10 h-0" />
    <div ref={bgRef} className="bg-secondary shadow-bottom-hard relative z-0 transition-colors">
      <div className="max-w-[1400px] mx-auto">
        <HeroVideo onFirstPlayStart={handleFirstPlayStart} revealTitle={revealHeroTitle} />
      </div>
      </div>
        <div className="w-full bg-white shadow-top-over relative z-10">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-20 sm:pt-24 pb-20 sm:pb-28">
            <div className="space-y-14 sm:space-y-18 px-6 lg:px-0">
              {home.intro.quote && (
                <div className="space-y-5">
                  <p className="fade-up [animation-delay:420ms] text-center italic text-gray-600 text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto">
                    “{home.intro.quote.text}”
                  </p>
                  {home.intro.quote.author && (
                    <p className="fade-up [animation-delay:480ms] text-center italic text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto">
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
                  className={`fade-up justify-edge text-lg sm:text-xl md:text-2xl leading-8 text-charcoal [animation-delay:${420 + idx * 180}ms]`}
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
