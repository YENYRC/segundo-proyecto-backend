import Review from "../models/review.model.js";

export const getReviewsByProduct = async (productId) => {
  return Review.find({ productId }).sort({ createdAt: -1 });
};

export const createReview = async ({ productId, userId, userName, rating, comment }) => {
  return Review.create({ productId, userId, userName, rating, comment });
};

export const deleteReview = async (id, userId) => {
  const review = await Review.findById(id);
  if (!review) {
    const error = new Error("Reseña no encontrada");
    error.statusCode = 404;
    throw error;
  }
  if (review.userId !== userId) {
    const error = new Error("No tienes permiso para eliminar esta reseña");
    error.statusCode = 403;
    throw error;
  }
  await review.deleteOne();
};