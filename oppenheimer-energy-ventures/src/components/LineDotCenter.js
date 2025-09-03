import React from 'react';
import PropTypes from 'prop-types';

/**
 * Centered animated line-dot motif. Two dots start in the center and shoot out left/right.
 * Usage: <LineDotCenter width="fill" /> or <LineDotCenter width="64px" />
 */
export default function LineDotCenter({ width = '64px', className = '', ...props }) {
  const style = width === 'fill' ? {} : { width };
  const widthClass = width === 'fill' ? 'w-full' : '';
  return (
    <span
      className={`inline-block relative line-dot-center-animate ${widthClass} ${className}`}
      style={style}
      aria-hidden
      {...props}
    >
      <i aria-hidden />
    </span>
  );
}

LineDotCenter.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
};
