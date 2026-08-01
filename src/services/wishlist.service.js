import Wishlist from "../models/wishlist.model.js";

export const getWishlistByUser = async (userId) => {
  return Wishlist.find({ userId }).sort({ createdAt: -1 });
};

export const addToWishlist = async (userId, productId) => {
  try {
    return await Wishlist.create({ userId, productId });
  } catch (err) {
    if (err.code === 11000) {
      const error = new Error("Este producto ya está en tu wishlist");
      error.statusCode = 400;
      throw error;
    }
    throw err;
  }
};

export const removeFromWishlist = async (userId, productId) => {
  const item = await Wishlist.findOneAndDelete({ userId, productId });
  if (!item) {
    const error = new Error("Producto no encontrado en tu wishlist");
    error.statusCode = 404;
    throw error;
  }
};