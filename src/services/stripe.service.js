import Stripe from "stripe";
import "dotenv/config";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (items) => {
  const lineItems = items.map((item) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: lineItems,
    success_url: `${process.env.FRONTEND_URL}/checkout/success`,
    cancel_url: `${process.env.FRONTEND_URL}/cart`,
  });

  return session.url;
};