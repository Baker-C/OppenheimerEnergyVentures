import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Nav() {
  const linkClass = ({ isActive }) => [
    'px-4 pt-3 pb-4 text-lg sm:text-xl font-semibold tracking-wide border-b-2 transition-colors cursor-none',
    isActive ? 'text-accent border-accent' : 'border-transparent hover:border-gray-300'
  ].join(' ');
  const handleClick = (e) => {
    e.currentTarget.blur();
  };

  return (
    <header className="bg-white dark:bg-black shadow-sm shadow-gray-300/70 sticky top-0 inset-x-0 shadow-bottom-hard z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-center px-4 py-4 relative">
        <nav className="flex items-center gap-3">
          <NavLink to="/" className={linkClass} onClick={handleClick} end>Home</NavLink>
          <NavLink to="/information" className={linkClass} onClick={handleClick}>Information</NavLink>
        </nav>
        {/* Theme toggle button */}
        <ThemeToggle className="absolute right-4 top-1/2 -translate-y-1/2" />
      </div>
    </header>
  );
}
