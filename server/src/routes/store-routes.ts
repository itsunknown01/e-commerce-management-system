import { Router } from "express";
import { createSingleStore, getAllStores } from "../controllers/store/store-controller";

const router = Router()

router.get('/store',getAllStores)
router.post('/create-store',createSingleStore)

export default router;