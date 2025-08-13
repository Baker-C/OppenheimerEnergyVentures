import { useEffect, useRef, useState } from 'react';
import HeroTitle from './HeroTitle';

// Per-page-load flag: prevents the hero video from auto-playing again until a full reload
let HERO_VIDEO_PLAYED = false;

// Helper so parent components can query if hero video has already played this session
export function hasHeroVideoPlayed() {
  return HERO_VIDEO_PLAYED;
}

export default function HeroVideo({ src = '/video/Mercury-Logo.mp4', poster = '/video/Ending-Metallic-Dot.png', onFirstPlayStart, revealTitle=false }) {
  const videoRef = useRef(null);
  const [source, setSource] = useState(src);
  const [showText, setShowText] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

  const tryPlay = () => {
      try {
        // ensure autoplay works on mobile by setting muted and inline
        v.muted = true;
        // Only auto-play if we haven't already played this session
        if (HERO_VIDEO_PLAYED) {
          // Already played in this session: show fallback image instead of replaying
          setFinished(true);
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

    const onPlay = () => {
      const first = !HERO_VIDEO_PLAYED;
      HERO_VIDEO_PLAYED = true;
      if (first && typeof onFirstPlayStart === 'function') {
        onFirstPlayStart();
      }
    };
    const onEnded = () => {
      setFinished(true);
    };
    v.addEventListener('play', onPlay);
    v.addEventListener('ended', onEnded);

    if (v.readyState >= 2) {
      tryPlay();
    } else {
      v.addEventListener('canplay', tryPlay, { once: true });
    }

    return () => {
      v && v.removeEventListener && v.removeEventListener('canplay', tryPlay);
  v && v.removeEventListener && v.removeEventListener('play', onPlay);
  v && v.removeEventListener && v.removeEventListener('ended', onEnded);
    };
  }, [source]);

  // (Text animation moved outside; keep timing hook if parent wants to listen in future)
  const handleError = () => {
    // Fallback to an alternate, smaller video if the primary fails (e.g., OneDrive Range issue)
    if (source !== '/video/Mercury-Logo.mp4') {
      setSource('/video/Mercury-Logo.mp4');
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
    <div className="relative w-full overflow-hidden h-[520px] sm:h-[560px] md:h-[620px] lg:h-[700px] xl:h-[760px]">
      <div className="w-full h-full flex items-center justify-center">
        {finished ? (
          <img
            src="/video/Ending-Metallic-Dot.png"
            alt="Ending metallic dot"
            className="h-full w-auto object-cover pointer-events-none select-none"
            draggable={false}
          />
        ) : (
          <video
            ref={videoRef}
            className="h-full w-auto object-cover pointer-events-none"
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
        )}
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 pb-12 sm:pb-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 text-center">
          <HeroTitle
            reveal={revealTitle}
            text="Nuclear doesn't have to be complicated."
            italicWord=""
            pauses={{ baseDelay: 0, step: 0.03, wordPauseMultiplier: 3, pauseAfterWord: { Nuclear: 1.0 } }}
          />
        </div>
      </div>
    </div>
  );
}
