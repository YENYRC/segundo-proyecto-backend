import { createOrderFromCart, getOrdersByUser } from "../services/checkout.service.js";

export const postCheckout = async (req, res, next) => {
  try {
    const order = await createOrderFromCart(req.user.id);
    res.status(201).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const orders = await getOrdersByUser(req.user.id);
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};