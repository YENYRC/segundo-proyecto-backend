import { Router } from "express";
import { register, login, logout, me, updateProfile } from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 */
router.post("/register", register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login exitoso, establece cookie httpOnly con el token
 */
router.post("/login", login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesión
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesión cerrada, cookie eliminada
 */
router.post("/logout", logout);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Obtener el usuario autenticado actualmente
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Datos del usuario logueado
 *       401:
 *         description: No autenticado
 */
router.get("/me", verifyToken, me);

/**
 * @swagger
 * /api/auth/me:
 *   put:
 *     summary: Actualizar datos del usuario autenticado
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       401:
 *         description: No autenticado
 */
router.put("/me", verifyToken, updateProfile);

export default router;