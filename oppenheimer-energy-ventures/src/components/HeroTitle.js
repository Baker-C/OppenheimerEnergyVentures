import React from 'react';
import home from '../data/home.json';

// Animated per-letter hero title
export default function HeroTitle({
  reveal = false,
  className = ''
}) {
  if (!reveal) return null;

  const title = home.title;
  const letterDelay = 0.065;
  const specialLetters = ['O', 'P', 'G', 'Y', 'R']; // List of letters that need balanced spacing
  const spans = title.map((word, wordIndex) => {
    const previousWordLength = title[wordIndex - 1]?.length || 0;
    const wordDelay = wordIndex * previousWordLength * 0.1; // Delay based on previous word length

    return (
      <span key={wordIndex} className="whitespace-nowrap">
        {word.map((letter, letterIndex) => (
          <span
            key={letterIndex}
            className={`letter-fade inline-block ${
              letterIndex < word.length - 1
                ? specialLetters.includes(letter.toUpperCase())
                  ? 'mr-1 sm:mr-3 md:mr-4 lg:mr-5 xl:mr-6'
                  : 'mr-2 sm:mr-4 md:mr-5 lg:mr-6 xl:mr-7'
                : ''
            }`}
            style={{ animationDelay: `${wordDelay + letterIndex * letterDelay}s` }}
          >
            <img
              src={`/vectors/${letter.toUpperCase()}.png`}
              alt={letter}
              className="inline-block h-4 xsm:h-6 sm:h-7 md:h-9 lg:h-10 xl:h-12"
            />
          </span>
        ))}
      </span>
    );
  });

  return (
    <h1
      className={`tracking-tight text-pop flex flex-wrap gap-x-6 gap-y-2 sm:gap-x-8 sm:gap-y-4 md:gap-x-12 md:gap-y-6 lg:gap-x-16 lg:gap-y-8 xl:gap-x-20 justify-center items-center text-center ${className}`}
    >
      {spans.map((span, index) => (
        <React.Fragment key={index}>
          {span}
        </React.Fragment>
      ))}
    </h1>
  );
}
