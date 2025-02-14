import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";

import { addMember, getMembers } from "../controllers/member.js";

const router = Router();

router.post("/add-member", upload.single("image"), addMember);
router.get("/get-member", getMembers);

export default router;
