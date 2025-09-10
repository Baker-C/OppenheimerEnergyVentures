const KEY = 'theme'; // 'light' | 'dark'
const media = window.matchMedia('(prefers-color-scheme: dark)');

/**
 * Returns the current theme ("light" | "dark").
 * Prefers saved choice; otherwise falls back to:
 * - data-theme set by the boot script, or
 * - the system preference on first load.
 */
export function getTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch (_) {}
  const attr = document.documentElement?.dataset?.theme;
  if (attr === 'light' || attr === 'dark') return attr;
  return media.matches ? 'dark' : 'light';
}

/**
 * Applies and persists the theme, updates <html> state,
 * and emits a "themechange" event for listeners.
 */
export function applyTheme(next) {
  try { localStorage.setItem(KEY, next); } catch (_) {}
  const isDark = next === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.dataset.theme = next;
  window.dispatchEvent(new CustomEvent('themechange', { detail: { theme: next } }));
}