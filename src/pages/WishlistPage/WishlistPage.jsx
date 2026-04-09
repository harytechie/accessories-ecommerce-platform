// src/pages/WishlistPage/WishlistPage.jsx
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './WishlistPage.css';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { wishlist, wishlistCount, loading } = useWishlist();

  return (
    <div className="wishlist-page">
      {/* Header */}
      <div className="wishlist-header">
        <button
          className="wishlist-header-back"
          onClick={() => navigate('/profile')}
          aria-label="Go back to profile"
        >
          <span className="material-icons" style={{ fontSize: '1.25rem' }}>arrow_back</span>
        </button>
        <h1 className="wishlist-header-title">My Wishlist</h1>
        {wishlistCount > 0 && (
          <span className="wishlist-count-badge">{wishlistCount}</span>
        )}
      </div>

      <div className="wishlist-content">
        {loading ? (
          <div className="wishlist-loading">
            <div className="wishlist-loading-spinner" />
            <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9375rem' }}>
              Loading your wishlist...
            </p>
          </div>
        ) : wishlistCount === 0 ? (
          <div className="wishlist-empty">
            <span className="wishlist-empty-icon">💝</span>
            <h2 className="wishlist-empty-title">Your wishlist is empty</h2>
            <p className="wishlist-empty-subtitle">
              Save items you love to find them easily later.
            </p>
            <button
              className="btn btn-primary"
              style={{ marginTop: 'var(--space-2)' }}
              onClick={() => navigate('/products/all')}
            >
              <span className="material-icons" style={{ fontSize: '1rem' }}>explore</span>
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="wishlist-grid animate-fade-in-up">
            {wishlist.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
