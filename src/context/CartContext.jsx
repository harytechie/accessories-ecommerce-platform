// src/context/CartContext.jsx
import { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  addCartItemFS,
  removeCartItemFS,
  updateCartItemFS,
  clearCartFS,
  getCartFS,
} from '../services/firestoreService';

const CartContext = createContext(null);

// Cart action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART',
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      return { ...state, items: action.payload };

    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1, selectedSize, selectedColor, cartId } = action.payload;
      const existingIndex = state.items.findIndex(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );
      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return { ...state, items: updatedItems };
      }
      return {
        ...state,
        items: [
          ...state.items,
          { ...product, quantity, selectedSize, selectedColor, cartId },
        ],
      };
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.cartId !== action.payload.cartId),
      };

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { cartId, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.cartId !== cartId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.cartId === cartId ? { ...item, quantity } : item
        ),
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [] };

    default:
      return state;
  }
};

const initialState = { items: [] };

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { user, isLoggedIn } = useAuth();

  // ── Load cart from Firestore when user logs in ─────────────────────────────
  useEffect(() => {
    if (!isLoggedIn || !user?.uid) {
      dispatch({ type: CART_ACTIONS.CLEAR_CART });
      return;
    }

    let cancelled = false;
    const load = async () => {
      try {
        const items = await getCartFS(user.uid);
        if (!cancelled) {
          dispatch({ type: CART_ACTIONS.LOAD_CART, payload: items });
        }
      } catch (err) {
        console.error('Failed to load cart:', err);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [user?.uid, isLoggedIn]);

  // ── Actions ────────────────────────────────────────────────────────────────

  const addItem = useCallback(
    (product, quantity = 1, selectedSize, selectedColor) => {
      // Check if same item already exists so we can update qty in Firestore
      const existingItem = state.items.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      );

      if (existingItem) {
        const newQty = existingItem.quantity + quantity;
        dispatch({
          type: CART_ACTIONS.UPDATE_QUANTITY,
          payload: { cartId: existingItem.cartId, quantity: newQty },
        });
        if (user?.uid) {
          updateCartItemFS(user.uid, existingItem.cartId, newQty).catch(console.error);
        }
        return;
      }

      const cartId = `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`;
      const newItem = { ...product, quantity, selectedSize, selectedColor, cartId };

      dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity, selectedSize, selectedColor, cartId } });

      if (user?.uid) {
        addCartItemFS(user.uid, newItem).catch(console.error);
      }
    },
    [state.items, user?.uid]
  );

  const removeItem = useCallback(
    (cartId) => {
      dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { cartId } });
      if (user?.uid) {
        removeCartItemFS(user.uid, cartId).catch(console.error);
      }
    },
    [user?.uid]
  );

  const updateQuantity = useCallback(
    (cartId, quantity) => {
      dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { cartId, quantity } });
      if (user?.uid) {
        if (quantity <= 0) {
          removeCartItemFS(user.uid, cartId).catch(console.error);
        } else {
          updateCartItemFS(user.uid, cartId, quantity).catch(console.error);
        }
      }
    },
    [user?.uid]
  );

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
    if (user?.uid) {
      clearCartFS(user.uid).catch(console.error);
    }
  }, [user?.uid]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 200 ? 0 : 15;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        subtotal,
        shipping,
        tax,
        total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
