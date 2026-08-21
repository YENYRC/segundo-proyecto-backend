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

const getOrCreateCart = async (userId) => {
  let cart = await prisma.cart.findUnique({ where: { userId } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { userId } });
  }
  return cart;
};

export const getCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  return prisma.cartItem.findMany({
    where: { cartId: cart.id },
    include: { product: true },
  });
};

export const addItemToCart = async (userId, productId, quantity = 1) => {
  const cart = await getOrCreateCart(userId);

  const existingItem = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });

  if (existingItem) {
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
      include: { product: true },
    });
  }

  return prisma.cartItem.create({
    data: { cartId: cart.id, productId, quantity },
    include: { product: true },
  });
};

export const updateCartItem = async (userId, productId, quantity) => {
  const cart = await getOrCreateCart(userId);
  const item = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });
  if (!item) {
    const error = new Error("Producto no encontrado en el carrito");
    error.statusCode = 404;
    throw error;
  }
  return prisma.cartItem.update({
    where: { id: item.id },
    data: { quantity },
    include: { product: true },
  });
};

export const removeItemFromCart = async (userId, productId) => {
  const cart = await getOrCreateCart(userId);
  const item = await prisma.cartItem.findUnique({
    where: { cartId_productId: { cartId: cart.id, productId } },
  });
  if (!item) {
    const error = new Error("Producto no encontrado en el carrito");
    error.statusCode = 404;
    throw error;
  }
  await prisma.cartItem.delete({ where: { id: item.id } });
};
