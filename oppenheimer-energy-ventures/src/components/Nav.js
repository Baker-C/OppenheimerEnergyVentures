import { NavLink } from 'react-router-dom';

export default function Nav() {
  const linkClass = ({ isActive }) => [
    'px-4 pt-3 pb-4 text-lg sm:text-xl font-semibold tracking-wide border-b-2 transition-colors',
    isActive ? 'text-accent border-accent' : 'text-primary border-transparent hover:border-gray-300'
  ].join(' ');
  const handleClick = (e) => {
    // Remove focus after click so outline doesn't linger post-navigation
    e.currentTarget.blur();
  };
  return (
    <header className="sticky top-0 inset-x-0 bg-white shadow-bottom-hard z-20">
      <div className="max-w-5xl mx-auto flex items-center justify-center px-4 py-4">
        <nav className="flex items-center gap-3">
          <NavLink to="/" className={linkClass} onClick={handleClick} end>Home</NavLink>
          <NavLink to="/information" className={linkClass} onClick={handleClick}>Information</NavLink>
        </nav>
      </div>
    </header>
  );
}
