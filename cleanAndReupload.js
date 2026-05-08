import { db } from "./src/firebase.js";
import { productData } from "./src/data/products.js";
import { 
  collection, 
  getDocs, 
  deleteDoc, 
  doc, 
  setDoc, 
  writeBatch 
} from "firebase/firestore";

async function cleanAndReupload() {
  console.log("🚀 Starting Clean and Re-upload process...");

  try {
    // 1. DELETE ALL PRODUCTS
    console.log("--- Phase 1: Cleaning Firestore ---");
    const productsCollection = collection(db, "products");
    const snapshot = await getDocs(productsCollection);
    
    if (snapshot.empty) {
      console.log("No existing products found to delete.");
    } else {
      console.log(`Found ${snapshot.size} products. Deleting...`);
      
      // Use batches for deletion if there are many docs (Firestore limit is 500 per batch)
      let deleteCount = 0;
      const batch = writeBatch(db);
      
      snapshot.forEach((document) => {
        batch.delete(document.ref);
        deleteCount++;
      });
      
      await batch.commit();
      console.log(`✅ Successfully deleted ${deleteCount} ghost products.`);
    }

    // 2. RE-UPLOAD PRODUCTS
    console.log("\n--- Phase 2: Re-uploading Local Products ---");
    console.log(`Preparing to upload ${productData.length} products...`);

    for (const product of productData) {
      // Handle null values correctly (though Firestore accepts null, we ensure they are clean)
      const cleanProduct = {
        ...product,
        originalPrice: product.originalPrice ?? null,
        badge: product.badge ?? null
      };

      // We use product.id as the document ID to prevent future duplicates
      // If you run this script again, it will just overwrite the same doc instead of creating a new one
      const docRef = doc(db, "products", String(product.id));
      await setDoc(docRef, cleanProduct);
      
      console.log(`📤 Uploaded [ID: ${product.id}] ${product.name}`);
    }

    console.log("\n✨ Process Completed Successfully!");
    console.log(`Total products in Firestore: ${productData.length}`);
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Error during process:", error);
    process.exit(1);
  }
}

cleanAndReupload();
