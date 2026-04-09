// src/context/WishlistContext.jsx
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import {
  addToWishlistFS,
  removeFromWishlistFS,
  getWishlistFS,
} from '../services/firestoreService';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const { user, isLoggedIn } = useAuth();
  const [wishlist, setWishlist] = useState([]); // array of product objects
  const [loading, setLoading] = useState(false);

  // ── Load wishlist from Firestore whenever the user changes ──────────────────
  useEffect(() => {
    if (!isLoggedIn || !user?.uid) {
      setWishlist([]);
      return;
    }

    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const items = await getWishlistFS(user.uid);
        if (!cancelled) setWishlist(items);
      } catch (err) {
        console.error('Failed to load wishlist:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [user?.uid, isLoggedIn]);

  // ── Helpers ─────────────────────────────────────────────────────────────────

  const isWishlisted = useCallback(
    (productId) => wishlist.some((p) => String(p.id) === String(productId)),
    [wishlist]
  );

  const addToWishlist = useCallback(
    async (product) => {
      if (!isLoggedIn || !user?.uid) return;
      // Optimistic update
      setWishlist((prev) =>
        prev.some((p) => String(p.id) === String(product.id))
          ? prev
          : [...prev, product]
      );
      try {
        await addToWishlistFS(user.uid, product);
      } catch (err) {
        console.error('Failed to add to wishlist:', err);
        // Rollback
        setWishlist((prev) => prev.filter((p) => String(p.id) !== String(product.id)));
      }
    },
    [user?.uid, isLoggedIn]
  );

  const removeFromWishlist = useCallback(
    async (productId) => {
      if (!isLoggedIn || !user?.uid) return;
      // Optimistic update
      const prev = wishlist;
      setWishlist((w) => w.filter((p) => String(p.id) !== String(productId)));
      try {
        await removeFromWishlistFS(user.uid, productId);
      } catch (err) {
        console.error('Failed to remove from wishlist:', err);
        setWishlist(prev);
      }
    },
    [user?.uid, isLoggedIn, wishlist]
  );

  const toggleWishlist = useCallback(
    async (product) => {
      if (isWishlisted(product.id)) {
        await removeFromWishlist(product.id);
        return false; // now removed
      } else {
        await addToWishlist(product);
        return true; // now added
      }
    },
    [isWishlisted, addToWishlist, removeFromWishlist]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        loading,
        isWishlisted,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
};
