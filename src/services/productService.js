// src/services/productService.js
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

// Get all products
export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map(doc => ({
      docId: doc.id,
      ...doc.data()
    }));
    console.log("✅ Fetched products:", products.length);
    return products;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
};

// Get products by category
export const getProductsByCategory = async (category) => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("category", "==", category));
    const snapshot = await getDocs(q);
    const products = snapshot.docs.map(doc => ({
      docId: doc.id,
      ...doc.data()
    }));
    console.log(`✅ Fetched ${category} products:`, products.length);
    return products;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

// Get single product by ID
export const getProductById = async (productId) => {
  try {
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("id", "==", parseInt(productId)));
    const snapshot = await getDocs(q);
    if (snapshot.docs.length > 0) {
      const product = {
        docId: snapshot.docs[0].id,
        ...snapshot.docs[0].data()
      };
      console.log("✅ Fetched product:", product.name);
      return product;
    }
    console.warn("⚠️ Product not found");
    return null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
