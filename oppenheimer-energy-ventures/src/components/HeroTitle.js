import React from 'react';

// Animated per-letter hero title
export default function HeroTitle({
  text = "Nuclear doesn't have to be complicated.",
  reveal = false,
  italicWord = 'have', // pass null/undefined/'' to disable italics
  pauses = { baseDelay: 0, step: 0.03, wordPauseMultiplier: 3, pauseAfterWord: { Nuclear: 1.0 } },
  className = ''
}) {
  if (!reveal) return null;

  const { baseDelay, step, wordPauseMultiplier, pauseAfterWord } = pauses;
  const italicEnabled = italicWord && italicWord.length > 0;
  const italicStart = italicEnabled ? text.indexOf(italicWord) : -1;
  const italicEnd = italicEnabled && italicStart >= 0 ? italicStart + italicWord.length - 1 : -1;

  // Determine end indices for each word to allow custom pauses
  const words = text.split(/(\s+)/); // keep spaces tokens
  let cursor = 0;
  const wordEnds = [];
  words.forEach(w => {
    if (!w.trim()) { cursor += w.length; return; }
    const clean = w.replace(/[^A-Za-z'.-]/g, '');
    const end = cursor + w.length - 1;
    wordEnds.push({ word: clean, end });
    cursor += w.length;
  });

  let t = baseDelay;
  const spans = [];
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const displayChar = ch === ' ' ? '\u00A0' : ch;
  const isItalic = italicEnabled && i >= italicStart && i <= italicEnd && italicStart !== -1;
    spans.push(
      <span
        key={i}
        className={`letter-fade${isItalic ? ' italic' : ''}`}
        style={{ animationDelay: `${t}s` }}
      >
        {displayChar}
      </span>
    );
    const boundary = wordEnds.find(w => w.end === i);
    if (boundary && pauseAfterWord[boundary.word]) {
      t += pauseAfterWord[boundary.word];
    }
    t += step;
    if (ch === ' ') t += step * (wordPauseMultiplier - 1);
  }

  return (
    <p
      className={`text-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-pop font-heading ${className}`}
      aria-label={text}
    >
      {spans}
    </p>
  );
}
