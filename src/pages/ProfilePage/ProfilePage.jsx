// src/pages/ProfilePage/ProfilePage.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './ProfilePage.css';

const menuItems = [
  { icon: 'local_shipping', label: 'My Orders', subtitle: 'Track and review past orders' },
  { icon: 'favorite_border', label: 'Wishlist', subtitle: 'Your saved pieces' },
  { icon: 'location_on', label: 'Addresses', subtitle: 'Manage delivery addresses' },
  { icon: 'credit_card', label: 'Payment Methods', subtitle: 'Cards and payment options' },
  { icon: 'notifications_none', label: 'Notifications', subtitle: 'Order updates and promotions' },
  { icon: 'help_outline', label: 'Help & Support', subtitle: 'FAQ, returns, and contact' },
];

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

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
        {[
          { label: 'Orders', value: isLoggedIn ? '2' : '0' },
          { label: 'Wishlist', value: isLoggedIn ? '5' : '0' },
          { label: 'Reviews', value: isLoggedIn ? '1' : '0' },
        ].map(stat => (
          <div key={stat.label} className="profile-stat">
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
          <button key={item.label} className="profile-menu-item">
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
        <p>Version 1.0.0 · © 2025 Atelier Studio</p>
      </div>
    </div>
  );
};

export default ProfilePage;
