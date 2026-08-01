import {
  getCart,
  addItemToCart,
  updateCartItem,
  removeItemFromCart,
} from "../services/cart.service.js";

export const getUserCart = async (req, res, next) => {
  try {
    const items = await getCart(req.user.id);
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};

export const postCartItem = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const item = await addItemToCart(req.user.id, productId, quantity);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

export const putCartItem = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const item = await updateCartItem(req.user.id, req.params.productId, quantity);
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

export const deleteCartItem = async (req, res, next) => {
  try {
    await removeItemFromCart(req.user.id, req.params.productId);
    res.json({ success: true, message: "Producto eliminado del carrito" });
  } catch (err) {
    next(err);
  }
};