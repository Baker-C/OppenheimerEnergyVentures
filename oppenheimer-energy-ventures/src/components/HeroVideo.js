import { useEffect, useRef, useState } from 'react';

// Per-page-load flag: prevents the hero video from auto-playing again until a full reload
let HERO_VIDEO_PLAYED = false;

export default function HeroVideo({ src = '/video/Mercury-Dot.mp4', poster = '/video/hero-poster.jpg' }) {
  const videoRef = useRef(null);
  const [source, setSource] = useState(src);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

  const tryPlay = () => {
      try {
        // ensure autoplay works on mobile by setting muted and inline
        v.muted = true;
        // Only auto-play if we haven't already played this session
        if (HERO_VIDEO_PLAYED) {
          v.pause();
          v.currentTime = 0;
          return;
        }
        const p = v.play();
        if (p && typeof p.then === 'function') {
          p.catch(() => {
            // ignore autoplay block errors; user gesture may be required on some platforms
          });
        }
      } catch {
        // no-op
      }
    };

    const onPlay = () => { HERO_VIDEO_PLAYED = true; };
    v.addEventListener('play', onPlay);

    if (v.readyState >= 2) {
      tryPlay();
    } else {
      v.addEventListener('canplay', tryPlay, { once: true });
    }

    return () => {
      v && v.removeEventListener && v.removeEventListener('canplay', tryPlay);
      v && v.removeEventListener && v.removeEventListener('play', onPlay);
    };
  }, [source]);

  // Reveal text exactly 9.5s after playback time starts
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (showText) return; // already revealed
    const onTime = () => {
      if (v.currentTime >= 9.5) {
        setShowText(true);
        v.removeEventListener('timeupdate', onTime);
      }
    };
    v.addEventListener('timeupdate', onTime);
    // in case the video is already past the threshold
    onTime();
    return () => v.removeEventListener('timeupdate', onTime);
  }, [source, showText]);
  const handleError = () => {
    // Fallback to an alternate, smaller video if the primary fails (e.g., OneDrive Range issue)
    if (source !== '/video/Mercury-Dot.mp4') {
      setSource('/video/Mercury-Dot.mp4');
    }
  };

  const handleLoadedData = () => {
    // Try play again once we have data
    const v = videoRef.current;
    if (!v) return;
    try {
      v.play().catch(() => {});
    } catch {}
  };

  return (
    <div className="relative w-full aspect-[16/9] max-h-[600px] bg-black">
      <video
        ref={videoRef}
        className="w-full h-full object-cover pointer-events-none"
        autoPlay
        playsInline
        muted
        preload="auto"
        aria-hidden
        poster={poster}
        onError={handleError}
        onLoadedData={handleLoadedData}
      >
        <source src={source} type="video/mp4" />
      </video>
    {/* Top overlay text */}
  <div className="absolute inset-x-0 top-8 sm:top-12 md:top-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-10 text-center">
          <p className="text-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-pop font-heading" aria-label={"Nuclear doesn't have to be complicated."}>
            {showText ? (() => {
              const text = "Nuclear doesn't have to be complicated.";
              const italicWord = 'have';
              const italicStart = text.indexOf(italicWord);
              const italicEnd = italicStart + italicWord.length - 1;
              const nuclearWord = 'Nuclear';
              const nuclearStart = text.indexOf(nuclearWord);
              const nuclearEnd = nuclearStart + nuclearWord.length - 1;
              const baseDelay = 0; // start immediately once revealed (which is 9.5s after video starts)
              const step = 0.03; // base delay between letters
              const wordPauseMultiplier = 3; // 3x longer pause between words
              const pauseAfterNuclear = 1.0; // extra pause after "Nuclear"

              let time = baseDelay;
              const spans = [];
              for (let i = 0; i < text.length; i++) {
                const ch = text[i];
                const isItalic = i >= italicStart && i <= italicEnd;
                const displayChar = ch === ' ' ? '\u00A0' : ch;

                spans.push(
                  <span
                    key={i}
                    style={{ animationDelay: `${time}s` }}
                  >
                    {displayChar}
                  </span>
                );

                // Increment time for next character
                if (i === nuclearEnd) {
                  // add a longer pause after the word "Nuclear" completes
                  time += pauseAfterNuclear;
                }

                // base increment per character
                time += step;

                // if current char is a space, add extra to make total pause 3x step
                if (ch === ' ') {
                  time += step * (wordPauseMultiplier - 1);
                }
              }
              return spans;
            })() : null}
          </p>
        </div>
      </div>
    </div>
  );
}
