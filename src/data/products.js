// src/data/products.js
// Mock product data based on Atelier boutique design

export const products = [
  {
    id: 1,
    name: "Rose Silk Burga Shawl",
    price: 185.00,
    originalPrice: 220.00,
    image: null,
    category: "shawls",
    badge: "Bestseller",
    description: "Hand-woven from the finest organic silk sourced from artisan weavers with generations of craft mastery. This premium shawl drapes with effortless elegance, offering both warmth and timeless style.",
    details: [
      "100% Organic Silk",
      "Artisan Hand-Woven",
      "Dimensions: 180cm × 80cm",
      "Available in 6 colorways",
      "Dry clean recommended"
    ],
    sizes: ["Small", "Medium", "Large"],
    colors: ["Rose Blush", "Ivory Cream", "Dusty Plum"],
    rating: 4.9,
    reviews: 128,
    sku: "SHW-001-RB"
  },
  {
    id: 2,
    name: "Love Gift Frame",
    price: 220.00,
    originalPrice: null,
    image: null,
    category: "gifts",
    badge: "New",
    description: "Custom hand-crafted from sustainably sourced walnut wood. Each frame is uniquely finished by artisan craftspeople, making every piece one-of-a-kind. Perfect for preserving precious memories.",
    details: [
      "Sustainably sourced Walnut",
      "Dimensions: 8\" × 10\"",
      "Custom engraving available",
      "Includes velvet backing",
      "Hand-finished surface"
    ],
    sizes: ["8×10", "10×12", "12×16"],
    colors: ["Natural Walnut", "Ebony", "Maple"],
    rating: 4.8,
    reviews: 94,
    sku: "GFT-002-WF"
  },
  {
    id: 3,
    name: "Thread Bangles Set",
    price: 80.00,
    originalPrice: 95.00,
    image: null,
    category: "accessories",
    badge: "Sale",
    description: "Artisan silk thread bangles, a set of 12 in curated complementary tones. Each bangle is individually wrapped with hand-dyed silk threads for a luxurious finish that catches the light beautifully.",
    details: [
      "Set of 12 bangles",
      "Hand-dyed silk thread",
      "Inner diameter: 6.5cm",
      "Complementary color palette",
      "Presented in gift box"
    ],
    sizes: ["One Size"],
    colors: ["Rose Mix", "Earth Tones", "Ivory & Gold"],
    rating: 4.7,
    reviews: 203,
    sku: "ACC-003-BNG"
  },
  {
    id: 4,
    name: "Ivory Cashmere Shawl",
    price: 260.00,
    originalPrice: null,
    image: null,
    category: "shawls",
    badge: null,
    description: "Ultra-soft pure cashmere shawl in a warm ivory tone. Woven using traditional techniques passed down through five generations of artisans in Kashmir. An investment in timeless luxury.",
    details: [
      "100% Grade A Cashmere",
      "Traditional Kashmiri weave",
      "Dimensions: 200cm × 90cm",
      "Certificate of authenticity included",
      "Hand wash cold"
    ],
    sizes: ["Standard", "XL"],
    colors: ["Ivory", "Champagne", "Soft Grey"],
    rating: 5.0,
    reviews: 67,
    sku: "SHW-004-CW"
  },
  {
    id: 5,
    name: "No. 04 Signature Scent",
    price: 82.00,
    originalPrice: null,
    image: null,
    category: "gifts",
    badge: "Limited",
    description: "A bespoke fragrance capturing the essence of a morning in a rose garden. Notes of Bulgarian rose, sandalwood, and warm amber create an intoxicating, feminine signature that lingers.",
    details: [
      "50ml Eau de Parfum",
      "Notes: Rose, Sandalwood, Amber",
      "Longevity: 8-10 hours",
      "Vegan & Cruelty-free",
      "Recyclable glass bottle"
    ],
    sizes: ["50ml", "100ml"],
    colors: ["Single Option"],
    rating: 4.6,
    reviews: 156,
    sku: "FRG-005-N4"
  },
  {
    id: 6,
    name: "Linen Throw Blanket",
    price: 120.00,
    originalPrice: 140.00,
    image: null,
    category: "accessories",
    badge: "Sale",
    description: "Stone-washed pure linen throw blanket with a beautifully textured, lived-in feel. Pre-washed for ultimate softness from the first use. A versatile piece for every season.",
    details: [
      "100% French Linen",
      "Stone-washed finish",
      "Dimensions: 150cm × 130cm",
      "Machine washable",
      "Gets softer with every wash"
    ],
    sizes: ["Standard"],
    colors: ["Natural Linen", "Blush Rose", "Sage Green"],
    rating: 4.8,
    reviews: 89,
    sku: "ACC-006-LTB"
  },
  {
    id: 7,
    name: "Gold-Trim Coasters",
    price: 45.00,
    originalPrice: null,
    image: null,
    category: "gifts",
    badge: null,
    description: "Hand-poured marble resin coasters with 24k gold leaf trim. Set of 4 uniquely patterned coasters — no two are identical. Presented in a beautiful gift-ready box.",
    details: [
      "Set of 4 coasters",
      "Marble resin + 24k gold leaf",
      "Diameter: 10cm each",
      "Cork backing to protect surfaces",
      "Gift-ready packaging"
    ],
    sizes: ["Set of 4"],
    colors: ["White Marble", "Black Marble", "Rose Marble"],
    rating: 4.9,
    reviews: 112,
    sku: "GFT-007-GTC"
  },
  {
    id: 8,
    name: "Pearl Drop Earrings",
    price: 95.00,
    originalPrice: null,
    image: null,
    category: "accessories",
    badge: "New",
    description: "Freshwater pearl drop earrings set in sterling silver with a 14k rose gold wash. Each pearl is individually selected for luster and symmetry. Hypoallergenic posts for sensitive ears.",
    details: [
      "Freshwater pearls, 8-9mm",
      "925 Sterling silver + 14k rose gold",
      "Hypoallergenic posts",
      "Comes with jewelry pouch",
      "Threader style clasp"
    ],
    sizes: ["One Size"],
    colors: ["Rose Gold", "Silver"],
    rating: 4.8,
    reviews: 74,
    sku: "ACC-008-PDE"
  }
];

export const categories = [
  { id: "all", label: "All", icon: "auto_awesome" },
  { id: "shawls", label: "Shawls", icon: "checkroom" },
  { id: "gifts", label: "Gifts", icon: "card_giftcard" },
  { id: "accessories", label: "Accessories", icon: "diamond" },
];

export const getProductById = (id) => products.find(p => p.id === parseInt(id));

export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(p => p.category === category);
};
