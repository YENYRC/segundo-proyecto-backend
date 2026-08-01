import {
  getWishlistByUser,
  addToWishlist,
  removeFromWishlist,
} from "../services/wishlist.service.js";

export const getWishlist = async (req, res, next) => {
  try {
    const wishlist = await getWishlistByUser(req.user.id);
    res.json({ success: true, data: wishlist });
  } catch (err) {
    next(err);
  }
};

export const postWishlistItem = async (req, res, next) => {
  try {
    const item = await addToWishlist(req.user.id, req.params.productId);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

export const deleteWishlistItem = async (req, res, next) => {
  try {
    await removeFromWishlist(req.user.id, req.params.productId);
    res.json({ success: true, message: "Producto eliminado de la wishlist" });
  } catch (err) {
    next(err);
  }
};