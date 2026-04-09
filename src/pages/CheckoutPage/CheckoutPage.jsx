// src/pages/CheckoutPage/CheckoutPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import ProductImage from '../../components/ProductImage/ProductImage';
import './CheckoutPage.css';

const STEPS = [
  { id: 'contact', label: 'Contact' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'payment', label: 'Payment' },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, shipping, tax, total, clearCart } = useCart();
  const { addToast } = useToast();

  const [currentStep, setCurrentStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United Arab Emirates',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsProcessing(false);
    setOrderPlaced(true);
    clearCart();
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page">
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <span style={{ fontSize: '3rem' }}>🛍️</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', marginTop: '1rem' }}>Your bag is empty</h2>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => navigate('/products/all')}>
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    const orderNum = `ATL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    return (
      <div className="checkout-page">
        <div className="checkout-success animate-fade-in-up">
          <div className="checkout-success-icon">
            <span className="material-icons">check</span>
          </div>
          <h1 className="checkout-success-title">Order Placed!</h1>
          <p className="checkout-success-text">
            Your curated selection is being carefully prepared. You'll receive a confirmation email shortly.
          </p>
          <div className="checkout-order-number">
            <p>Order Reference</p>
            <strong>{orderNum}</strong>
          </div>
          <button
            id="order-success-home-btn"
            className="btn btn-primary btn-lg btn-full"
            onClick={() => navigate('/')}
          >
            <span className="material-icons" style={{ fontSize: '1.1rem' }}>home</span>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <div className="checkout-header-inner">
          <button className="btn-icon" onClick={() => navigate('/cart')} id="checkout-back-btn">
            <span className="material-icons" style={{ fontSize: '1.25rem' }}>arrow_back</span>
          </button>
          <h1 className="checkout-title">Checkout</h1>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="checkout-progress">
        <div className="checkout-steps" role="progressbar" aria-valuenow={currentStep + 1} aria-valuemin={1} aria-valuemax={STEPS.length}>
          {STEPS.map((step, idx) => (
            <div
              key={step.id}
              className={`checkout-step ${
                idx < currentStep ? 'completed' : idx === currentStep ? 'active' : 'pending'
              }`}
            >
              <div className="checkout-step-indicator">
                {idx < currentStep ? (
                  <span className="material-icons" style={{ fontSize: '0.875rem' }}>check</span>
                ) : ( idx + 1 )}
              </div>
              <span className="checkout-step-label">{step.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="checkout-content">
        {/* Form Column */}
        <div className="checkout-form-col">

          {/* Step 0: Contact Info */}
          {currentStep === 0 && (
            <div className="checkout-section animate-fade-in-up">
              <div className="checkout-section-header">
                <div className="checkout-section-icon">
                  <span className="material-icons" style={{ fontSize: '1.125rem' }}>person</span>
                </div>
                <h2 className="checkout-section-title">Contact Information</h2>
              </div>
              <div className="checkout-form-grid">
                <div className="form-group full-width">
                  <label className="form-label" htmlFor="checkout-email">Email Address</label>
                  <input id="checkout-email" type="email" className="form-input" placeholder="your@email.com"
                    value={formData.email} onChange={e => handleChange('email', e.target.value)} />
                </div>
                <div className="form-group full-width">
                  <label className="form-label" htmlFor="checkout-phone">Phone Number</label>
                  <input id="checkout-phone" type="tel" className="form-input" placeholder="+971 50 000 0000"
                    value={formData.phone} onChange={e => handleChange('phone', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Shipping */}
          {currentStep === 1 && (
            <div className="checkout-section animate-fade-in-up">
              <div className="checkout-section-header">
                <div className="checkout-section-icon">
                  <span className="material-icons" style={{ fontSize: '1.125rem' }}>local_shipping</span>
                </div>
                <h2 className="checkout-section-title">Shipping Address</h2>
              </div>
              <div className="checkout-form-grid">
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-first-name">First Name</label>
                  <input id="checkout-first-name" type="text" className="form-input" placeholder="Layla"
                    value={formData.firstName} onChange={e => handleChange('firstName', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-last-name">Last Name</label>
                  <input id="checkout-last-name" type="text" className="form-input" placeholder="Al Rashid"
                    value={formData.lastName} onChange={e => handleChange('lastName', e.target.value)} />
                </div>
                <div className="form-group full-width">
                  <label className="form-label" htmlFor="checkout-address">Street Address</label>
                  <input id="checkout-address" type="text" className="form-input" placeholder="123 Palm Jumeirah"
                    value={formData.address} onChange={e => handleChange('address', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-city">City</label>
                  <input id="checkout-city" type="text" className="form-input" placeholder="Dubai"
                    value={formData.city} onChange={e => handleChange('city', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="checkout-zip">Postal Code</label>
                  <input id="checkout-zip" type="text" className="form-input" placeholder="00000"
                    value={formData.zipCode} onChange={e => handleChange('zipCode', e.target.value)} />
                </div>
                <div className="form-group full-width">
                  <label className="form-label" htmlFor="checkout-country">Country</label>
                  <input id="checkout-country" type="text" className="form-input"
                    value={formData.country} onChange={e => handleChange('country', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Payment */}
          {currentStep === 2 && (
            <div className="checkout-section animate-fade-in-up">
              <div className="checkout-section-header">
                <div className="checkout-section-icon">
                  <span className="material-icons" style={{ fontSize: '1.125rem' }}>credit_card</span>
                </div>
                <h2 className="checkout-section-title">Payment Details</h2>
              </div>

              <div className="payment-options">
                {[
                  { id: 'card', icon: '💳', title: 'Credit or Debit Card', subtitle: 'Visa, Mastercard, Amex' },
                  { id: 'upi', icon: '📱', title: 'UPI Payment', subtitle: 'GPay, PhonePe, or BHIM' },
                  { id: 'cod', icon: '📦', title: 'Cash on Delivery', subtitle: 'Pay upon receiving your order' },
                ].map(opt => (
                  <div
                    key={opt.id}
                    id={`payment-${opt.id}`}
                    className={`payment-option ${paymentMethod === opt.id ? 'selected' : ''}`}
                    onClick={() => setPaymentMethod(opt.id)}
                    role="radio"
                    aria-checked={paymentMethod === opt.id}
                    tabIndex={0}
                  >
                    <div className="radio-dot" style={{ flexShrink: 0 }}>
                      {paymentMethod === opt.id && (
                        <div className="radio-dot checked" />
                      )}
                    </div>
                    <div className="payment-option-icon">{opt.icon}</div>
                    <div className="payment-option-body">
                      <p className="payment-option-title">{opt.title}</p>
                      <p className="payment-option-subtitle">{opt.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>

              {paymentMethod === 'card' && (
                <div className="payment-card-fields">
                  <div className="form-group">
                    <label className="form-label" htmlFor="card-number">Card Number</label>
                    <input id="card-number" type="text" className="form-input" placeholder="1234 5678 9012 3456"
                      maxLength={19} value={formData.cardNumber} onChange={e => handleChange('cardNumber', e.target.value)} />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="card-name">Cardholder Name</label>
                    <input id="card-name" type="text" className="form-input" placeholder="Layla Al Rashid"
                      value={formData.cardName} onChange={e => handleChange('cardName', e.target.value)} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="card-expiry">Expiry</label>
                      <input id="card-expiry" type="text" className="form-input" placeholder="MM/YY"
                        maxLength={5} value={formData.cardExpiry} onChange={e => handleChange('cardExpiry', e.target.value)} />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="card-cvv">CVV</label>
                      <input id="card-cvv" type="password" className="form-input" placeholder="•••"
                        maxLength={4} value={formData.cardCvv} onChange={e => handleChange('cardCvv', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation buttons */}
          <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
            {currentStep > 0 && (
              <button
                id="checkout-prev-btn"
                className="btn btn-secondary"
                onClick={() => setCurrentStep(prev => prev - 1)}
              >
                <span className="material-icons" style={{ fontSize: '1rem' }}>arrow_back</span>
                Back
              </button>
            )}
            {currentStep < STEPS.length - 1 ? (
              <button
                id="checkout-next-btn"
                className="btn btn-primary btn-full"
                onClick={handleNext}
              >
                Continue
                <span className="material-icons" style={{ fontSize: '1rem' }}>arrow_forward</span>
              </button>
            ) : (
              <button
                id="checkout-place-order-btn"
                className="btn btn-primary btn-full btn-lg"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                style={{ flex: 1 }}
              >
                {isProcessing ? (
                  <>
                    <span className="material-icons" style={{ fontSize: '1rem' }}>refresh</span>
                    Processing...
                  </>
                ) : (
                  <>
                    <span className="material-icons" style={{ fontSize: '1rem' }}>lock</span>
                    Place Order · ₹{total.toFixed(2)}
                  </>
                )}
              </button>
            )}
          </div>

          {currentStep === 2 && (
            <p className="checkout-terms">
              By clicking place order you agree to our{' '}
              <a>Terms of Service</a>,{' '}
              <a>Privacy Policy</a>, and{' '}
              <a>Shipping Policy</a>.
              <br />© 2025 Atelier Studio
            </p>
          )}
        </div>

        {/* Summary Column */}
        <div className="checkout-summary-col">
          <div className="checkout-order-summary">
            <h3 className="checkout-order-title">Order Summary</h3>

            {items.map(item => (
              <div key={item.cartId} className="checkout-order-item">
                <div className="checkout-order-item-img">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="checkout-order-item-img-actual"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling && (e.target.nextSibling.style.display = 'flex');
                      }}
                    />
                  ) : null}
                  <ProductImage 
                    product={item} 
                    style={{ width: '100%', height: '100%', display: item.image ? 'none' : 'flex' }} 
                    showEmoji={false} 
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="checkout-order-item-name">{item.name}</p>
                  <p className="checkout-order-item-meta">
                    Qty: {item.quantity} · {item.selectedSize}
                  </p>
                </div>
                <span className="checkout-order-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="checkout-totals">
              <div className="checkout-total-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="checkout-total-row">
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? '#4a7c59' : 'inherit' }}>
                  {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="checkout-total-row">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="checkout-total-row grand">
                <span>Total</span>
                <span className="val">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
