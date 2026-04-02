// src/components/ProductCard/ProductCard.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductImage from '../ProductImage/ProductImage';
import './ProductCard.css';

const badgeClass = {
  Bestseller: 'badge-bestseller',
  New: 'badge-new',
  Sale: 'badge-sale',
  Limited: 'badge-limited',
};

const RatingStars = ({ rating }) => {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} className="material-icons" style={{ fontSize: '0.875rem' }}>
          {star <= Math.floor(rating)
            ? 'star'
            : star - rating < 1 && star - rating > 0
            ? 'star_half'
            : 'star_border'}
        </span>
      ))}
    </div>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addToast } = useToast();
  const [wishlisted, setWishlisted] = useState(false);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    addItem(product, 1, product.sizes[0], product.colors[0]);
    addToast(`${product.name} added to cart`, 'shopping_bag');
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setWishlisted(prev => !prev);
    addToast(
      wishlisted ? 'Removed from wishlist' : 'Added to wishlist',
      wishlisted ? 'favorite_border' : 'favorite'
    );
  };

  return (
    <article
      className="product-card animate-fade-in-up"
      onClick={() => navigate(`/product/${product.id}`)}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name}`}
      onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${product.id}`)}
    >
      <div className="product-card-img-container">
        <ProductImage
          product={product}
          className="product-card-img"
          style={{ height: '100%', aspectRatio: '3/4' }}
        />

        <div className="product-card-img-overlay">
          <button
            className="product-card-quick-add"
            onClick={handleQuickAdd}
            id={`quick-add-${product.id}`}
            aria-label={`Quick add ${product.name} to cart`}
          >
            <span className="material-icons" style={{ fontSize: '1rem' }}>add_shopping_cart</span>
            Quick Add
          </button>
        </div>

        {product.badge && (
          <span className={`product-card-badge ${badgeClass[product.badge] || ''}`}>
            {product.badge}
          </span>
        )}

        <button
          className={`product-card-wishlist ${wishlisted ? 'wishlisted' : ''}`}
          onClick={handleWishlist}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <span className="material-icons" style={{ fontSize: '1.1rem' }}>
            {wishlisted ? 'favorite' : 'favorite_border'}
          </span>
        </button>
      </div>

      <div className="product-card-body">
        <p className="product-card-category">{product.category}</p>
        <h3 className="product-card-name">{product.name}</h3>
        <div className="product-card-rating">
          <RatingStars rating={product.rating} />
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="product-card-price-row">
          <span className="product-card-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="product-card-original-price">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
