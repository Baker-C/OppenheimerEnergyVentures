import { useEffect, useState } from 'react';
import { applyTheme, getTheme } from '../utils/theme';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light'); // will sync on mount
  const [animating, setAnimating] = useState(false);

  // Sync with what's already applied by the boot script; no write to storage here.
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const current = getTheme();
      setTheme(current);
    }
  }, []);

  const handleThemeClick = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    setAnimating(true);
    applyTheme(next);
    // match your transition duration (700ms in class names below)
    const t = setTimeout(() => setAnimating(false), 700);
    return () => clearTimeout(t);
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="hover:cursor-none absolute right-10 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full overflow-hidden shadow-basic dark:glow-basic"
      style={{ zIndex: 30 }}
      onClick={handleThemeClick}
    >
      <span className="relative w-6 h-6 block">
        {/* Light icon: visible in light, hidden in dark */}
        <img
          src="/Light_Mode.png"
          alt="Light mode"
          className={`absolute inset-0 w-6 h-6 object-contain transition-opacity duration-700 block dark:hidden ${animating && !isDark ? 'spin-fade-in' : ''}`}
          draggable="false"
          style={{ pointerEvents: 'none' }}
        />
        {/* Dark icon: visible in dark, hidden in light */}
        <img
          src="/Dark_Mode.png"
          alt="Dark mode"
          className={`absolute inset-0 w-6 h-6 object-contain transition-opacity duration-700 hidden dark:block ${animating && isDark ? 'spin-fade-in' : ''}`}
          draggable="false"
          style={{ pointerEvents: 'none' }}
        />
      </span>
    </button>
  );
}