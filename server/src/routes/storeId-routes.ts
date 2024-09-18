import { Router } from "express";
import {
  createSingleCategory,
  deleteSingleCategory,
  getAllCategories,
  updateSingleCategory,
} from "../controllers/storeId/category-controller";
import {
  createProducts,
  deleteProducts,
  fetchAllProducts,
  updateProducts,
} from "../controllers/storeId/product-controller";
import { createBanners, deleteBanners, fetchAllBanners, updateBanners } from "../controllers/storeId/banner-controller";

const router = Router({ mergeParams: true });

// category routes
router.get("/category", getAllCategories);
router.post("/create-category", createSingleCategory);
router.put("/update-category/:categoryId", updateSingleCategory);
router.delete("/delete-category/:categoryId", deleteSingleCategory);

// product routes
router.get("/products", fetchAllProducts);
router.post("/create-product", createProducts);
router.put("/update-product", updateProducts);
router.delete("/delete-product", deleteProducts);

// banner routes
router.get("/banners", fetchAllBanners);
router.post("/create-banner", createBanners);
router.put("/update-banner", updateBanners);
router.delete("/delete-banner", deleteBanners);

export default router;