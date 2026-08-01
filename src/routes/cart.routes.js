import { Router } from "express";
import {
  getUserCart,
  postCartItem,
  putCartItem,
  deleteCartItem,
} from "../controllers/cart.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/cart:
 *   get:
 *     summary: Obtener el carrito del usuario autenticado
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contenido del carrito
 */
router.get("/", verifyToken, getUserCart);

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: Añadir un producto al carrito
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *               quantity:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Producto añadido al carrito
 */
router.post("/", verifyToken, postCartItem);

/**
 * @swagger
 * /api/cart/{productId}:
 *   put:
 *     summary: Actualizar la cantidad de un producto en el carrito
 *     tags: [Cart]
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
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cantidad actualizada
 */
router.put("/:productId", verifyToken, putCartItem);

/**
 * @swagger
 * /api/cart/{productId}:
 *   delete:
 *     summary: Eliminar un producto del carrito
 *     tags: [Cart]
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
 *         description: Producto eliminado del carrito
 */
router.delete("/:productId", verifyToken, deleteCartItem);

export default router;