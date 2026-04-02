<<<<<<< HEAD
# Atelier Boutique — React E-Commerce App

A luxury e-commerce React application inspired by the **"Digital Atelier"** design system from the Stitch project. Built with an editorial, feminine aesthetic featuring glassmorphism, warm rose tones, and Noto Serif typography.

---

## 🚀 Getting Started

### 1. Install Dependencies

Open a terminal in the project root (`d:\e commerce`) and run:

```bash
npm install
```

### 2. Start the Dev Server

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

---

## 📁 File Structure

```
d:\e commerce\
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx               # Entry point
    ├── App.jsx                # Router + Context providers
    ├── index.css              # Design system & global styles
    │
    ├── context/
    │   ├── CartContext.jsx    # Cart state (useReducer)
    │   └── ToastContext.jsx   # Toast notifications
    │
    ├── data/
    │   └── products.js        # Mock product data (8 products)
    │
    ├── components/
    │   ├── Header/            # Top navigation bar
    │   ├── BottomNav/         # Mobile bottom navigation
    │   ├── ProductCard/       # Product grid card
    │   └── ProductImage/      # Gradient image placeholder
    │
    └── pages/
        ├── HomePage/          # Landing page with hero + featured products
        ├── ProductListPage/   # Browsable product catalog
        ├── ProductDetailPage/ # Product detail with add-to-cart
        ├── CartPage/          # Shopping cart with order summary
        ├── CheckoutPage/      # Multi-step checkout form
        └── ProfilePage/       # User account page
```

---

## ✨ Features

| Feature | Implementation |
|---|---|
| Product Listing | Grid with category filters + sort |
| Product Details | Size/color picker, qty, related products |
| Add to Cart | With toast notification + quick-add on hover |
| Cart Management | Quantity update, remove, promo code |
| Checkout | 3-step form: Contact → Shipping → Payment |
| State Management | React Context API + useReducer |
| Routing | React Router v6 |
| Responsive | Mobile-first, works on all screen sizes |

---

## 🎨 Design System

Sourced directly from the **Stitch "The Editorial Ethereal"** design system:

- **Colors**: Dusty rose primary `#884f50`, warm linen background `#faf9f6`
- **Typography**: Noto Serif (headings) + Manrope (body)
- **Effects**: Glassmorphism nav, gradient buttons, tonal surface layering
- **Animations**: Fade-in-up, hover lifts, transition smoothing

---

## 🛍️ Mock Products

8 products across 3 categories:

| Category | Products |
|---|---|
| Shawls | Rose Silk Burga Shawl, Ivory Cashmere Shawl |
| Gifts | Love Gift Frame, No. 04 Signature Scent, Gold-Trim Coasters |
| Accessories | Thread Bangles Set, Linen Throw Blanket, Pearl Drop Earrings |

---

## 💡 Promo Code

Try entering **`ATELIER10`** in the cart for a 10% discount.
=======
# accessories-ecommerce-platform
tylish accessories, simplified. Browse our curated collection of jewelry and bags with a fast, modern shopping experience. Your next favorite piece is just a click away.
>>>>>>> 968ff7b6a66fb971180726b0265bdcd02d1902ef
