import { Router } from "express";
import { multipleImageUpload, singleImageUpload } from "../controllers/uploads";
import { upload } from "../services/multer";

const router = Router({ mergeParams: true });

router.post("/multiple-images", upload.array("images"), multipleImageUpload);
router.post("/single-image", upload.single("images"), singleImageUpload);

export default router;
