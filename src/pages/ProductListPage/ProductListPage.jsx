// src/pages/ProductListPage/ProductListPage.jsx
import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products, categories } from '../../data/products';
import './ProductListPage.css';

const categoryMeta = {
  all: {
    title: 'All Collections',
    subtitle: 'Explore our complete curated selection of luxury shawls, gifts & accessories.',
  },
  shawls: {
    title: 'Shawls Collection',
    subtitle: 'Premium hand-woven shawls with generations of artisan craftsmanship.',
  },
  gifts: {
    title: 'Love & Gift Items',
    subtitle: 'Thoughtfully curated gifts for every meaningful occasion.',
  },
  accessories: {
    title: 'Accessories',
    subtitle: 'Finishing touches that elevate every look and space.',
  },
};

const ProductListPage = () => {
  const navigate = useNavigate();
  const { category = 'all' } = useParams();
  const [activeCategory, setActiveCategory] = useState(category);
  const [sortBy, setSortBy] = useState('featured');

  const meta = categoryMeta[activeCategory] || categoryMeta.all;

  const filteredProducts = useMemo(() => {
    let list = activeCategory === 'all'
      ? [...products]
      : products.filter(p => p.category === activeCategory);

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCategory, sortBy]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    navigate(`/products/${catId}`, { replace: true });
  };

  return (
    <div className="product-list-page">
      <div className="plp-header">
        <div className="plp-header-inner">
          <nav className="plp-breadcrumb" aria-label="Breadcrumb">
            <span onClick={() => navigate('/')} className="plp-breadcrumb a">Home</span>
            <span className="plp-breadcrumb-sep">›</span>
            <span>{meta.title}</span>
          </nav>
          <h1 className="plp-title">{meta.title}</h1>
          <p className="plp-subtitle">{meta.subtitle}</p>
        </div>
      </div>

      <div className="plp-category-bar">
        {categories.map(cat => (
          <button
            key={cat.id}
            id={`plp-cat-${cat.id}`}
            className={`chip ${activeCategory === cat.id ? 'selected' : ''}`}
            onClick={() => handleCategoryChange(cat.id)}
          >
            <span className="material-icons" style={{ fontSize: '0.9rem', marginRight: '4px' }}>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="plp-toolbar">
        <span className="plp-result-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <select
            id="plp-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'var(--color-surface-container-low)',
              border: 'none',
              borderRadius: 'var(--radius-full)',
              padding: '6px 12px',
              fontSize: '0.8125rem',
              fontFamily: 'var(--font-sans)',
              color: 'var(--color-on-surface)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <main className="plp-content">
        {filteredProducts.length === 0 ? (
          <div className="plp-empty">
            <div className="plp-empty-icon">✨</div>
            <h2 className="plp-empty-title">No items found</h2>
            <p>Try a different category or explore all collections.</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListPage;
