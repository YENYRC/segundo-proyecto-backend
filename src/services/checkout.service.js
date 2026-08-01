import { PrismaClient } from "../../generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "pg";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const createOrderFromCart = async (userId) => {
  const cart = await prisma.cart.findUnique({ where: { userId } });

  if (!cart) {
    const error = new Error("No tienes un carrito activo");
    error.statusCode = 400;
    throw error;
  }

  const cartItems = await prisma.cartItem.findMany({ where: { cartId: cart.id } });

  if (cartItems.length === 0) {
    const error = new Error("Tu carrito está vacío");
    error.statusCode = 400;
    throw error;
  }

  const products = await prisma.product.findMany({
    where: { id: { in: cartItems.map((item) => item.productId) } },
  });

  const orderItemsData = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);
    return {
      productId: item.productId,
      quantity: item.quantity,
      price: product.price,
    };
  });

  const total = orderItemsData.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const order = await prisma.order.create({
    data: {
      userId,
      total,
      status: "completed",
      items: { create: orderItemsData },
    },
    include: { items: true },
  });

  await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

  return order;
};

export const getOrdersByUser = async (userId) => {
  return prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
};