// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import HomePage from './pages/HomePage/HomePage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

const Layout = ({ children }) => (
  <>
    <Header />
    <main style={{ minHeight: '100vh' }}>{children}</main>
    <BottomNav />
  </>
);

function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/products/:category" element={<Layout><ProductListPage /></Layout>} />
            <Route path="/product/:id" element={<Layout><ProductDetailPage /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
            <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
          </Routes>
        </Router>
      </ToastProvider>
    </CartProvider>
  );
}

export default App;
