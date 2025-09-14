import { useEffect, useRef, useState } from 'react';
import HeroVideo, { hasHeroVideoPlayed } from '../components/HeroVideo';
import HeroLogo from '../components/HeroLogo';
import HeroTitle from '../components/HeroTitle';
import LineDot from '../components/LineDot';
import LineDotCenter from '../components/LineDotCenter';
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
  const [showLineDot, setShowLineDot] = useState(false);
  const contentRef = useRef(null);
  const [contentVisibleAtLoad, setContentVisibleAtLoad] = useState(false);
  const [visibleCopyAtLoad, setVisibleCopyAtLoad] = useState({});

  // On mount: if video already played this session, reveal immediately & set final bg color.
  // useEffect(() => {
  //   if (hasHeroVideoPlayed()) {
  //     setRevealHeroTitle(true);
  //     if (bgRef.current) bgRef.current.style.backgroundColor = LIGHT_COLOR;
  //   } else {
  //     // Fallback in case autoplay is blocked: show text after 1s regardless.
  //     timerRef.current = setTimeout(() => setRevealHeroTitle(true), 1000);
  //     if (bgRef.current) bgRef.current.style.backgroundColor = DARK_COLOR;
  //   }
  //   return () => {
  //     if (timerRef.current) clearTimeout(timerRef.current);
  //   };
  // }, []);

  // const handleFirstPlayStart = () => {
  //   // Start the 9.5s delay only for the first actual playback.
  //   if (timerRef.current) {
  //     clearTimeout(timerRef.current);
  //   }
  //   timerRef.current = setTimeout(() => setRevealHeroTitle(true), 9500);
  //   // Respect reduced motion: jump to final state
  //   const prefersReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  //   if (prefersReduce) {
  //     if (bgRef.current) bgRef.current.style.backgroundColor = LIGHT_COLOR;
  //     setRevealHeroTitle(true);
  //     setFinished(true);
  //     setPlaying(false);
  //   } else {
  //     setPlaying(true);
  //     setFinished(false);
  //   }
  // };

  // // Background timing: 0-2.5s fixed dark, 2.5s -> (total-2s) lerp to light, final 2s fixed light.
  // useEffect(() => {
  //   if (!playing || finished || !bgRef.current) return;
  //   const elem = bgRef.current;
  //   const total = 9500; // ms (assumed)
  //   const holdDark = 3500; // ms
  //   const lightLockStart = total - 1000; // 8500ms
  //   const lerpDuration = lightLockStart - holdDark; // 5000ms
  //   const start = Date.now();
  //   let frame;
  //   const step = () => {
  //     const elapsed = Date.now() - start;
  //     if (elapsed < holdDark) {
  //       elem.style.backgroundColor = DARK_COLOR;
  //     } else if (elapsed < lightLockStart) {
  //       const t = (elapsed - holdDark) / lerpDuration; // 0..1
  //       const c = DARK_RGB.map((d, i) => Math.round(d + (LIGHT_RGB[i] - d) * t));
  //       elem.style.backgroundColor = `rgb(${c[0]},${c[1]},${c[2]})`;
  //     } else {
  //       elem.style.backgroundColor = LIGHT_COLOR;
  //       setFinished(true); // stop further animation for bg
  //       return;
  //     }
  //     frame = requestAnimationFrame(step);
  //   };
  //   frame = requestAnimationFrame(step);
  //   return () => cancelAnimationFrame(frame);
  // }, [playing, finished]);

  useEffect(() => {
    const t = setTimeout(() => setShowLineDot(true), 1900);
    return () => clearTimeout(t);
  }, []);

  // Check once on mount whether the main content block is visible in the viewport.
  useEffect(() => {
    const el = contentRef.current;
    if (!el || typeof window === 'undefined') {
      setContentVisibleAtLoad(false);
      return;
    }

    // Give the parent IntersectionObserver a moment to add `in-view` (ObserverWrapper runs in App.js).
    const t = setTimeout(() => {
      try {
        if (el.classList && el.classList.contains('in-view')) {
          setContentVisibleAtLoad(true);
        } else {
          const rect = el.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
          setContentVisibleAtLoad(!!isVisible);
        }

        // Also determine per-copy paragraph visibility at load.
        const map = {};
        const nodes = el.querySelectorAll('[data-copy-idx]');
        nodes.forEach((node) => {
          const idx = Number(node.getAttribute('data-copy-idx'));
          if (node.classList && node.classList.contains('in-view')) {
            map[idx] = true;
            return;
          }
          const r = node.getBoundingClientRect();
          map[idx] = (r.top < window.innerHeight && r.bottom > 0);
        });
        setVisibleCopyAtLoad(map);
      } catch (e) {
        setContentVisibleAtLoad(false);
      }
    }, 20);

    return () => clearTimeout(t);
  }, []);

  return (
    <main>
    <div className="w-full relative z-10 h-0" />
      {/* <div ref={bgRef} className="shadow-bottom-hard relative z-0 transition-colors">
        <div className="max-w-[1400px] mx-auto">
          <HeroVideo onFirstPlayStart={handleFirstPlayStart} revealTitle={revealHeroTitle} />
        </div>
      </div> */}
        <div className="w-full relative z-10 max-w-[1250px] mx-auto px-10">
          <div className="block dark:hidden
          mx-auto 
          pt-20 pb-14
          xsm:pt-28 xsm:pb-20
          sm:pt-36 sm:pb-32
          md:pt-44 md:pb-36
          lg:pt-44 lg:pb-48
          xl:pt-44 xl:pb-48
          fade-up shiny-once
          px-4
          "
          style={{animationDelay: "100ms"}}>
            <img
              src='/vectors/Logo_BLK.svg'
              alt="OPPENHEIMER ENERGY"
              className="mx-auto"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/vectors/Logo_BLK.png'; }}
            />
          </div>
          <div className="hidden dark:block
          mx-auto 
          pt-20 pb-14
          xsm:pt-28 xsm:pb-20
          sm:pt-36 sm:pb-32
          md:pt-44 md:pb-36
          lg:pt-44 lg:pb-48
          xl:pt-44 xl:pb-48
          fade-up shadow-once
          px-4
          "
          style={{animationDelay: "100ms"}}>
            <img
              src='/vectors/Logo_WHT.svg'
              alt="OPPENHEIMER ENERGY"
              className="mx-auto"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/vectors/Logo_WHT.png'; }}
            />
          </div>
          <div className="mx-auto">
            <div ref={contentRef} className="space-y-16 sm:space-y-18">
              {home.intro.quote && (
                <div className="space-y-5">
                  <p data-copy-idx={-2} className={`fade-up text-center italic text-lg sm:text-xl md:text-2xl max-w-4xl mx-auto`} style={{ animationDelay: `${(visibleCopyAtLoad[-2] ? 1200 : 0)}ms` }}>
                    “{home.intro.quote.text}”
                  </p>
                  {home.intro.quote.author && (
                    <p data-copy-idx={-1} className={`fade-up font-subheading text-center italic text-lg sm:text-xl md:text-2xl text-black-muted dark:text-white-muted max-w-2xl mx-auto`} style={{ animationDelay: `${(visibleCopyAtLoad[-1] ? 1400 : 0)}ms` }}>
                      — {home.intro.quote.author}
                    </p>
                  )}
                </div>
              )}
              <div className="min-h-[40px] flex items-center justify-center">
                {showLineDot && (
                  <div className={`flex items-center justify-center w-full`}>
                    {showLineDot && <LineDot width="600px" />}
                  </div>
                )}
              </div>
              {home.intro.copy && home.intro.copy.map((line, idx) => (
                 <p
                   key={idx}
                   data-copy-idx={idx}
                   className={`fade-up text-left text-lg sm:text-xl md:text-2xl leading-8 text-charcoal py-4`}
                   style={{ animationDelay: `${(visibleCopyAtLoad[idx] ? 2900 : 300) + idx * 180}ms` }}
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
