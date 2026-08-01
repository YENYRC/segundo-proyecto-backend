import { Router } from "express";
import {
  getProducts,
  getProduct,
  postProduct,
  putProduct,
  removeProduct,
} from "../controllers/product.controller.js";
import { verifyToken, requireRole } from "../middlewares/auth.middleware.js";
import upload from "../config/multer.js";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", verifyToken, requireRole("admin"), upload.single("image"), postProduct);
router.put("/:id", verifyToken, requireRole("admin"), upload.single("image"), putProduct);
router.delete("/:id", verifyToken, requireRole("admin"), removeProduct);

export default router;