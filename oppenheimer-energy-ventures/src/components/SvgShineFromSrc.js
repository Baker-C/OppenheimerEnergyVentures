import React, { useMemo } from "react";

export function SvgShineFromSrc({
  src,
  mode = "dark",
  width,
  height,
  viewBox = "0 0 220 60",
  duration = 2,
  delay = 0.6,
  className,
  ariaLabel = "Logo",
}) {
  const uid = useMemo(() => Math.random().toString(36).slice(2, 9), []);
  const maskId = `logo-mask-${uid}`;
  const brightGradId = `shine-bright-${uid}`;
  const darkGradId = `shine-dark-${uid}`;
  const sweepKF = `shine-sweep-${uid}`;

  const css = `
    @keyframes ${sweepKF} {
      to { transform: translateX(180%) skewX(-18deg); }
    }
    .shine-band {
      pointer-events: none;
      filter: blur(0.5px);
      transform: skewX(-18deg);
      transform-box: fill-box;
      transform-origin: center;
      animation: ${sweepKF} ${duration}s ease-out ${delay}s 1 forwards;
    }
    .bright { mix-blend-mode: screen; }
    .dark   { mix-blend-mode: multiply; }
    @media (prefers-reduced-motion: reduce) { .shine-band { animation: none; } }
  `;

  return (
    <svg
      className={className}
      viewBox={viewBox}
      width={width}
      height={height}
      role="img"
      aria-label={ariaLabel}
    >
      <style>{css}</style>
      <defs>
        {/* Convert the image’s luminance to a mask: opaque logo = visible */}
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {/* Important: your logo.svg must NOT include a solid background rectangle */}
          <image
            href={src}
            x="0"
            y="0"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
          />
        </mask>

        <linearGradient id={brightGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.45" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="0.50" stopColor="#fff" stopOpacity="0.65" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.12" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={darkGradId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0" />
          <stop offset="0.45" stopColor="#000" stopOpacity="0.14" />
          <stop offset="0.50" stopColor="#000" stopOpacity="0.50" />
          <stop offset="0.55" stopColor="#000" stopOpacity="0.14" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Draw the logo */}
      <image
        href={src}
        x="0"
        y="0"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      />

      {/* Sweep, confined to the logo via mask */}
      <g mask={`url(#${maskId})`}>
        {mode === "light" ? (
          <rect
            className="shine-band bright"
            x="-65%"
            y="-5%"
            width="35%"
            height="110%"
            fill={`url(#${brightGradId})`}
          />
        ) : (
          <rect
            className="shine-band dark"
            x="-65%"
            y="-5%"
            width="35%"
            height="110%"
            fill={`url(#${darkGradId})`}
          />
        )}
      </g>
    </svg>
  );
}