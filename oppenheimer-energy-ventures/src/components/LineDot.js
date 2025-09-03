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
    if (!el) return;
    // If the element is mounted after a delay, ensure the animation runs by adding `in-view`.
    // Small timeout lets the browser register layout before starting the animation.
    const t = setTimeout(() => el.classList.add('in-view'), 10);
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      ref={ref}
      className={`inline-block h-[6px] relative line-dot-animate ${widthClass} ${className}`}
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
