// src/pages/HomePage/HomePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductImage from '../../components/ProductImage/ProductImage';
import { productData as products, categories } from '../../data/products';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const giftProducts = products.filter(p => p.category === 'gifts');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  const featured = products.slice(0, 3);

  return (
    <main className="home-page">
      {/* ── Hero ─── */}
      <section className="hero" aria-label="Hero section">
        <div className="hero-inner">
          <div className="hero-content animate-fade-in-up">
            <p className="hero-eyebrow">New Collection 2026</p>
            <h1 className="hero-title">
              AFRIN<br />
              <em>Essence</em>
            </h1>
            <p className="hero-subtitle">
              Experience the tactile luxury of Burga Shawls and curated gifts
              designed for the modern romantic.
            </p>
            <div className="hero-cta-group">
              <button
                id="hero-explore-btn"
                className="btn btn-primary btn-lg"
                onClick={() => navigate('/products/all')}
              >
                <span className="material-icons" style={{ fontSize: '1.125rem' }}>auto_awesome</span>
                Explore Collection
              </button>
              <button
                id="hero-gifts-btn"
                className="btn btn-secondary btn-lg"
                onClick={() => navigate('/products/gifts')}
              >
                Gift Ideas
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          {featured.length > 0 && (
            <div className="hero-visual">
              <div className="hero-card-grid">
                {/* Tall card */}
                <div
                  className="hero-featured-card hero-card-tall"
                  onClick={() => navigate(`/product/${featured[0].id}`)}
                  role="button"
                  tabIndex={0}
                >
                  <ProductImage
                    product={featured[0]}
                    className="hero-card-img"
                    style={{ minHeight: '320px', borderRadius: 'var(--radius-xl)' }}
                  />
                </div>

                {/* Two stacked cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {featured.slice(1, 3).map(product => (
                    <div
                      key={product.docId || product.id}
                      className="hero-featured-card"
                      onClick={() => navigate(`/product/${product.id}`)}
                      role="button"
                      tabIndex={0}
                    >
                      <ProductImage
                        product={product}
                        className="hero-card-img"
                        style={{ minHeight: '148px', borderRadius: 'var(--radius-lg)' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Quote Banner ─── */}
      <section className="quote-banner">
        <blockquote>
          <p className="quote-text">"Quality is the silence before the applause."</p>
          <footer className="quote-author">— The Atelier Promise</footer>
        </blockquote>
      </section>

      {/* ── Category Filter ─── */}
      <section className="category-section" aria-label="Product categories">
        <div className="category-scroll">
          {categories.map(cat => (
            <button
              key={cat.id}
              id={`cat-${cat.id}`}
              className={`cat-card ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
            >
              <div className="cat-circle">
                <span className="material-icons">{cat.icon}</span>
              </div>
              <span className="cat-label">{cat.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* ── Featured Products ─── */}
      <section className="featured-section" aria-label="Products">
        <div className="section-header">
          <h2 className="section-title">
            <span>Curated for You</span>
            Featured Treasures
          </h2>
          <button
            id="view-all-btn"
            className="btn btn-tertiary"
            onClick={() => navigate('/products/all')}
          >
            View All
          </button>
        </div>

        <div className="products-grid">
          {filtered.slice(0, 4).map(product => (
            <ProductCard key={product.docId || product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ── Gift Section ─── */}
      {giftProducts.length > 0 && (
        <section className="gift-section" aria-label="Gift Collection">
          <div className="gift-section-header">
            <div className="gift-section-badge">
              <span className="material-icons">card_giftcard</span>
              Gift Collection
            </div>
            <h2 className="gift-section-title">
              Perfect Gifts for <em>Every Occasion</em>
            </h2>
            <p className="gift-section-subtitle">
              Discover our curated selection of unique gift sets, hampers, and luxurious gift boxes.
              From romantic surprises to celebration essentials, find the perfect way to show you care.
            </p>
          </div>

          <div className="gift-showcase">
            {giftProducts.slice(0, 6).map(product => (
              <div key={product.docId || product.id} className="gift-showcase-item">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="gift-scroll-container">
            <div className="gift-scroll-track">
              {giftProducts.slice(6).map(product => (
                <div key={product.docId || product.id} className="gift-scroll-item">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

          <div className="gift-section-footer">
            <button
              id="view-all-gifts-btn"
              className="btn btn-primary btn-lg"
              onClick={() => navigate('/products/gifts')}
            >
              <span className="material-icons" style={{ fontSize: '1.125rem' }}>redeem</span>
              View All Gifts
            </button>
          </div>
        </section>
      )}

      {/* ── About Banner ─── */}
      <section className="about-banner" aria-label="About Atelier">
        <p className="about-banner-eyebrow">The Weaver's Promise</p>
        <h2 className="about-banner-title">Every piece tells a story of generations</h2>
        <p className="about-banner-text">
          Every shawl and gift at Atelier is sourced from artisans who have spent
          generations perfecting their craft. We believe in slow fashion and intentional gifting.
        </p>
        <button
          id="about-learn-more-btn"
          className="btn btn-secondary"
          style={{ marginTop: 'var(--space-6)' }}
          onClick={() => navigate('/about')}
        >
          Our Story
        </button>
      </section>
    </main>
  );
};

export default HomePage;
