import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "../services/product.service.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const postProduct = async (req, res, next) => {
  try {
    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer);
    }
    const data = {
      ...req.body,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock),
      imageUrl,
    };
    const product = await createProduct(data);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};
export const putProduct = async (req, res, next) => {
  try {
    let imageUrl;
    if (req.file) {
      imageUrl = await uploadImage(req.file.buffer);
    }
    const data = { ...req.body };
    if (data.price !== undefined) data.price = parseFloat(data.price);
    if (data.stock !== undefined) data.stock = parseInt(data.stock);
    if (imageUrl) data.imageUrl = imageUrl;
    const product = await updateProduct(req.params.id, data);
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const removeProduct = async (req, res, next) => {
  try {
    await deleteProduct(req.params.id);
    res.json({ success: true, message: "Producto eliminado correctamente" });
  } catch (err) {
    next(err);
  }
};