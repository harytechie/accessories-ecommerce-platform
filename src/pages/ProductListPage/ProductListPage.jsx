// src/pages/ProductListPage/ProductListPage.jsx
import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { productData as products, categories } from '../../data/products';
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
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [activeCategory, setActiveCategory] = useState(category);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    setActiveCategory(category);
  }, [category]);

  const meta = categoryMeta[activeCategory] || categoryMeta.all;

  const filteredProducts = useMemo(() => {
    let list = activeCategory === 'all'
      ? [...products]
      : products.filter(p => p.category === activeCategory);

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      list = list.filter(p =>
        p.name?.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCategory, sortBy, searchQuery]);

  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    navigate(`/products/${catId}`, { replace: true });
  };

  const pageTitle = searchQuery ? `Search: "${searchQuery}"` : meta.title;
  const pageSubtitle = searchQuery
    ? `Found ${filteredProducts.length} ${filteredProducts.length === 1 ? 'result' : 'results'} for "${searchQuery}"`
    : meta.subtitle;

  return (
    <div className="product-list-page">
      <div className="plp-header">
        <div className="plp-header-inner">
          <nav className="plp-breadcrumb" aria-label="Breadcrumb">
            <span onClick={() => navigate('/')} className="plp-breadcrumb-item clickable">Home</span>
            <span className="plp-breadcrumb-sep">›</span>
            <span className="plp-breadcrumb-item">{searchQuery ? 'Search Results' : meta.title}</span>
          </nav>
          <h1 className="plp-title">{pageTitle}</h1>
          <p className="plp-subtitle">{pageSubtitle}</p>
        </div>
      </div>


      <div className="plp-toolbar">
        <span className="plp-result-count">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
        </span>
        <div className="plp-sort-container">
          <select
            id="plp-sort-select"
            className="plp-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
          <div className="plp-sort-icon">
            <span className="material-icons">expand_more</span>
          </div>
        </div>
      </div>

      <main className="plp-content">
        {filteredProducts.length === 0 ? (
          <div className="plp-empty">
            <div className="plp-empty-icon">✨</div>
            <h2 className="plp-empty-title">No items found</h2>
            <p>{searchQuery ? `No results for "${searchQuery}". Try a different search term.` : 'Try a different category or explore all collections.'}</p>
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
