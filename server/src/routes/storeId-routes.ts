import { Router } from "express";
import {
  createSingleCategory,
  getAllCategories,
} from "../controllers/storeId/category-controller";
import { createProducts } from "../controllers/storeId/product-controller";

const router = Router({ mergeParams: true });

// category routes
router.get("/category", getAllCategories);
router.post("/create-category", createSingleCategory);

// product routes
router.post("/products", createProducts)

export default router;
