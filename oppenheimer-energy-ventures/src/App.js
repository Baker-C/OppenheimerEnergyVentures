import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Information from './pages/Information';

import { useEffect } from 'react';

function ObserverWrapper({ children }) {
  const location = useLocation();
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.fade-up, .line-dot-animate').forEach(el => el.classList.add('in-view'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          obs.unobserve(e.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    document.querySelectorAll('.fade-up, .line-dot-animate').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [location]);
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ObserverWrapper>
        <div className="min-h-screen bg-white text-primary">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/information" element={<Information />} />
          </Routes>
        </div>
      </ObserverWrapper>
    </BrowserRouter>
  );
}

export default App;
