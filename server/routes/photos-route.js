import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import {
  addPhotos,
  getPhotos,
} from "../controllers/photos.js";

const router = Router();

router.post("/add-photos", upload.single("image"), addPhotos);
router.get("/get-photos", getPhotos);

export default router;
