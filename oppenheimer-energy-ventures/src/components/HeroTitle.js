import home from '../data/home.json';

// Animated per-letter hero title
export default function HeroTitle() {
  // assume home.title is [['O','P','P',...], ['E','N','E','R','G','Y']]
  const title = home.title;
  const baseDelay = 0.065;
  const specialLetters = ['O', 'P', 'G', 'Y', 'R'];

  const spans = title.map((word, wordIndex) => (
    <span key={wordIndex} className="whitespace-nowrap">
      {word.map((letter, letterIndex) => (
        <span
          key={letterIndex}
          className={`letter-fade inline-block ${
            letterIndex < word.length - 1
              ? specialLetters.includes(letter.toUpperCase())
                ? 'mr-0.5 xsm:mr-1.5 sm:mr-2 md:mr-3 lg:mr-4 xl:mr-5'
                : 'mr-1 xsm:mr-2 sm:mr-3 md:mr-4 lg:mr-6 xl:mr-7'
              : ''
          }`}
          style={{
            animationDelay: `${
              (wordIndex * word.length * .14) + (letterIndex * baseDelay)
            }s`,
          }}
        >
          <img
            src={`/vectors/${letter.toUpperCase()}.png`}
            alt={letter}
            className="inline-block 
              h-4
              xsm:h-6
              sm:h-8
              md:h-10
              lg:h-12
              xl:h-16"
          />
        </span>
      ))}
    </span>
  ));

  return (
    <div
      className={`tracking-tight text-pop flex whitespace-nowrap justify-center items-center text-center
        gap-x-4
        xsm:gap-x-8
        sm:gap-x-10
        md:gap-x-12
        lg:gap-x-14
        xl:gap-x-20`}
    >
      {spans}
    </div>
  );
}
