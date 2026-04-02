// src/components/ProductImage/ProductImage.jsx
// Generates beautiful gradient placeholder images based on product category

const categoryGradients = {
  shawls: {
    bg: 'linear-gradient(135deg, #f9b1b1 0%, #faf9f6 50%, #ecbadf 100%)',
    icon: '🧣',
    accent: '#884f50',
  },
  gifts: {
    bg: 'linear-gradient(135deg, #ffdad9 0%, #fff7f6 50%, #f9b1b1 100%)',
    icon: '🎁',
    accent: '#775757',
  },
  accessories: {
    bg: 'linear-gradient(135deg, #ecbadf 0%, #faf9f6 50%, #ffdad9 100%)',
    icon: '✨',
    accent: '#7a5272',
  },
};

const ProductImage = ({ product, className = '', style = {}, showEmoji = true }) => {
  const config = categoryGradients[product.category] || categoryGradients.gifts;

  return (
    <div
      className={`product-img-placeholder ${className}`}
      style={{
        background: config.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        position: 'relative',
        ...style,
      }}
      aria-label={product.name}
    >
      <div 
        className="product-card-icon"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '35%',
          width: '100%',
        }}
      >
        {showEmoji && (
          <span style={{ fontSize: '2.75rem', lineHeight: 1 }}>{config.icon}</span>
        )}
      </div>

      <span style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '0.65rem',
        fontWeight: 600,
        color: config.accent,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: '0 1rem',
        opacity: 0.7,
        position: 'absolute',
        bottom: '12%',
        left: 0,
        right: 0,
      }}>
        {product.name}
      </span>
    </div>
  );
};

export default ProductImage;
