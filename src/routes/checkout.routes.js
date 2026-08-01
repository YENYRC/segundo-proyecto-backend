import { Router } from "express";
import { postCheckout, getOrders } from "../controllers/checkout.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Generar un pedido a partir del carrito actual
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Pedido creado correctamente
 */
router.post("/", verifyToken, postCheckout);

/**
 * @swagger
 * /api/checkout/orders:
 *   get:
 *     summary: Obtener el historial de pedidos del usuario
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 */
router.get("/orders", verifyToken, getOrders);

export default router;