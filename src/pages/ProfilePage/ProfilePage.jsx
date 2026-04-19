// src/pages/ProfilePage/ProfilePage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { getOrdersFS } from '../../services/firestoreService';
import './ProfilePage.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, isAdmin } = useAuth();
  const { wishlistCount } = useWishlist();
  const { totalItems } = useCart();
  const [orderCount, setOrderCount] = useState(0);

  // Fetch order count from Firestore
  useEffect(() => {
    if (!isLoggedIn || !user?.uid) {
      setOrderCount(0);
      return;
    }
    getOrdersFS(user.uid)
      .then((orders) => setOrderCount(orders.length))
      .catch((err) => console.error('Failed to fetch order count:', err));
  }, [user?.uid, isLoggedIn]);

  const stats = [
    { label: 'Orders', value: isLoggedIn ? String(orderCount) : '0', path: '/orders' },
    { label: 'Wishlist', value: isLoggedIn ? String(wishlistCount) : '0', path: '/wishlist' },
    { label: 'Cart', value: isLoggedIn ? String(totalItems) : '0', path: '/cart' },
  ];

  const menuItems = [
    ...(isAdmin ? [{ icon: 'admin_panel_settings', label: 'Admin Panel', subtitle: 'Manage products, orders & users', path: '/admin' }] : []),
    { icon: 'receipt_long', label: 'My Orders', subtitle: 'Track and review past orders', path: '/orders' },
    { icon: 'favorite_border', label: 'Wishlist', subtitle: 'Your saved pieces', path: '/wishlist' },
    { icon: 'shopping_bag', label: 'My Cart', subtitle: 'View items in your cart', path: '/cart' },
    { icon: 'location_on', label: 'Addresses', subtitle: 'Manage delivery addresses', path: null },
    { icon: 'credit_card', label: 'Payment Methods', subtitle: 'Cards and payment options', path: null },
    { icon: 'notifications_none', label: 'Notifications', subtitle: 'Order updates and promotions', path: null },
    { icon: 'help_outline', label: 'Help & Support', subtitle: 'FAQ, returns, and contact', path: '/help' },
  ];

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {isLoggedIn && user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="profile-avatar-img" />
          ) : (
            <span className="material-icons" style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>person</span>
          )}
        </div>
        <div className="profile-info">
          <h1 className="profile-name">{isLoggedIn ? `Welcome, ${user?.name || 'User'}` : 'Welcome, Guest'}</h1>
          <p className="profile-email">{isLoggedIn ? user?.email : 'Sign in to access your account'}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="profile-stats">
        {stats.map(stat => (
          <div
            key={stat.label}
            className="profile-stat"
            onClick={() => stat.path && navigate(stat.path)}
            style={{ cursor: stat.path ? 'pointer' : 'default' }}
          >
            <span className="profile-stat-value">{stat.value}</span>
            <span className="profile-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Sign in CTA / Logout */}
      <div className="profile-cta">
        {isLoggedIn ? (
          <button
            id="profile-logout-btn"
            className="btn btn-secondary btn-full btn-lg"
            onClick={() => logout()}
          >
            <span className="material-icons" style={{ fontSize: '1.1rem' }}>logout</span>
            Sign Out
          </button>
        ) : (
          <button
            id="profile-signin-btn"
            className="btn btn-primary btn-full btn-lg"
            onClick={() => navigate('/login')}
          >
            <span className="material-icons" style={{ fontSize: '1.1rem' }}>login</span>
            Sign In / Create Account
          </button>
        )}
      </div>

      {/* Menu */}
      <div className="profile-menu">
        {menuItems.map(item => (
          <button
            key={item.label}
            className="profile-menu-item"
            onClick={() => item.path && navigate(item.path)}
            style={{ opacity: item.path ? 1 : 0.65 }}
          >
            <div className="profile-menu-icon">
              <span className="material-icons" style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            </div>
            <div className="profile-menu-body">
              <p className="profile-menu-label">{item.label}</p>
              <p className="profile-menu-subtitle">{item.subtitle}</p>
            </div>
            <span className="material-icons profile-menu-arrow">chevron_right</span>
          </button>
        ))}
      </div>

      {/* App version */}
      <div className="profile-footer">
        <p>Atelier Boutique</p>
        <p>Version 1.0.0 · A Creation by Hary © 2026</p>
      </div>
    </div>
  );
};

export default ProfilePage;
