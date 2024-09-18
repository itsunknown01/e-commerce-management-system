import { Router } from "express";
import {
  createSingleCategory,
  deleteSingleCategory,
  getAllCategories,
  updateSingleCategory,
} from "../controllers/storeId/category-controller";
import { createProducts, fetchAllProducts } from "../controllers/storeId/product-controller";

const router = Router({ mergeParams: true });

// category routes
router.get("/category", getAllCategories);
router.post("/create-category", createSingleCategory);
router.put("/update-category/:categoryId", updateSingleCategory);
router.delete("/delete-category/:categoryId", deleteSingleCategory);

// product routes
router.get("/products", fetchAllProducts)
router.post("/create-product", createProducts);

export default router;
