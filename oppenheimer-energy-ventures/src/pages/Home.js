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
  const locContainerRef = useRef(null);
  const locRefs = useRef([]);
  const sepRefs = useRef([]);
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

  // Hide separator dots when the two adjacent items wrap to different lines.
  useEffect(() => {
    if (!locContainerRef.current || !locRefs.current.length) return;

    let rafId = null;

    const updateSeparators = () => {
      // For each separator between idx and idx+1, show only if both items have same top offset.
      for (let i = 0; i < sepRefs.current.length; i++) {
        const left = locRefs.current[i];
        const right = locRefs.current[i + 1];
        const sep = sepRefs.current[i];
        if (!left || !right || !sep) continue;
        try {
          const lRect = left.getBoundingClientRect();
          const rRect = right.getBoundingClientRect();
          // If tops are within 2px, consider them on same line.
          const sameLine = Math.abs(lRect.top - rRect.top) <= 2;
          // Use visibility instead of display to avoid reflow that may cause immediate rewrapping glitches.
          sep.style.visibility = sameLine ? 'visible' : 'hidden';
        } catch (e) {
          // ignore measurement errors
        }
      }
    };

    const ro = new ResizeObserver(() => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateSeparators);
    });

    ro.observe(locContainerRef.current);
    // Also observe each location to catch line breaks caused by individual items.
    locRefs.current.forEach((el) => el && ro.observe(el));

    // Run once initially and after fonts load
    rafId = requestAnimationFrame(updateSeparators);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(updateSeparators);
      }).catch(() => {});
    }

    const onWin = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateSeparators);
    };
    window.addEventListener('resize', onWin);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      ro.disconnect();
      window.removeEventListener('resize', onWin);
    };
  }, [home.locations]);

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
        <div className="w-full relative z-10 max-w-[1050px] mx-auto px-10">
          <div className="
          mx-auto 
          pt-20 pb-14
          xsm:pt-28 xsm:pb-20
          sm:pt-36 sm:pb-32
          md:pt-44 md:pb-36
          lg:pt-44 lg:pb-48
          xl:pt-44 xl:pb-48
          fade-up
          px-4
          "
          style={{animationDelay: "100ms"}}>
            <div className="shiny-once  block dark:hidden">
              <img
                src='/vectors/Logo_BLK.svg'
                alt="OPPENHEIMER ENERGY"
                className="mx-auto"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/vectors/Logo_BLK.png'; }}
              />
            </div>
            <div className="relative hidden dark:block w-full mx-auto">
              {/* Bottom image: white logo */}
              <div className="reveal-base w-full">
                <img
                  src="/vectors/Logo_WHT.png"
                  alt="OPPENHEIMER ENERGY"
                  className="w-auto mx-auto"
                  onError={(e) => { e.currentTarget.onerror = null; }}
                />
              </div>

              {/* Top image: OFFWHT overlay now used as a background image so it scales by height */}
              <div
                className="glow-overlay glow-overlay-bg"
                style={{ backgroundImage: `url('/vectors/Logo_WHTBLR.png')` }}
                role="img"
                aria-label="OPPENHEIMER ENERGY overlay"
              />
            </div>
          </div>
          <div className="mx-auto">
            <div ref={contentRef} className="space-y-28 sm:space-y-32">
              {home.intro.quote && (
                <div className="space-y-5">
                  <p data-copy-idx={-2} className={`fade-up text-center italic mx-auto`} style={{ animationDelay: `${(visibleCopyAtLoad[-2] ? 1200 : 0)}ms` }}>
                    “{home.intro.quote.text}”
                  </p>
                  {home.intro.quote.author && (
                    <p data-copy-idx={-1} className={`fade-up mx-6 ont-subheading text-center italic text-lg sm:text-xl md:text-2xl text-black-muted dark:text-white-muted max-w-2xl mx-auto`} style={{ animationDelay: `${(visibleCopyAtLoad[-1] ? 1400 : 0)}ms` }}>
                      — {home.intro.quote.author}
                    </p>
                  )}
                </div>
              )}
                <div className="min-h-[40px] flex items-center justify-center">
                  {showLineDot && (
                    <div className={`flex items-center justify-center w-full`}>
                      {showLineDot && <LineDot width="92%" />}
                    </div>
                  )}
                </div>
              <div className="space-y-5 text-left flex flex-col items-center w-fit mx-auto" style={{textWrap: 'normal', WebkitTextWrap: 'normal'}}>
                {home.intro.copy && home.intro.copy.map((line, idx) => (
                  <p
                    key={idx}
                    data-copy-idx={idx}
                    className={`fade-up text-left w-full`}
                    style={{ animationDelay: `${(visibleCopyAtLoad[idx] ? 2900 : 300) + idx * 180}ms`, textWrap: 'normal', WebkitTextWrap: 'normal' }}
                  >
                    {line}
                  </p>
                ))}
                <div className="space-y-5 flex flex-col items-start justify-start w-full" style={{textWrap: 'normal', WebkitTextWrap: 'normal'}}>
                  {home.contact.email && (
                    <div
                    data-copy-idx={2}
                    className="w-fit flex items-center justify-center fade-up"
                    style={{ animationDelay: `${(visibleCopyAtLoad[2] ? 2900 : 300) + (home.intro.copy ? home.intro.copy.length : 0) * 180}ms` }}
                    >
                        <p className="break-words">
                          {home.contact.email}
                        </p>
                      </div>
                    )}
                  {home.locations.length > 0 && (
                    <div
                    ref={locContainerRef}
                    data-copy-idx={3}
                    className="flex flex-wrap items-center justify-start gap-y-2 fade-up text-start italic text-lg sm:text-xl md:text-2xl text-black-muted dark:text-white-muted max-w-2xl"
                    style={{ animationDelay: `${(visibleCopyAtLoad[3] ? 3100 : 300) + ((home.intro.copy ? home.intro.copy.length : 0) + 1) * 180}ms` }}
                    >
                      {home.locations.map((loc, idx) => (
                        <span key={idx} className="inline-flex items-center whitespace-nowrap">
                          <p
                            ref={(el) => { locRefs.current[idx] = el; }}
                            className="font-subheading text-lg sm:text-xl md:text-2xl"
                            >
                            {loc}
                          </p>
                          {idx < home.locations.length - 1 && (
                            <span
                            ref={(el) => { sepRefs.current[idx] = el; }}
                            aria-hidden="true"
                            className="inline-block h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-600"
                            />
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
  );
}
