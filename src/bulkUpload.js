// src/bulkUpload.js
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { products } from './data/products';

export const uploadAllProducts = async () => {
  console.log("Starting bulk upload of " + products.length + " products...");
  const productsCol = collection(db, 'products');
  let successCount = 0;
  let failedCount = 0;

  for (const product of products) {
    try {
      const productToUpload = Object.fromEntries(
        Object.entries(product).filter(([_, v]) => v !== undefined)
      );
      await addDoc(productsCol, productToUpload);
      successCount++;
      console.log(`Uploaded (${successCount}/${products.length}): ${product.name}`);
    } catch (error) {
      console.error(`Error uploading ${product.name}:`, error);
      failedCount++;
    }
  }

  console.log('--- Upload Complete ---');
  console.log(`✅ ${successCount} products uploaded successfully!`);
  if (failedCount > 0) {
    console.error(`❌ ${failedCount} products failed to upload.`);
  }
};
