// src/components/Header/Header.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <div className="header-logo" onClick={() => navigate('/')} role="button" tabIndex={0}>
          <span className="header-logo-title">Atelier</span>
          <span className="header-logo-tagline">The Digital Boutique</span>
        </div>

        <div className="header-actions">
          <button
            id="header-search-btn"
            className="header-search-btn"
            aria-label="Search"
          >
            <span className="material-icons" style={{ fontSize: '1.375rem' }}>search</span>
          </button>

          <button
            id="header-cart-btn"
            className="header-cart-btn"
            aria-label={`Shopping cart, ${totalItems} items`}
            onClick={() => navigate('/cart')}
          >
            <span className="material-icons" style={{ fontSize: '1.375rem' }}>shopping_bag</span>
            {totalItems > 0 && (
              <span className="header-cart-badge">{totalItems}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
