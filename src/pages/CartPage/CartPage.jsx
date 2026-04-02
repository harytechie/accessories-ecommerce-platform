// src/pages/CartPage/CartPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductImage from '../../components/ProductImage/ProductImage';
import { products } from '../../data/products';
import './CartPage.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  const { addToast } = useToast();

  const handleRemove = () => {
    removeItem(item.cartId);
    addToast(`${item.name} removed from bag`, 'remove_shopping_cart');
  };

  return (
    <div className="cart-item">
      <div className="cart-item-img">
        <ProductImage
          product={item}
          style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }}
          showEmoji={false}
        />
      </div>

      <div className="cart-item-body">
        <h3 className="cart-item-name">{item.name}</h3>
        <div className="cart-item-meta">
          {item.selectedSize && <span className="cart-item-meta-chip">{item.selectedSize}</span>}
          {item.selectedColor && <span className="cart-item-meta-chip">{item.selectedColor}</span>}
        </div>

        <div className="cart-item-footer">
          <div className="qty-control">
            <button
              className="qty-btn"
              id={`cart-qty-dec-${item.cartId}`}
              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
              aria-label="Decrease quantity"
            >−</button>
            <span className="qty-number">{item.quantity}</span>
            <button
              className="qty-btn"
              id={`cart-qty-inc-${item.cartId}`}
              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
              aria-label="Increase quantity"
            >+</button>
          </div>

          <span className="cart-item-price">${(item.price * item.quantity).toFixed(2)}</span>

          <button
            className="cart-item-remove"
            id={`cart-remove-${item.cartId}`}
            onClick={handleRemove}
            aria-label={`Remove ${item.name}`}
          >
            <span className="material-icons" style={{ fontSize: '1.125rem' }}>delete_outline</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const CartPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, shipping, tax, total } = useCart();
  const { addToast } = useToast();
  const [promoCode, setPromoCode] = useState('');

  const recommendations = products
    .filter(p => !items.some(i => i.id === p.id))
    .slice(0, 4);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'ATELIER10') {
      addToast('10% discount applied! 🎉', 'local_offer');
    } else {
      addToast('Invalid promo code', 'error');
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-header">
          <div className="cart-header-inner">
            <h1 className="cart-title">Your Bag</h1>
          </div>
        </div>
        <div className="cart-empty animate-fade-in-up">
          <div className="cart-empty-emoji">🛍️</div>
          <h2 className="cart-empty-title">Your bag is empty</h2>
          <p className="cart-empty-text">
            Discover our curated collection of luxury shawls, thoughtful gifts, and beautiful accessories.
          </p>
          <button
            id="cart-start-shopping-btn"
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/products/all')}
          >
            <span className="material-icons" style={{ fontSize: '1.1rem' }}>auto_awesome</span>
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <div className="cart-header-inner">
          <button
            className="btn-icon"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            <span className="material-icons" style={{ fontSize: '1.25rem' }}>arrow_back</span>
          </button>
          <h1 className="cart-title">Your Curated Selection</h1>
          <span className="cart-count">{items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </div>
        <p className="cart-subtitle">Review your items before we prepare your package.</p>
      </div>

      <div className="cart-content">
        {/* Items */}
        <div className="cart-items-section">
          {items.map(item => <CartItem key={item.cartId} item={item} />)}

          {/* Promo code */}
          <div style={{ marginTop: 'var(--space-4)' }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-on-surface-variant)', marginBottom: 'var(--space-2)' }}>
              Promo Code
            </p>
            <div className="promo-input-row">
              <input
                id="promo-code-input"
                type="text"
                className="promo-input"
                placeholder="Enter code (try ATELIER10)"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
              />
              <button
                id="apply-promo-btn"
                className="btn btn-secondary"
                onClick={handleApplyPromo}
                style={{ flexShrink: 0 }}
              >
                Apply
              </button>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div className="cart-recommendations">
              <h3 className="cart-rec-title">You might also adore</h3>
              <div className="cart-rec-scroll">
                {recommendations.map(rec => (
                  <div
                    key={rec.id}
                    className="cart-rec-card"
                    onClick={() => navigate(`/product/${rec.id}`)}
                    role="button"
                    tabIndex={0}
                  >
                    <ProductImage product={rec} className="cart-rec-img" style={{ height: '120px' }} showEmoji={false} />
                    <div className="cart-rec-body">
                      <p className="cart-rec-name">{rec.name}</p>
                      <p className="cart-rec-price">${rec.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="cart-summary-section">
          <div className="cart-summary">
            <h2 className="cart-summary-title">Order Summary</h2>

            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span className="cart-summary-value">${subtotal.toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span className={`cart-summary-value ${shipping === 0 ? 'free' : ''}`}>
                {shipping === 0 ? 'Free ✓' : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="cart-summary-row">
              <span>Tax (5%)</span>
              <span className="cart-summary-value">${tax.toFixed(2)}</span>
            </div>

            {shipping > 0 && (
              <div style={{
                background: 'var(--color-surface-container-low)',
                borderRadius: 'var(--radius-md)',
                padding: 'var(--space-3)',
                fontSize: '0.8125rem',
                color: 'var(--color-on-surface-variant)',
                marginBottom: 'var(--space-2)',
              }}>
                Add <strong style={{ color: 'var(--color-primary)' }}>${(200 - subtotal).toFixed(2)}</strong> more for free shipping!
              </div>
            )}

            <div className="cart-summary-row total">
              <span>Total</span>
              <span className="cart-summary-value total-val">${total.toFixed(2)}</span>
            </div>

            <button
              id="cart-checkout-btn"
              className="btn btn-primary btn-full btn-lg"
              style={{ marginTop: 'var(--space-4)' }}
              onClick={() => navigate('/checkout')}
            >
              <span className="material-icons" style={{ fontSize: '1.1rem' }}>lock</span>
              Proceed to Checkout
            </button>

            <button
              id="cart-continue-shopping-btn"
              className="btn btn-secondary btn-full"
              style={{ marginTop: 'var(--space-3)' }}
              onClick={() => navigate('/products/all')}
            >
              Continue Shopping
            </button>

            <div className="cart-secure-badge">
              <span className="material-icons" style={{ fontSize: '0.875rem' }}>verified_user</span>
              Secure SSL Encryption & Private Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
