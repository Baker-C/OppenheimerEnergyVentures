import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Animated line-dot motif. Width can be 'fill' (100%) or a specific value (e.g. '4rem', '64px').
 * Usage: <LineDot width="fill" /> or <LineDot width="64px" />
 */
export default function LineDot({ width = '64px', className = '', ...props }) {
  // If width is 'fill', use w-full, else set style width
  const style = width === 'fill' ? {} : { width };
  const widthClass = width === 'fill' ? 'w-full' : '';

  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === 'undefined') return;

    // If the browser supports IntersectionObserver, start the animation only when
    // the element actually enters the viewport. Disconnect after first intersection
    // so the animation only plays once.
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.classList.add('in-view');
              obs.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    // Fallback for older browsers: keep the small timeout behavior.
    const t = setTimeout(() => el.classList.add('in-view'), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-block h-[6px] relative line-dot-animate ${widthClass} text-black dark:text-white ${className}`}
      style={style}
      aria-hidden
      {...props}
    />
  );
}

LineDot.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
