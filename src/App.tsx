import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ShopCMS from './pages/ShopCMS';
import { LayoutDashboard } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      {/* Admin Toggle - Hidden floating button for demo purposes */}
      <div className="fixed top-28 left-6 z-40">
        <Link to="/admin" className="w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-accent hover:text-dark transition-all shadow-lg" title="Go to CMS">
          <LayoutDashboard size={18} />
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<ShopCMS />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
