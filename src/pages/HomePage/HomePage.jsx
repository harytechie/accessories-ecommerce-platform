// src/pages/HomePage/HomePage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductImage from '../../components/ProductImage/ProductImage';
import { productData as products, categories } from '../../data/products';
import { useToast } from '../../context/ToastContext';
import emailjs from '@emailjs/browser';
import './HomePage.css';

// ── EmailJS initialization ──────────────────────────
emailjs.init('Rdh1X8rVEEQi73Vay');

// ── EmailJS config ──
const EMAILJS_SERVICE_ID  = 'service_r01upqn';
const EMAILJS_TEMPLATE_ID = 'template_91z3wu4';
const EMAILJS_PUBLIC_KEY  = 'Rdh1X8rVEEQi73Vay';

const HomePage = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('all');
  const [isTestingEmail, setIsTestingEmail] = useState(false);

  const handleTestEmail = async () => {
    setIsTestingEmail(true);
    const testParams = {
      customer_name: 'Test Customer',
      customer_email: 'test@example.com',
      address: '123 Test Street, Test City',
      items: 'Test Item 1 x1, Test Item 2 x2',
      total: '₹1234.56',
    };

    console.log("📤 Sending Test Email:", testParams);

    try {
      const res = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, testParams);
      console.log("✅ SUCCESS:", res);
      addToast('✅ Test Email Sent Successfully!', 'check_circle');
    } catch (err) {
      console.error('❌ Email error:', err);
      addToast('❌ Test Email Failed. Check console.', 'error');
    } finally {
      setIsTestingEmail(false);
    }
  };

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
              <button
                id="test-email-btn"
                className="btn btn-tertiary"
                onClick={handleTestEmail}
                disabled={isTestingEmail}
              >
                {isTestingEmail ? 'Testing...' : 'Test EmailJS'}
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
                  onClick={() => navigate('/products/shawls')}
                  role="button"
                  tabIndex={0}
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJUnELaEFr5gMZXTZAvHdDH9fDxh6c_9t6_UZpnkm2CsfA55vjRj5BCTmB-1pcgxdjQAUDGjTao3EGTGfXmB0A4wQ1EgEtoRcfzRBE4W_Ya-IHM_L7mj1r8cgw4QKrEII6prbZs2s5aNsKjF_iUxXSG3P2YSC95rlpfcsaCYl75TR-tgfHVP2bEhOhlLatbBGUuABW7HDpl6R9UVgWKYRZWENZWSErCEWncDhhbkYP5IFfaR2bL6XYmeFoyfn88Vo1Z5Qk8IFkz00"
                    alt="Shawls Collection"
                    className="hero-card-img"
                    style={{ height: '100%', width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-xl)' }}
                  />
                  <div className="hero-card-overlay">
                    <span className="hero-card-overlay-name">Rose Silk Burga Shawl</span>
                  </div>
                </div>

                {/* Two stacked cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  <div
                    className="hero-featured-card"
                    onClick={() => navigate('/products/gifts')}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgqrxCeCx1MPCPbwY2hQ6LCn20XsDWxmjo-J3dNwRR_svmzSHTR1YJM6tTp5ZWNh451O2tT-m4MUWCa52iY9oZHSWKRixq--qkIZnb_Rs_p1Q0FVocOiKqaoGp1FqmovA8WrHExS5VTPk87PuFXC4gbaCQ8-npyIikRFfaiV_x4yFbR4iYeQxhToMoF1SjtUafQ_s1TjPY_bLDIk-P1X5TRtZU--xxxPfMQbdLG6LniDeA8tjSVLuSwZgvwe9Pqu_gQmuOIBaDKx0"
                      alt="Gift Frames"
                      className="hero-card-img"
                      style={{ height: '148px', width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
                    />
                    <div className="hero-card-overlay" style={{ padding: 'var(--space-2)' }}>
                      <span className="hero-card-overlay-name" style={{ fontSize: '0.75rem' }}>Love Gift Frame</span>
                    </div>
                  </div>
                  <div
                    className="hero-featured-card"
                    onClick={() => navigate('/products/accessories')}
                    role="button"
                    tabIndex={0}
                  >
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuChat-yh1QA9fgsAi6E0gpw2T9pyEMsaz3r8_OFTEpyrOeFBJKpmcm494jTlr0niss55NUaP05nGoYMcvLQuoBVq9Hva4U_HVxd3F3UFpXAe_Go1yx6DzFiB8Poh0KKk7qKJ-jJHO1sGqQmzeM71QbqLHuOIuJC2DBhjWsSncVhi0V5vTGrS3CWlyHsHPVQiQv6d24BUkgtaAXJkzMtt_f5qsyCb62c8sCdHPpVUB1yNnBYTMmBqp6gH3oV56P2Gb_59eCVw9oCmlI"
                      alt="Accessories"
                      className="hero-card-img"
                      style={{ height: '148px', width: '100%', objectFit: 'cover', borderRadius: 'var(--radius-lg)' }}
                    />
                    <div className="hero-card-overlay" style={{ padding: 'var(--space-2)' }}>
                      <span className="hero-card-overlay-name" style={{ fontSize: '0.75rem' }}>Thread Bangles Set</span>
                    </div>
                  </div>
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
