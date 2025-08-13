import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Information from './pages/Information';
import Footer from './components/Footer';

import { useEffect } from 'react';

function ObserverWrapper({ children }) {
  const location = useLocation();
  useEffect(() => {
    // Always reset scroll to top on route change
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
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
    }, {
      // Trigger as soon as any part of the element enters the viewport (no bottom cutoff)
      rootMargin: '0px',
      threshold: 0.0
    });
    document.querySelectorAll('.fade-up, .line-dot-animate').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [location]);
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <ObserverWrapper>
  <div className="min-h-screen bg-white text-primary flex flex-col cursor-default-all">
          <Nav />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/information" element={<Information />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ObserverWrapper>
    </BrowserRouter>
  );
}

export default App;
