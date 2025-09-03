import React from 'react';
import LineDot from './LineDot';

const logoMinWidth = 400;

const StaticHeroLogo = () => {
  const isWideEnough = window.innerWidth >= logoMinWidth;

  return (
    <div className="flex items-center w-full">
      <div className="flex items-center w-[50%] min-w-[400px]">
        <img
          src="/vectors/Logo_With_Words.png"
          alt="Hero Logo"
          className="w-full max-w-[100%] object-contain"
        />
      </div>
      {isWideEnough && (
        <div className="flex-grow">
          <LineDot width="100%" />
        </div>
      )}
    </div>
  );
}



const DynamicHeroLogo_1 = () => {
  const isWideEnough = window.innerWidth >= logoMinWidth;

  const title = [
    ['O', 'p', 'p', 'e', 'n', 'h', 'e', 'i', 'm', 'e', 'r'],
    ['L'],
    ['E', 'n', 'e', 'r', 'g', 'y']
  ];

  const letterDelay = 0.065;
  const specialLetters = ['O', 'P', 'G', 'Y', 'R']; // List of letters that need balanced spacing

  const spans = title.map((word, wordIndex) => {
    if (wordIndex === 1) {
      return (
        <div key={wordIndex} className="w-full">
          <LineDot width="100%" />
        </div>
      );
    }

    const previousWordLength = title[wordIndex - 1]?.length || 0;
    const wordDelay = wordIndex * previousWordLength * 0.1; // Delay based on previous word length

    return (
      <div
        key={wordIndex}
        className={'flex justify-between w-full whitespace-nowrap pe-5 ps-2'}
      >
        {word.map((letter, letterIndex) => (
          <span
            key={letterIndex}
            className={`letter-fade inline-block`}
            style={{ animationDelay: `${wordDelay + letterIndex * letterDelay}s` }}
          >
            <img
              src={`/vectors/${letter.toUpperCase()}.png`}
              alt={letter}
              className="inline-block h-4 xsm:h-6 sm:h-7 md:h-9 lg:h-10 xl:h-12"
            />
          </span>
        ))}
      </div>
    );
  });

  return (
    <div className="flex items-center w-full gap-4" style={{ height: 'auto' }}>
      <div className="flex items-center" style={{ height: '100%' }}>
        <img
          src="/vectors/Logo_Without_Words.png"
          alt="Hero Logo Without Words"
          className="object-contain  h-12 xsm:h-14 sm:h-18 md:h-20 lg:h-22 xl:h-60"
        />
      </div>
      {isWideEnough && (
        <h1
          className="tracking-tight text-pop flex flex-wrap gap-x-6 gap-y-0 sm:gap-x-8 sm:gap-y-4 md:gap-x-12 md:gap-y-6 lg:gap-x-16 lg:gap-y-2 xl:gap-x-20 justify-start items-start"
        >
          {spans.map((span, index) => (
            <React.Fragment key={index}>{span}</React.Fragment>
          ))}
        </h1>
      )}
    </div>
  );
};




const DynamicHeroLogo_2 = () => {
  const isWideEnough = window.innerWidth >= logoMinWidth;

  const title = [
    ['O', 'p', 'p', 'e', 'n', 'h', 'e', 'i', 'm', 'e', 'r'],
    ['E', 'n', 'e', 'r', 'g', 'y']
  ];

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
                  ? 'mr-1 sm:mr-3 md:mr-4 lg:mr-5 xl:mr-4.5'
                  : 'mr-2 sm:mr-4 md:mr-5 lg:mr-6 xl:mr-5'
                : ''
            }`}
            style={{ animationDelay: `${wordDelay + letterIndex * letterDelay}s` }}
          >
            <img
              src={`/vectors/${letter.toUpperCase()}.png`}
              alt={letter}
              className="inline-block h-2 xsm:h-4 sm:h-8 md:h-10 lg:h-12 xl:h-6"
            />
          </span>
        ))}
      </span>
    );
  });

  return (
    <div className="flex items-center w-full gap-4">
        <div className="flex items-center">
          <img
            src="/vectors/Logo_Without_Words.png"
            alt="Hero Logo Without Words"
            className="object-contain  h-12 xsm:h-14 sm:h-18 md:h-20 lg:h-22 xl:h-40"
          />
        </div>
        <div className="flex flex-col items-start w-full gap-4 pb-10">
        {isWideEnough && (
          <h1
            className="tracking-tight text-pop flex 
            gap-x-6 gap-y-0 
            sm:gap-x-8 sm:gap-y-4 
            md:gap-x-12 md:gap-y-6 
            lg:gap-x-16 lg:gap-y-2 
            xl:gap-x-20 
            justify-start items-start"
          >
            {spans.map((span, index) => (
              <React.Fragment key={index}>{span}</React.Fragment>
            ))}
          </h1>
        )}
        <LineDot width='100%' />
      </div>
    </div>
  );
};

const DynamicHeroLogo_3 = () => {
  const isWideEnough = window.innerWidth >= logoMinWidth;

  const title = [
    ['O', 'p', 'p', 'e', 'n', 'h', 'e', 'i', 'm', 'e', 'r'],
    ['E', 'n', 'e', 'r', 'g', 'y']
  ];

  const letterDelay = 0.065;
  const specialLetters = ['O', 'P', 'G', 'Y', 'R']; // List of letters that need balanced spacing

  const spans = title.map((word, wordIndex) => {

    const previousWordLength = title[wordIndex - 1]?.length || 0;
    const wordDelay = wordIndex * previousWordLength * 0.1; // Delay based on previous word length

    return (
      <div
        key={wordIndex}
        className={'flex justify-between w-full whitespace-nowrap pe-5 ps-2'}
      >
        {word.map((letter, letterIndex) => (
          <span
            key={letterIndex}
            className={`letter-fade inline-block`}
            style={{ animationDelay: `${wordDelay + letterIndex * letterDelay}s` }}
          >
            <img
              src={`/vectors/${letter.toUpperCase()}.png`}
              alt={letter}
              className="inline-block h-4 xsm:h-6 sm:h-7 md:h-9 lg:h-10 xl:h-12"
            />
          </span>
        ))}
      </div>
    );
  });

  return (
    <div className="flex items-center w-full gap-4" style={{ height: 'auto' }}>
      <div className="flex items-center" style={{ height: '100%' }}>
        <img
          src="/vectors/Logo_Without_Words.png"
          alt="Hero Logo Without Words"
          className="object-contain  h-12 xsm:h-14 sm:h-18 md:h-20 lg:h-22 xl:h-44"
        />
      </div>
      {isWideEnough && (
        <h1
          className="tracking-tight text-pop flex flex-wrap 
          gap-x-6 gap-y-0 
          sm:gap-x-8 sm:gap-y-4 
          md:gap-x-12 md:gap-y-6 
          lg:gap-x-16 lg:gap-y-2 
          xl:gap-x-20 xl:gap-y-4 justify-start items-start"
        >
          {spans.map((span, index) => (
            <React.Fragment key={index}>{span}</React.Fragment>
          ))}
        </h1>
      )}
    </div>
  );
};


const DynamicHeroLogo_4 = () => {
  const isWideEnough = window.innerWidth >= logoMinWidth;

  const title = [
    ['O', 'p', 'p', 'e', 'n', 'h', 'e', 'i', 'm', 'e', 'r', ' ', 'E', 'n', 'e', 'r', 'g', 'y']
  ];

  const letterDelay = 0.065;
  const specialLetters = ['o', 'g', 'y', 'r']; // List of letters that need balanced spacing

  const spans = title.map((letter, letterIndex) => {
    const letterDelay = letterIndex * 0.1;

    return (
          <span
            key={letterIndex}
            className={`letter-fade inline-block ${
              letterIndex < letter.length - 1
                ? specialLetters.includes(letter)
                  ? 'mr-1 sm:mr-3 md:mr-4 lg:mr-5 xl:mr-1.5'
                  : 'mr-2 sm:mr-4 md:mr-5 lg:mr-6 xl:mr-2'
                : ''
            }`}
            style={{ animationDelay: `${letterDelay + letterIndex * letterDelay}s` }}
          >
            <img
              src={`/vectors/${letter.toUpperCase()}.png`}
              alt={letter}
              className="inline-block h-2 xsm:h-4 sm:h-8 md:h-10 lg:h-12 xl:h-12"
            />
          </span>
        );
    });

  return (
    <div className="flex flex-col items-center w-full gap-16">
        <div className="flex items-center">
          <img
            src="/vectors/Logo_Without_Words.png"
            alt="Hero Logo Without Words"
            className="object-contain h-12 xsm:h-14 sm:h-18 md:h-20 lg:h-22 xl:h-72"
          />
        </div>
        {isWideEnough && (
          <h1
            className="tracking-tight text-pop flex flex-wrap 
            gap-x-6 gap-y-4 
            sm:gap-x-8 sm:gap-y-4 
            md:gap-x-12 md:gap-y-6 
            lg:gap-x-16 lg:gap-y-2 
            xl:gap-x-20 xl:gap-y-10
            justify-center items-center"
          >
            {spans.map((span, index) => (
              <React.Fragment key={index}>{span}</React.Fragment>
            ))}
          </h1>
        )}
      </div>
  );
};


export default function HeroLogo() {
  return <DynamicHeroLogo_4 />;
}