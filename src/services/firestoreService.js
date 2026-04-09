// src/services/firestoreService.js
import {
  doc,
  setDoc,
  deleteDoc,
  collection,
  getDocs,
  writeBatch,
  addDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

// ─── Wishlist ─────────────────────────────────────────────────────────────────

/** Add a product to users/{uid}/wishlist/{productId} */
export const addToWishlistFS = async (uid, product) => {
  const ref = doc(db, 'users', uid, 'wishlist', String(product.id));
  await setDoc(ref, {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image || null,
    category: product.category || null,
    rating: product.rating || null,
    badge: product.badge || null,
  });
};

/** Remove a product from users/{uid}/wishlist/{productId} */
export const removeFromWishlistFS = async (uid, productId) => {
  const ref = doc(db, 'users', uid, 'wishlist', String(productId));
  await deleteDoc(ref);
};

/** Fetch all items in users/{uid}/wishlist */
export const getWishlistFS = async (uid) => {
  const snap = await getDocs(collection(db, 'users', uid, 'wishlist'));
  return snap.docs.map((d) => d.data());
};

// ─── Cart ─────────────────────────────────────────────────────────────────────

/** Save a single cart item to users/{uid}/cart/{cartId} */
export const addCartItemFS = async (uid, item) => {
  const ref = doc(db, 'users', uid, 'cart', item.cartId);
  await setDoc(ref, {
    id: item.id,
    cartId: item.cartId,
    name: item.name,
    price: item.price,
    image: item.image || null,
    quantity: item.quantity,
    selectedSize: item.selectedSize || null,
    selectedColor: item.selectedColor || null,
  });
};

/** Remove a cart item from users/{uid}/cart/{cartId} */
export const removeCartItemFS = async (uid, cartId) => {
  const ref = doc(db, 'users', uid, 'cart', cartId);
  await deleteDoc(ref);
};

/** Update quantity for a cart item */
export const updateCartItemFS = async (uid, cartId, quantity) => {
  const ref = doc(db, 'users', uid, 'cart', cartId);
  await setDoc(ref, { quantity }, { merge: true });
};

/** Clear all cart items for a user */
export const clearCartFS = async (uid) => {
  const snap = await getDocs(collection(db, 'users', uid, 'cart'));
  if (snap.empty) return;
  const batch = writeBatch(db);
  snap.docs.forEach((d) => batch.delete(d.ref));
  await batch.commit();
};

/** Fetch all cart items for a user */
export const getCartFS = async (uid) => {
  const snap = await getDocs(collection(db, 'users', uid, 'cart'));
  return snap.docs.map((d) => d.data());
};

// ─── Orders ───────────────────────────────────────────────────────────────────

/**
 * Place a new order.
 * Stored at: orders/{orderId}  (with userId field for querying)
 * Returns the new order document ID.
 */
export const placeOrderFS = async (uid, { items, subtotal, shipping, tax, total, address, paymentMethod }) => {
  const ref = await addDoc(collection(db, 'orders'), {
    userId: uid,
    items: items.map((item) => ({
      id: item.id,
      cartId: item.cartId,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      selectedSize: item.selectedSize || null,
      selectedColor: item.selectedColor || null,
      image: item.image || null,
    })),
    subtotal,
    shipping,
    tax,
    total,
    address: address || null,
    paymentMethod: paymentMethod || 'card',
    status: 'pending',
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

/**
 * Fetch all orders belonging to a user, sorted newest first.
 */
export const getOrdersFS = async (uid) => {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', uid),
    orderBy('createdAt', 'desc')
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    // Convert Firestore Timestamp → JS Date for display
    createdAt: d.data().createdAt?.toDate?.() || new Date(),
  }));
};
