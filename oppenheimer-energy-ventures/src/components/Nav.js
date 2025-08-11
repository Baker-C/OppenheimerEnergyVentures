import { NavLink } from 'react-router-dom';

export default function Nav() {
  const linkClass = ({ isActive }) => `px-3 py-2 text-sm ${isActive ? 'text-accent' : 'text-primary hover:text-accent'}`;
  return (
    <header className="sticky top-0 inset-x-0 bg-white shadow-top-sm z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-center px-4 py-3">
        <nav className="flex items-center gap-3">
          <NavLink to="/" className={linkClass} end>Home</NavLink>
          <NavLink to="/information" className={linkClass}>Information</NavLink>
        </nav>
      </div>
    </header>
  );
}
