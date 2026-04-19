// src/pages/AdminPage/AdminPage.jsx
import { useState, useEffect } from 'react';
import {
  getAllProductsAdmin,
  addProductAdmin,
  updateProductAdmin,
  deleteProductAdmin,
  getAllOrdersAdmin,
  updateOrderStatusAdmin,
  getAllUsersAdmin,
} from '../../services/adminService';
import './AdminPage.css';

const TABS = [
  { key: 'products', label: 'Products', icon: 'inventory_2' },
  { key: 'orders', label: 'Orders', icon: 'receipt_long' },
  { key: 'users', label: 'Users', icon: 'group' },
];

const ORDER_STATUSES = ['pending', 'confirmed', 'shipped', 'delivered'];

const emptyProduct = {
  name: '',
  price: '',
  category: '',
  image: '',
  description: '',
  badge: '',
  rating: '',
};

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('products');

  // Data
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  // Loading states
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Product form
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productForm, setProductForm] = useState({ ...emptyProduct });
  const [savingProduct, setSavingProduct] = useState(false);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ─── Fetch data on mount ──────────────────────────────────────────────────────
  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchUsers();
  }, []);

  const fetchProducts = async () => {
    setLoadingProducts(true);
    try {
      const data = await getAllProductsAdmin();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await getAllOrdersAdmin();
      setOrders(data);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoadingOrders(false);
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const data = await getAllUsersAdmin();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  // ─── Stats ────────────────────────────────────────────────────────────────────
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  // ─── Product Handlers ─────────────────────────────────────────────────────────
  const openAddProduct = () => {
    setEditingProduct(null);
    setProductForm({ ...emptyProduct });
    setShowProductForm(true);
  };

  const openEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || '',
      price: product.price || '',
      category: product.category || '',
      image: product.image || '',
      description: product.description || '',
      badge: product.badge || '',
      rating: product.rating || '',
    });
    setShowProductForm(true);
  };

  const closeProductForm = () => {
    setShowProductForm(false);
    setEditingProduct(null);
    setProductForm({ ...emptyProduct });
  };

  const handleProductFormChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setSavingProduct(true);

    const data = {
      name: productForm.name.trim(),
      price: parseFloat(productForm.price) || 0,
      category: productForm.category.trim(),
      image: productForm.image.trim(),
      description: productForm.description.trim(),
      badge: productForm.badge.trim() || null,
      rating: parseFloat(productForm.rating) || null,
    };

    try {
      if (editingProduct) {
        await updateProductAdmin(editingProduct.docId, data);
      } else {
        // Generate a numeric id by using current timestamp
        data.id = Date.now();
        await addProductAdmin(data);
      }
      closeProductForm();
      await fetchProducts();
    } catch (err) {
      console.error('Failed to save product:', err);
      alert('Failed to save product. Please try again.');
    } finally {
      setSavingProduct(false);
    }
  };

  const confirmDeleteProduct = (product) => {
    setDeleteTarget(product);
  };

  const handleDeleteProduct = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteProductAdmin(deleteTarget.docId);
      setDeleteTarget(null);
      await fetchProducts();
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('Failed to delete product.');
    } finally {
      setDeleting(false);
    }
  };

  // ─── Order Handlers ───────────────────────────────────────────────────────────
  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatusAdmin(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      console.error('Failed to update order status:', err);
      alert('Failed to update order status.');
    }
  };

  // ─── Render Helpers ───────────────────────────────────────────────────────────
  const formatDate = (date) => {
    if (!date) return '—';
    const d = date instanceof Date ? date : new Date(date);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatCurrency = (amount) => {
    return `₹${(amount || 0).toLocaleString('en-IN')}`;
  };

  // ─── Products Tab ─────────────────────────────────────────────────────────────
  const renderProducts = () => {
    if (loadingProducts) {
      return (
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <span>Loading products…</span>
        </div>
      );
    }

    return (
      <>
        <div className="admin-section-header">
          <h2 className="admin-section-title">All Products ({products.length})</h2>
          <button className="admin-add-btn" onClick={openAddProduct}>
            <span className="material-icons">add</span>
            Add Product
          </button>
        </div>

        {products.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <span className="material-icons">inventory_2</span>
            </div>
            <p className="admin-empty-text">No products yet. Add your first product to get started.</p>
          </div>
        ) : (
          <div className="admin-card-list">
            {products.map((product, idx) => (
              <div
                className="admin-card"
                key={product.docId}
                style={{ animationDelay: `${idx * 0.04}s` }}
              >
                <div className="admin-product-card">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="admin-product-img"
                      onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling && (e.target.nextSibling.style.display = 'flex'); }}
                    />
                  ) : (
                    <div className="admin-product-img-placeholder">
                      <span className="material-icons">image</span>
                    </div>
                  )}
                  <div className="admin-product-info">
                    <p className="admin-product-name">{product.name}</p>
                    <div className="admin-product-meta">
                      <span className="admin-product-price">{formatCurrency(product.price)}</span>
                      {product.category && (
                        <span className="admin-product-category">{product.category}</span>
                      )}
                      {product.badge && (
                        <span className="admin-product-category">{product.badge}</span>
                      )}
                    </div>
                  </div>
                  <div className="admin-card-actions">
                    <button
                      className="admin-action-btn"
                      title="Edit product"
                      onClick={() => openEditProduct(product)}
                    >
                      <span className="material-icons">edit</span>
                    </button>
                    <button
                      className="admin-action-btn delete"
                      title="Delete product"
                      onClick={() => confirmDeleteProduct(product)}
                    >
                      <span className="material-icons">delete_outline</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  // ─── Orders Tab ───────────────────────────────────────────────────────────────
  const renderOrders = () => {
    if (loadingOrders) {
      return (
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <span>Loading orders…</span>
        </div>
      );
    }

    return (
      <>
        <div className="admin-section-header">
          <h2 className="admin-section-title">All Orders ({orders.length})</h2>
        </div>

        {orders.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <span className="material-icons">receipt_long</span>
            </div>
            <p className="admin-empty-text">No orders yet.</p>
          </div>
        ) : (
          <div className="admin-card-list">
            {orders.map((order, idx) => (
              <div
                className="admin-card"
                key={order.id}
                style={{ animationDelay: `${idx * 0.04}s` }}
              >
                <div className="admin-order-card">
                  <div className="admin-order-top">
                    <div>
                      <span className="admin-order-id">#{order.id.slice(-8).toUpperCase()}</span>
                      <p className="admin-order-date" style={{ marginTop: '4px' }}>
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span className={`admin-status-badge ${order.status || 'pending'}`}>
                      <span className="material-icons" style={{ fontSize: '0.75rem' }}>
                        {order.status === 'delivered'
                          ? 'check_circle'
                          : order.status === 'shipped'
                          ? 'local_shipping'
                          : order.status === 'confirmed'
                          ? 'verified'
                          : 'schedule'}
                      </span>
                      {order.status || 'pending'}
                    </span>
                  </div>

                  <div className="admin-order-details">
                    <div>
                      <p className="admin-order-detail-label">Customer</p>
                      <p className="admin-order-detail-value">
                        {order.address?.name || order.userId?.slice(0, 12) || '—'}
                      </p>
                    </div>
                    <div>
                      <p className="admin-order-detail-label">Payment</p>
                      <p className="admin-order-detail-value" style={{ textTransform: 'capitalize' }}>
                        {order.paymentMethod || '—'}
                      </p>
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="admin-order-items">
                      {order.items.map((item, i) => (
                        <div className="admin-order-item" key={i}>
                          <span>{item.name} × {item.quantity}</span>
                          <span>{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="admin-order-bottom">
                    <span className="admin-order-total">{formatCurrency(order.total)}</span>
                    <select
                      className="admin-status-select"
                      value={order.status || 'pending'}
                      onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  // ─── Users Tab ────────────────────────────────────────────────────────────────
  const renderUsers = () => {
    if (loadingUsers) {
      return (
        <div className="admin-loading">
          <div className="admin-loading-spinner" />
          <span>Loading users…</span>
        </div>
      );
    }

    return (
      <>
        <div className="admin-section-header">
          <h2 className="admin-section-title">Registered Users ({users.length})</h2>
        </div>

        {users.length === 0 ? (
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <span className="material-icons">group</span>
            </div>
            <p className="admin-empty-text">No registered users found.</p>
          </div>
        ) : (
          <div className="admin-card-list">
            {users.map((u, idx) => (
              <div
                className="admin-card"
                key={u.id}
                style={{ animationDelay: `${idx * 0.04}s` }}
              >
                <div className="admin-user-card">
                  <div className="admin-user-avatar">
                    {u.avatar ? (
                      <img src={u.avatar} alt={u.name} />
                    ) : (
                      <span className="material-icons">person</span>
                    )}
                  </div>
                  <div className="admin-user-info">
                    <p className="admin-user-name">{u.name || 'Unknown'}</p>
                    <p className="admin-user-email">{u.email}</p>
                  </div>
                  <span className="admin-user-date">{formatDate(u.createdAt)}</span>
                  <span className={`admin-user-role ${u.isAdmin ? 'admin' : 'user'}`}>
                    <span className="material-icons" style={{ fontSize: '0.75rem' }}>
                      {u.isAdmin ? 'shield' : 'person'}
                    </span>
                    {u.isAdmin ? 'Admin' : 'User'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </>
    );
  };

  // ─── Active Tab Content ───────────────────────────────────────────────────────
  const renderContent = () => {
    switch (activeTab) {
      case 'products':
        return renderProducts();
      case 'orders':
        return renderOrders();
      case 'users':
        return renderUsers();
      default:
        return null;
    }
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="admin-page">
      {/* ── Header ── */}
      <div className="admin-header">
        <div className="admin-header-content">
          <div className="admin-header-top">
            <div className="admin-header-icon">
              <span className="material-icons">admin_panel_settings</span>
            </div>
            <h1 className="admin-title">Admin Panel</h1>
          </div>
          <p className="admin-subtitle">Manage your store's products, orders, and users.</p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="admin-stats">
        <div className="admin-stat-card">
          <div className="admin-stat-icon products">
            <span className="material-icons" style={{ fontSize: '1.125rem' }}>inventory_2</span>
          </div>
          <span className="admin-stat-label">Products</span>
          <span className="admin-stat-value">{products.length}</span>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon orders">
            <span className="material-icons" style={{ fontSize: '1.125rem' }}>receipt_long</span>
          </div>
          <span className="admin-stat-label">Orders</span>
          <span className="admin-stat-value">{orders.length}</span>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon users">
            <span className="material-icons" style={{ fontSize: '1.125rem' }}>group</span>
          </div>
          <span className="admin-stat-label">Users</span>
          <span className="admin-stat-value">{users.length}</span>
        </div>
        <div className="admin-stat-card">
          <div className="admin-stat-icon revenue">
            <span className="material-icons" style={{ fontSize: '1.125rem' }}>account_balance_wallet</span>
          </div>
          <span className="admin-stat-label">Revenue</span>
          <span className="admin-stat-value" style={{ fontSize: '1.25rem' }}>{formatCurrency(totalRevenue)}</span>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="admin-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`admin-tab ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className="material-icons">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="admin-content">{renderContent()}</div>

      {/* ── Product Form Modal ── */}
      {showProductForm && (
        <div className="admin-form-overlay" onClick={closeProductForm}>
          <div className="admin-form-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-form-header">
              <h3 className="admin-form-title">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button className="admin-form-close" onClick={closeProductForm}>
                <span className="material-icons">close</span>
              </button>
            </div>

            <form className="admin-form" onSubmit={handleProductSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-name">Product Name *</label>
                <input
                  className="form-input"
                  id="admin-product-name"
                  name="name"
                  value={productForm.name}
                  onChange={handleProductFormChange}
                  placeholder="e.g. Silk Pashmina Shawl"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-price">Price (₹) *</label>
                <input
                  className="form-input"
                  id="admin-product-price"
                  name="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={productForm.price}
                  onChange={handleProductFormChange}
                  placeholder="e.g. 2499"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-category">Category *</label>
                <input
                  className="form-input"
                  id="admin-product-category"
                  name="category"
                  value={productForm.category}
                  onChange={handleProductFormChange}
                  placeholder="e.g. shawls, jewelry, gifts"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-image">Image URL</label>
                <input
                  className="form-input"
                  id="admin-product-image"
                  name="image"
                  value={productForm.image}
                  onChange={handleProductFormChange}
                  placeholder="https://..."
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-description">Description</label>
                <textarea
                  className="form-input"
                  id="admin-product-description"
                  name="description"
                  value={productForm.description}
                  onChange={handleProductFormChange}
                  placeholder="Describe the product…"
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-badge">Badge</label>
                <input
                  className="form-input"
                  id="admin-product-badge"
                  name="badge"
                  value={productForm.badge}
                  onChange={handleProductFormChange}
                  placeholder="e.g. New, Bestseller, Limited"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="admin-product-rating">Rating (1–5)</label>
                <input
                  className="form-input"
                  id="admin-product-rating"
                  name="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={productForm.rating}
                  onChange={handleProductFormChange}
                  placeholder="e.g. 4.5"
                />
              </div>

              <div className="admin-form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeProductForm}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={savingProduct}
                >
                  {savingProduct
                    ? 'Saving…'
                    : editingProduct
                    ? 'Update Product'
                    : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Delete Confirmation ── */}
      {deleteTarget && (
        <div className="admin-confirm-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-confirm-card" onClick={(e) => e.stopPropagation()}>
            <div className="admin-confirm-icon">
              <span className="material-icons">delete_forever</span>
            </div>
            <h3 className="admin-confirm-title">Delete Product?</h3>
            <p className="admin-confirm-text">
              Are you sure you want to delete <strong>{deleteTarget.name}</strong>? This action cannot be undone.
            </p>
            <div className="admin-confirm-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={handleDeleteProduct}
                disabled={deleting}
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
