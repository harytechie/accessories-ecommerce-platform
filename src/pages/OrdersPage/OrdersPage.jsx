// src/pages/OrdersPage/OrdersPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getOrdersFS } from '../../services/firestoreService';
import './OrdersPage.css';

// ── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_ICON = {
  pending:   'schedule',
  confirmed: 'thumb_up',
  shipped:   'local_shipping',
  delivered: 'check_circle',
  cancelled: 'cancel',
};

const PAYMENT_ICON = {
  card: '💳',
  upi:  '📱',
  cod:  '📦',
};

const formatDate = (date) => {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date instanceof Date ? date : new Date(date));
};

// ── Component ─────────────────────────────────────────────────────────────────

const OrdersPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, loading: authLoading } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn || !user?.uid) {
      navigate('/login');
      return;
    }

    let cancelled = false;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const data = await getOrdersFS(user.uid);
        if (!cancelled) setOrders(data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        if (!cancelled) setError('Failed to load orders. Please try again.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchOrders();
    return () => { cancelled = true; };
  }, [user?.uid, isLoggedIn, authLoading, navigate]);

  // ── Render States ──────────────────────────────────────────────────────────

  const renderContent = () => {
    if (loading) {
      return (
        <div className="orders-loading">
          <div className="orders-loading-spinner" />
          <p style={{ color: 'var(--color-on-surface-variant)', fontSize: '0.9375rem' }}>
            Loading your orders...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="orders-empty">
          <span className="orders-empty-icon">⚠️</span>
          <h2 className="orders-empty-title">Something went wrong</h2>
          <p className="orders-empty-subtitle">{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      );
    }

    if (orders.length === 0) {
      return (
        <div className="orders-empty">
          <span className="orders-empty-icon">📦</span>
          <h2 className="orders-empty-title">No orders yet</h2>
          <p className="orders-empty-subtitle">
            Your curated pieces will appear here once you place your first order.
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
      );
    }

    return (
      <div className="orders-list">
        {orders.map((order) => {
          const statusIcon = STATUS_ICON[order.status] || 'help_outline';
          const previewItems = order.items?.slice(0, 3) || [];
          const remaining = (order.items?.length || 0) - previewItems.length;

          return (
            <div key={order.id} className="order-card animate-fade-in-up">
              {/* Card Header */}
              <div className="order-card-header">
                <div className="order-id-block">
                  <span className="order-id-label">Order ID</span>
                  <span className="order-id-value">ATL-{order.id.substring(0, 8).toUpperCase()}</span>
                </div>

                <span className={`order-status-badge ${order.status}`}>
                  <span className="material-icons" style={{ fontSize: '0.875rem' }}>
                    {statusIcon}
                  </span>
                  {order.status}
                </span>

                <span className="order-date">{formatDate(order.createdAt)}</span>
              </div>

              {/* Items */}
              <div className="order-items">
                {previewItems.map((item, idx) => (
                  <div key={item.cartId || `${item.id}-${idx}`} className="order-item-row">
                    <div className="order-item-img">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--color-surface-container)',
                          }}
                        >
                          <span className="material-icons" style={{ fontSize: '1.5rem', color: 'var(--color-outline)' }}>
                            inventory_2
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="order-item-info">
                      <p className="order-item-name">{item.name}</p>
                      <p className="order-item-meta">
                        Qty: {item.quantity}
                        {item.selectedSize ? ` · ${item.selectedSize}` : ''}
                      </p>
                    </div>
                    <span className="order-item-price">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {remaining > 0 && (
                <p className="order-more-items">+{remaining} more item{remaining > 1 ? 's' : ''}</p>
              )}

              {/* Card Footer */}
              <div className="order-card-footer">
                <div className="order-total-block">
                  <span className="order-total-label">Total Paid</span>
                  <span className="order-total-value">₹{Number(order.total).toFixed(2)}</span>
                </div>

                <span className="order-payment-method">
                  {PAYMENT_ICON[order.paymentMethod] || '💳'}
                  {order.paymentMethod === 'cod'
                    ? 'Cash on Delivery'
                    : order.paymentMethod === 'upi'
                    ? 'UPI'
                    : 'Card'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <button
          className="orders-header-back"
          onClick={() => navigate('/profile')}
          aria-label="Go back to profile"
        >
          <span className="material-icons" style={{ fontSize: '1.25rem' }}>arrow_back</span>
        </button>
        <h1 className="orders-header-title">My Orders</h1>
        {!loading && orders.length > 0 && (
          <span className="orders-count-badge">{orders.length}</span>
        )}
      </div>

      {renderContent()}
    </div>
  );
};

export default OrdersPage;
