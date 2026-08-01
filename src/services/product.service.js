import cloudinary from "../config/cloudinary.js";
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

export const getAllProducts = async () => {
  return prisma.product.findMany({ orderBy: { createdAt: "desc" } });
};

export const getProductById = async (id) => {
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    const error = new Error("Producto no encontrado");
    error.statusCode = 404;
    throw error;
  }
  return product;
};

export const createProduct = async (data) => {
  return prisma.product.create({ data });
};

export const updateProduct = async (id, data) => {
  await getProductById(id);
  return prisma.product.update({ where: { id }, data });
};

export const deleteProduct = async (id) => {
  await getProductById(id);
  return prisma.product.delete({ where: { id } });
};

export const uploadImage = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "productos" },
      (error, result) => {
        if (error) reject(error);
        else resolve(result.secure_url);
      }
    );
    stream.end(fileBuffer);
  });
};