import { Router } from "express";
import { postCheckout, getOrders, createStripeSession } from "../controllers/checkout.controller.js";
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

/**
 * @swagger
 * /api/checkout/session:
 *   post:
 *     summary: Crear una sesión de pago con Stripe a partir del carrito
 *     tags: [Checkout]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: URL de la sesión de pago de Stripe
 */
router.post("/session", verifyToken, createStripeSession);

export default router;