import {
  getReviewsByProduct,
  createReview,
  deleteReview,
} from "../services/review.service.js";

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await getReviewsByProduct(req.params.productId);
    res.json({ success: true, data: reviews });
  } catch (err) {
    next(err);
  }
};

export const postReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const review = await createReview({
      productId: req.params.productId,
      userId: req.user.id,
      userName: req.user.name || req.user.email || "Usuario",
      rating,
      comment,
    });
    res.status(201).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

export const removeReview = async (req, res, next) => {
  try {
    await deleteReview(req.params.id, req.user.id);
    res.json({ success: true, message: "Reseña eliminada correctamente" });
  } catch (err) {
    next(err);
  }
};