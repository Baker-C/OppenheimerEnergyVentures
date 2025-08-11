export default function HeroVideo({ src = '/video/hero.mp4', poster = '/video/Ending-Metallic-Dot.png' }) {
  return (
    <div className="relative w-full aspect-[16/9] bg-black">
      <video
        className="w-full h-full object-cover pointer-events-none"
        autoPlay
        playsInline
        muted
        loop
        aria-hidden
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      {/* Bottom overlay text */}
  <div className="absolute inset-x-0 bottom-8 sm:bottom-12 md:bottom-16">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-6 sm:py-10 text-center">
          <p className="text-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-pop" aria-label={"Nuclear doesn't have to be complicated."}>
            {(() => {
              const text = "Nuclear doesn't have to be complicated.";
              const italicWord = 'have';
              const italicStart = text.indexOf(italicWord);
              const italicEnd = italicStart + italicWord.length - 1;
              const nuclearWord = 'Nuclear';
              const nuclearStart = text.indexOf(nuclearWord);
              const nuclearEnd = nuclearStart + nuclearWord.length - 1;
              const baseDelay = 0.5; // start after 0.5s
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
                    className={`letter-fade${isItalic ? ' italic' : ''}`}
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
            })()}
          </p>
        </div>
      </div>
    </div>
  );
}
