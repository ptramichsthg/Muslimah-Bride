import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ShopCMS from './pages/ShopCMS';
import CartDrawer from './components/CartDrawer';


function App() {
  return (
    <BrowserRouter>


      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<ShopCMS />} />
      </Routes>
      <CartDrawer />
    </BrowserRouter>
  );
}

export default App;
