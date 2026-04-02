// src/components/BottomNav/BottomNav.jsx
import { useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './BottomNav.css';

const navItems = [
  { id: 'home', label: 'Home', icon: 'home', path: '/' },
  { id: 'shawls', label: 'Shawls', icon: 'styler', path: '/products/shawls' },
  { id: 'gifts', label: 'Gifts', icon: 'card_giftcard', path: '/products/gifts' },
  { id: 'profile', label: 'Profile', icon: 'person', path: '/profile' },
];

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bottom-nav" aria-label="Main navigation">
      <div className="bottom-nav-inner">
        {navItems.map(item => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
            aria-label={item.label}
            aria-current={isActive(item.path) ? 'page' : undefined}
          >
            <div className="nav-item-icon-wrap">
              <div className="nav-item-icon-bg" />
              <span className="material-icons nav-item-icon">{item.icon}</span>
              {item.id === 'home' && totalItems > 0 && (
                <span className="nav-item-badge">{totalItems}</span>
              )}
            </div>
            <span className="nav-item-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
