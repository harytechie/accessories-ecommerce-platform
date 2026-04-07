// src/components/Header/Header.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products/all?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <div className="header-logo" onClick={() => navigate('/')} role="button" tabIndex={0}>
          <span className="header-logo-title">Atelier</span>
          <span className="header-logo-tagline">The Digital Boutique</span>
        </div>

        <div className="header-actions">
          <div className={`header-search-container ${isSearchOpen ? 'open' : ''}`}>
            <input
              type="text"
              className="header-search-input"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
              onBlur={() => !searchQuery && setIsSearchOpen(false)}
            />
            <button
              id="header-search-btn"
              className="header-search-btn"
              aria-label="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <span className="material-icons" style={{ fontSize: '1.375rem' }}>{isSearchOpen ? 'close' : 'search'}</span>
            </button>
          </div>

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

          <button
            id="header-profile-btn"
            className={`header-profile-btn ${isLoggedIn ? 'active' : ''}`}
            aria-label="Profile"
            onClick={() => navigate('/profile')}
          >
            {isLoggedIn && user?.avatar ? (
              <img src={user.avatar} alt="Profile" className="header-profile-avatar" />
            ) : (
              <span className="material-icons" style={{ fontSize: '1.375rem', color: isLoggedIn ? 'var(--color-primary)' : 'inherit' }}>
                {isLoggedIn ? 'account_circle' : 'person'}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
