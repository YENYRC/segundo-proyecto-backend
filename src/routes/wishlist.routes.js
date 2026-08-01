import { Router } from "express";
import {
  getWishlist,
  postWishlistItem,
  deleteWishlistItem,
} from "../controllers/wishlist.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Obtener la wishlist del usuario autenticado
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos en la wishlist
 */
router.get("/", verifyToken, getWishlist);

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   post:
 *     summary: Añadir un producto a la wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Producto añadido a la wishlist
 */
router.post("/:productId", verifyToken, postWishlistItem);

/**
 * @swagger
 * /api/wishlist/{productId}:
 *   delete:
 *     summary: Eliminar un producto de la wishlist
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado de la wishlist
 */
router.delete("/:productId", verifyToken, deleteWishlistItem);

export default router;