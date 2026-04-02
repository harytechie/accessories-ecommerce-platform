// src/pages/ProductDetailPage/ProductDetailPage.jsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { getProductById, products } from '../../data/products';
import ProductImage from '../../components/ProductImage/ProductImage';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetailPage.css';

const badgeClass = { Bestseller: 'badge-bestseller', New: 'badge-new', Sale: 'badge-sale', Limited: 'badge-limited' };

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { addToast } = useToast();

  const product = getProductById(id);

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  if (!product) {
    return (
      <div className="pdp-not-found page-wrapper">
        <span style={{ fontSize: '3rem' }}>🔍</span>
        <h2>Product not found</h2>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    );
  }

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;
  const related = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    addItem(product, quantity, selectedSize, selectedColor);
    addToast(`${product.name} added to your bag`, 'shopping_bag');
    setTimeout(() => setAddingToCart(false), 600);
  };

  return (
    <div className="pdp">
      {/* Back button */}
      <div className="pdp-back-btn">
        <button className="pdp-back-inner" onClick={() => navigate(-1)} id="pdp-back-btn">
          <span className="material-icons" style={{ fontSize: '1.125rem' }}>arrow_back</span>
          Back
        </button>
      </div>

      <div className="pdp-layout" style={{ padding: '0 var(--space-5)' }}>
        {/* Hero Image */}
        <div className="pdp-hero">
          <ProductImage
            product={product}
            className="pdp-hero-img"
            style={{
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: 'var(--radius-xl)',
              minHeight: '300px',
            }}
          />
          {product.badge && (
            <span className={`pdp-hero-badge product-card-badge ${badgeClass[product.badge]}`}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="pdp-content" style={{ padding: 'var(--space-4) 0' }}>
          <p className="pdp-category">{product.category}</p>
          <h1 className="pdp-name">{product.name}</h1>

          {/* Rating */}
          <div className="pdp-rating-row">
            <div className="pdp-rating">
              {[1,2,3,4,5].map(s => (
                <span key={s} className="material-icons">
                  {s <= Math.round(product.rating) ? 'star' : 'star_border'}
                </span>
              ))}
              <span className="pdp-rating-score">{product.rating}</span>
            </div>
            <span className="pdp-review-count">· {product.reviews} reviews</span>
          </div>

          {/* Price */}
          <div className="pdp-price-row">
            <span className="pdp-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="pdp-original-price">${product.originalPrice.toFixed(2)}</span>
                <span className="pdp-savings">Save ${savings.toFixed(2)}</span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="pdp-description">
            <p>{product.description}</p>
          </div>

          {/* Size selector */}
          {product.sizes.length > 1 && (
            <div className="pdp-option-section">
              <p className="pdp-option-label">
                Size · <span>{selectedSize}</span>
              </p>
              <div className="pdp-chips">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    id={`size-${size}`}
                    className={`chip ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color selector */}
          <div className="pdp-option-section">
            <p className="pdp-option-label">
              Color · <span>{selectedColor}</span>
            </p>
            <div className="pdp-chips">
              {product.colors.map(color => (
                <button
                  key={color}
                  id={`color-${color.replace(/\s+/g, '-')}`}
                  className={`chip ${selectedColor === color ? 'selected' : ''}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="pdp-details-section">
            <h3 className="pdp-details-title">Product Details</h3>
            <ul className="pdp-details-list">
              {product.details.map((detail, i) => (
                <li key={i} className="pdp-detail-item">
                  <span className="material-icons">fiber_manual_record</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section style={{ padding: '0 var(--space-5) var(--space-8)' }}>
          <div className="section-header">
            <h2 className="section-title">
              <span>You might also adore</span>
              Related Pieces
            </h2>
          </div>
          <div className="products-grid">
            {related.map(rp => <ProductCard key={rp.id} product={rp} />)}
          </div>
        </section>
      )}

      {/* Sticky add-to-cart bar */}
      <div className="pdp-sticky-bar">
        <div className="pdp-sticky-inner">
          <div className="pdp-sticky-price">
            <p className="pdp-sticky-price-label">Total</p>
            <p className="pdp-sticky-price-value">${(product.price * quantity).toFixed(2)}</p>
          </div>

          <div className="pdp-sticky-actions">
            {/* Quantity control */}
            <div className="qty-control">
              <button
                className="qty-btn"
                id="pdp-qty-decrease"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
              >−</button>
              <span className="qty-number">{quantity}</span>
              <button
                className="qty-btn"
                id="pdp-qty-increase"
                onClick={() => setQuantity(q => q + 1)}
                aria-label="Increase quantity"
              >+</button>
            </div>

            <button
              id="pdp-add-to-cart-btn"
              className="btn btn-primary btn-lg"
              onClick={handleAddToCart}
              disabled={addingToCart}
              style={{ minWidth: '140px' }}
            >
              {addingToCart ? (
                <>
                  <span className="material-icons" style={{ fontSize: '1rem', animation: 'spin 0.6s linear' }}>
                    check_circle
                  </span>
                  Added!
                </>
              ) : (
                <>
                  <span className="material-icons" style={{ fontSize: '1rem' }}>shopping_bag</span>
                  Add to Bag
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
