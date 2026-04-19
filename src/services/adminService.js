// src/services/adminService.js
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

// ─── Products CRUD ────────────────────────────────────────────────────────────

/** Fetch all products */
export const getAllProductsAdmin = async () => {
  const snap = await getDocs(collection(db, 'products'));
  return snap.docs.map((d) => ({
    docId: d.id,
    ...d.data(),
  }));
};

/** Add a new product */
export const addProductAdmin = async (productData) => {
  const ref = await addDoc(collection(db, 'products'), {
    ...productData,
    createdAt: serverTimestamp(),
  });
  return ref.id;
};

/** Update an existing product */
export const updateProductAdmin = async (docId, data) => {
  const ref = doc(db, 'products', docId);
  await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/** Delete a product */
export const deleteProductAdmin = async (docId) => {
  const ref = doc(db, 'products', docId);
  await deleteDoc(ref);
};

// ─── Orders Management ────────────────────────────────────────────────────────

/** Fetch all orders (admin: no userId filter) */
export const getAllOrdersAdmin = async () => {
  const snap = await getDocs(collection(db, 'orders'));
  const orders = snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt || Date.now()),
    };
  });
  return orders.sort((a, b) => b.createdAt - a.createdAt);
};

/** Update an order's status */
export const updateOrderStatusAdmin = async (orderId, newStatus) => {
  const ref = doc(db, 'orders', orderId);
  await updateDoc(ref, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
};

// ─── Users (Read-Only) ───────────────────────────────────────────────────────

/** Fetch all registered users */
export const getAllUsersAdmin = async () => {
  const snap = await getDocs(collection(db, 'users'));
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      ...data,
      createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt || Date.now()),
    };
  });
};
