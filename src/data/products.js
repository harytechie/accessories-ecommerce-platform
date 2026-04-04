// src/data/products.js
// Mock product data based on Atelier boutique design

export const productData = [
  {
    id: 1,
    name: "Rose Silk Burga Shawl",
    price: 185.00,
    originalPrice: 220.00,
    image: "/assets/shawls/Rose_Silk_Burga_Shawl1.jpg",
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
    image: "/assets/gifts/gift10.jpeg",
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
    image: "/assets/accessories/jewel1.jpeg",
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
    image: "/assets/shawls/gray_shawl.png",
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
    image: "/assets/gifts/gift12.jpeg",
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
    image: "/assets/accessories/jewel2.jpeg",
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
    image: "/assets/gifts/gift14.jpeg",
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
    id: 9,
    name: "Artisan Coffee Lovers Set",
    price: 85.00,
    originalPrice: 100.00,
    image: "/assets/gifts/gift1.jpeg",
    category: "gifts",
    badge: "Popular",
    description: "A luxurious collection for coffee enthusiasts featuring artisan-roasted beans, a ceramic pour-over, and handcrafted wooden accessories. Beautifully packaged in a sustainable gift box.",
    details: [
      "Premium artisan-roasted coffee beans (250g)",
      "Handcrafted ceramic pour-over",
      "Bamboo coffee scoop",
      "Reusable cotton gift bag",
      "Presented in eco-friendly box"
    ],
    sizes: ["Standard"],
    colors: ["Dark Roast", "Medium Roast"],
    rating: 4.7,
    reviews: 134,
    sku: "GFT-009-ACL"
  },
  {
    id: 10,
    name: "Birthday Surprise Box",
    price: 78.00,
    originalPrice: 95.00,
    image: "/assets/gifts/gift2.png",
    category: "gifts",
    badge: "Popular",
    description: "Make any birthday memorable with this delightful collection of luxurious treats and heartfelt surprises. Includes premium chocolates, scented candles, and artisan keepsakes.",
    details: [
      "Artisan chocolate truffles (12 pcs)",
      "Hand-poured soy candle",
      "Miniature dried flower bouquet",
      "Personalized greeting card",
      "Luxury gift box with ribbon"
    ],
    sizes: ["Standard", "Deluxe"],
    colors: ["Rose", "Gold", "Lavender"],
    rating: 4.8,
    reviews: 189,
    sku: "GFT-010-BSB"
  },
  {
    id: 11,
    name: "Midnight Luxury Gift Set",
    price: 150.00,
    originalPrice: 195.00,
    image: "/assets/gifts/gift3.jpeg",
    category: "gifts",
    badge: "Limited",
    description: "An opulent collection for those who appreciate the finer things. Features premium skincare, a silk eye mask, and aromatic bath treasures in a sophisticated midnight-themed box.",
    details: [
      "Luxury silk eye mask",
      "Premium bath oil (100ml)",
      "Rose gold plated nail file",
      "Aromatic potpourri sachets",
      "Black velvet gift box"
    ],
    sizes: ["Standard"],
    colors: ["Midnight Blue", "Black"],
    rating: 4.9,
    reviews: 54,
    sku: "GFT-011-MLG"
  },
  {
    id: 12,
    name: "Blush Pink Gift Collection",
    price: 110.00,
    originalPrice: null,
    image: "/assets/gifts/gift4.jpeg",
    category: "gifts",
    badge: "Limited",
    description: "A romantic and elegant gift set featuring blush-toned treasures. Perfect for anniversaries, Valentine's, or showing someone special how much you care.",
    details: [
      "Rose quartz pendant necklace",
      "Blush silk pocket square",
      "Hand-poured pink candle",
      "Macaron gift box (6 pcs)",
      "Satin ribbon-wrapped box"
    ],
    sizes: ["Standard"],
    colors: ["Blush Pink", "Rose Gold"],
    rating: 4.8,
    reviews: 98,
    sku: "GFT-012-BPG"
  },
  {
    id: 13,
    name: "Eco-Luxury Gift Box",
    price: 70.00,
    originalPrice: null,
    image: "/assets/gifts/gift5.jpeg",
    category: "gifts",
    badge: "Sustainable",
    description: "A sustainable luxury gift that doesn't compromise on elegance. Featuring organic products, reusable materials, and beautifully eco-conscious packaging.",
    details: [
      "Organic bamboo skincare set",
      "Natural beeswax candles",
      "Reusable beeswax food wraps",
      "Organic cotton muslin bag",
      "Recyclable kraft packaging"
    ],
    sizes: ["Standard"],
    colors: ["Natural", "Sage"],
    rating: 4.6,
    reviews: 93,
    sku: "GFT-013-ELG"
  },
  {
    id: 14,
    name: "Golden Anniversary Hamper",
    price: 200.00,
    originalPrice: null,
    image: "/assets/gifts/gift6.jpeg",
    category: "gifts",
    badge: "Premium",
    description: "Celebrate decades of love with this magnificent golden anniversary hamper. A luxurious collection of premium champagne, gourmet chocolates, and heartfelt keepsakes.",
    details: [
      "Premium champagne (750ml)",
      "Godiva chocolate collection",
      "24k gold-plated photo frame",
      "Silk roses (preserved)",
      "Wicker hamper basket"
    ],
    sizes: ["Standard"],
    colors: ["Gold", "Champagne"],
    rating: 5.0,
    reviews: 43,
    sku: "GFT-014-GAH"
  },
  {
    id: 15,
    name: "Personalized Leather Wallet & Keychain Set",
    price: 110.00,
    originalPrice: 140.00,
    image: "/assets/gifts/gift8.jpeg",
    category: "gifts",
    badge: "Seasonal",
    description: "A thoughtful personalized gift featuring premium leather goods that will age beautifully. Custom initials or names make this a truly unique present.",
    details: [
      "Full-grain leather bifold wallet",
      "Leather keychain with brass hardware",
      "Custom embossing (up to 3 letters)",
      "Gift-ready presentation box",
      "Care instructions included"
    ],
    sizes: ["Standard"],
    colors: ["Cognac", "Black", "Navy"],
    rating: 4.7,
    reviews: 156,
    sku: "GFT-015-PLK"
  },
  {
    id: 16,
    name: "Bridal Shower Gift Box",
    price: 145.00,
    originalPrice: null,
    image: "/assets/gifts/gift9.jpeg",
    category: "gifts",
    badge: "New",
    description: "Help the bride-to-be feel cherished with this elegant bridal shower collection. Features luxurious spa items, wedding essentials, and heartfelt touches.",
    details: [
      "Silk robe and shorts set",
      "Champagne stemless glasses (2 pcs)",
      "Rose gold jewelry box",
      "Bridal shower sash and veil",
      "White satin gift box"
    ],
    sizes: ["Standard"],
    colors: ["White", "Ivory", "Blush"],
    rating: 4.9,
    reviews: 112,
    sku: "GFT-016-BSG"
  },
  {
    id: 17,
    name: "Pearl Drop Earrings",
    price: 95.00,
    originalPrice: null,
    image: "/assets/accessories/jewel3.jpeg",
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
  },
  {
    id: 18,
    name: "Crystal Pendant Necklace",
    price: 145.00,
    originalPrice: null,
    image: "/assets/accessories/jewel4.jpeg",
    category: "accessories",
    badge: "Bestseller",
    description: "A stunning crystal pendant necklace featuring ethically sourced gemstones set in 18k gold-plated sterling silver. The perfect statement piece for any occasion.",
    details: [
      "Ethically sourced crystals",
      "18k gold-plated sterling silver chain",
      "Pendant size: 2.5cm",
      "Chain length: 45cm + 5cm extender",
      "Comes in luxury gift box"
    ],
    sizes: ["One Size"],
    colors: ["Clear Crystal", "Rose Quartz", "Amethyst"],
    rating: 4.9,
    reviews: 156,
    sku: "ACC-018-CPN"
  },
  {
    id: 19,
    name: "Diamond Tennis Bracelet",
    price: 320.00,
    originalPrice: 380.00,
    image: "/assets/accessories/jewel5.jpeg",
    category: "accessories",
    badge: "Premium",
    description: "An exquisite diamond tennis bracelet featuring 24 pavé-set diamonds on a delicate 14k white gold chain. Timeless elegance for the modern woman.",
    details: [
      "24 pavé-set diamonds (0.5ct total)",
      "14k white gold chain",
      "Length: 18cm with lobster clasp",
      "Secure box clasp with safety latch",
      "Certificate of authenticity included"
    ],
    sizes: ["18cm"],
    colors: ["White Gold", "Yellow Gold", "Rose Gold"],
    rating: 5.0,
    reviews: 89,
    sku: "ACC-019-DTB"
  },
  {
    id: 20,
    name: "Sapphire Stud Earrings",
    price: 275.00,
    originalPrice: null,
    image: "/assets/accessories/jewel6.jpeg",
    category: "accessories",
    badge: "Limited",
    description: "Deep blue sapphire stud earrings set in platinum, featuring carefully selected stones with exceptional clarity. A sophisticated choice for everyday luxury.",
    details: [
      "Natural sapphires, 6mm each",
      "Platinum 950 setting",
      "Push-back backs",
      "Hallmarked platinum",
      "Luxury jewelry pouch included"
    ],
    sizes: ["One Size"],
    colors: ["Royal Blue", "Cornflower", "Teal"],
    rating: 4.9,
    reviews: 67,
    sku: "ACC-020-SSE"
  },
  {
    id: 21,
    name: "Emerald Drop Earrings",
    price: 195.00,
    originalPrice: 250.00,
    image: "/assets/accessories/jewel7.jpeg",
    category: "accessories",
    badge: "Sale",
    description: "Vibrant emerald drop earrings featuring Colombian emeralds with exceptional color saturation. Set in 18k yellow gold with diamond accents.",
    details: [
      "Colombian emeralds, 1.2ct each",
      "18k yellow gold setting",
      "Diamond accents (0.3ct total)",
      "French hook with safety latch",
      "Elegant gift box packaging"
    ],
    sizes: ["One Size"],
    colors: ["Deep Green", "Emerald"],
    rating: 4.8,
    reviews: 112,
    sku: "ACC-021-EDE"
  },
  {
    id: 22,
    name: "Pearl Strand Necklace",
    price: 285.00,
    originalPrice: null,
    image: "/assets/accessories/jewel8.jpeg",
    category: "accessories",
    badge: "New",
    description: "A classic pearl strand necklace featuring 42 hand-selected freshwater pearls with beautiful luster. The quintessential piece for elegant occasions.",
    details: [
      "42 hand-selected freshwater pearls",
      "Pearl size: 9-10mm",
      "18k gold clasp with diamond accent",
      "Length: 45cm",
      "Silk storage pouch included"
    ],
    sizes: ["45cm"],
    colors: ["White", "Cream", "Pink"],
    rating: 4.9,
    reviews: 134,
    sku: "ACC-022-PSN"
  },
  {
    id: 23,
    name: "Ruby Halo Ring",
    price: 450.00,
    originalPrice: null,
    image: "/assets/accessories/jewel9.jpeg",
    category: "accessories",
    badge: "Premium",
    description: "A breathtaking ruby ring featuring a 2-carat oval ruby surrounded by a halo of brilliant-cut diamonds. Set in platinum for enduring beauty.",
    details: [
      "Natural oval ruby, 2ct",
      "Diamond halo (0.8ct total)",
      "Platinum 950 band",
      "Available sizes: 5-9",
      "Luxury ring box included"
    ],
    sizes: ["5", "6", "7", "8", "9"],
    colors: ["Ruby Red"],
    rating: 5.0,
    reviews: 45,
    sku: "ACC-023-RHR"
  },
  {
    id: 24,
    name: "Vintage Brooch Collection",
    price: 165.00,
    originalPrice: 200.00,
    image: "/assets/accessories/jewel10.jpeg",
    category: "accessories",
    badge: "Vintage",
    description: "A stunning vintage-inspired brooch featuring Art Deco design elements with mother-of-pearl and marcasite. A unique statement piece for the discerning collector.",
    details: [
      "Art Deco inspired design",
      "Mother-of-pearl with marcasite accents",
      "Rhodium-plated base",
      "Safety pin backing",
      "Antique-style gift box"
    ],
    sizes: ["One Size"],
    colors: ["Silver", "Antique Gold"],
    rating: 4.7,
    reviews: 78,
    sku: "ACC-024-VBC"
  },
  {
    id: 25,
    name: "Gold Chain Layering Set",
    price: 125.00,
    originalPrice: null,
    image: "/assets/accessories/jewel11.jpeg",
    category: "accessories",
    badge: "Trending",
    description: "A beautiful set of three delicate gold chains in varying lengths, perfect for creating the on-trend layered look. 14k solid gold with minimalist pendants.",
    details: [
      "Set of 3 chains",
      "14k solid gold",
      "Lengths: 40cm, 50cm, 60cm",
      "Minimalist pendant accents",
      "Secure lobster clasp each"
    ],
    sizes: ["Standard"],
    colors: ["Yellow Gold", "White Gold", "Rose Gold"],
    rating: 4.6,
    reviews: 201,
    sku: "ACC-025-GCL"
  },
  {
    id: 26,
    name: "Plum Purple Silk Shawl",
    price: 195.00,
    originalPrice: 240.00,
    image: "/assets/shawls/Plum_Purple_shawl1.jpg",
    category: "shawls",
    badge: "New",
    description: "A rich, deep plum purple shawl crafted from the finest mulberry silk. The vibrant hue is achieved through natural dyes, providing a luxurious depth of color that complements any evening attire.",
    details: [
      "100% Mulberry Silk",
      "Hand-dyed with natural pigments",
      "Dimensions: 185cm × 75cm",
      "Elegant fringe detail",
      "Includes luxury gift wrap"
    ],
    sizes: ["Standard"],
    colors: ["Plum Purple"],
    rating: 4.8,
    reviews: 42,
    sku: "SHW-026-PP"
  },
  {
    id: 27,
    name: "Mustard Gold Pashmina",
    price: 215.00,
    originalPrice: null,
    image: "/assets/shawls/Mustard_Gold1.jpeg",
    category: "shawls",
    badge: "Trending",
    description: "Experience the warmth and softness of authentic Pashmina in a striking mustard gold. This hand-spun shawl offers lightweight comfort with exceptional insulation, perfect for keeping the chill away in style.",
    details: [
      "Authentic Pashmina Wool",
      "Hand-spun and hand-woven",
      "Vibrant mustard gold hue",
      "Feather-light texture",
      "Ethically sourced materials"
    ],
    sizes: ["Standard"],
    colors: ["Mustard Gold"],
    rating: 4.9,
    reviews: 56,
    sku: "SHW-027-MG"
  },
  {
    id: 28,
    name: "Chocolate Brown Artisan Shawl",
    price: 175.00,
    originalPrice: 210.00,
    image: "/assets/shawls/Chocolate_Brown1.jpeg",
    category: "shawls",
    badge: "Sale",
    description: "A versatile chocolate brown shawl featuring a subtle herringbone weave. This timeless piece is made from a premium wool-silk blend, offering a sophisticated drape and a soft, comfortable feel.",
    details: [
      "Wool-Silk Blend",
      "Subtle herringbone pattern",
      "Rich chocolate brown tone",
      "Durable yet soft",
      "Hand-finished edges"
    ],
    sizes: ["Large"],
    colors: ["Chocolate Brown"],
    rating: 4.7,
    reviews: 89,
    sku: "SHW-028-CB"
  },
  {
    id: 29,
    name: "Midnight Black Evening Shawl",
    price: 230.00,
    originalPrice: 280.00,
    image: "/assets/shawls/black_shawl2.jpeg",
    category: "shawls",
    badge: "Limited",
    description: "The ultimate evening accessory. This midnight black shawl features delicate hand-embroidery along the borders, adding a touch of understated opulence to your most formal outfits.",
    details: [
      "Fine Merino Wool",
      "Hand-embroidered silk borders",
      "Deep midnight black",
      "Oversized for versatile styling",
      "Specialty dry clean only"
    ],
    sizes: ["XL"],
    colors: ["Midnight Black"],
    rating: 5.0,
    reviews: 31,
    sku: "SHW-029-MB"
  },
  {
    id: 30,
    name: "Blush Pink Modal Shawl",
    price: 95.00,
    originalPrice: null,
    image: "/assets/shawls/pink_shawl.png",
    category: "shawls",
    badge: "Essential",
    description: "A soft and breathable modal shawl in a delicate blush pink. Perfect for layering during transitional seasons, this eco-friendly fabric offers a silky touch and a beautiful sheen.",
    details: [
      "100% Eco-friendly Modal",
      "Breathable and lightweight",
      "Soft blush pink color",
      "Wrinkle-resistant",
      "Machine washable (delicate)"
    ],
    sizes: ["Standard"],
    colors: ["Blush Pink"],
    rating: 4.6,
    reviews: 112,
    sku: "SHW-030-BP"
  }

];

export const categories = [
  { id: "all", label: "All", icon: "auto_awesome" },
  { id: "shawls", label: "Shawls", icon: "checkroom" },
  { id: "gifts", label: "Gifts", icon: "card_giftcard" },
  { id: "accessories", label: "Accessories", icon: "diamond" },
];

export const products = productData;

export const getProductById = (id) => productData.find(p => p.id === parseInt(id));

export const getProductsByCategory = (category) => {
  if (category === 'all') return productData;
  return productData.filter(p => p.category === category);
};
