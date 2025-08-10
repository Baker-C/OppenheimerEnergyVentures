import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Nav from './components/Nav';
import Home from './pages/Home';
import Information from './pages/Information';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-primary">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/information" element={<Information />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
