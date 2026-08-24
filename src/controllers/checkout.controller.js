import { createOrderFromCart, getOrdersByUser } from "../services/checkout.service.js";
import { getCart } from "../services/cart.service.js";
import { createCheckoutSession } from "../services/stripe.service.js";

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

export const createStripeSession = async (req, res, next) => {
  try {
    const cartItems = await getCart(req.user.id);

    if (cartItems.length === 0) {
      const error = new Error("Tu carrito está vacío");
      error.statusCode = 400;
      throw error;
    }

    const items = cartItems.map((item) => ({
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
    }));

    const url = await createCheckoutSession(items);

    res.json({ success: true, data: { url } });
  } catch (err) {
    next(err);
  }
};