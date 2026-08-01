import { Router } from "express";
import {
  getReviews,
  postReview,
  removeReview,
} from "../controllers/review.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/reviews/{productId}:
 *   get:
 *     summary: Obtener reseñas de un producto
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de reseñas
 */
router.get("/:productId", getReviews);

/**
 * @swagger
 * /api/reviews/{productId}:
 *   post:
 *     summary: Crear una reseña para un producto
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reseña creada correctamente
 */
router.post("/:productId", verifyToken, postReview);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: Eliminar una reseña propia
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reseña eliminada correctamente
 */
router.delete("/:id", verifyToken, removeReview);

export default router;