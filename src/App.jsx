// src/App.jsx
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header/Header';
import BottomNav from './components/BottomNav/BottomNav';
import HomePage from './pages/HomePage/HomePage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/Auth/LoginPage';
import SignupPage from './pages/Auth/SignupPage';
import AboutPage from './pages/AboutPage/AboutPage';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, loading } = useAuth();
  
  if (loading) return null; // Or a loading spinner
  
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const Layout = ({ children }) => (
  <>
    <ScrollToTop />
    <Header />
    <main style={{ minHeight: '100vh', paddingBottom: 'var(--bottom-nav-height)' }}>{children}</main>
    <BottomNav />
  </>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/products/:category" element={<Layout><ProductListPage /></Layout>} />
              <Route path="/product/:id" element={<Layout><ProductDetailPage /></Layout>} />
              <Route path="/cart" element={<Layout><CartPage /></Layout>} />
              <Route path="/checkout" element={<Layout><ProtectedRoute><CheckoutPage /></ProtectedRoute></Layout>} />
              <Route path="/profile" element={<Layout><ProfilePage /></Layout>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
            </Routes>
          </Router>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
