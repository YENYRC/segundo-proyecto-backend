import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      const error = new Error("Email, contraseña y nombre son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    const user = await registerUser({ email, password, name });
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error = new Error("Email y contraseña son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    const { user, token } = await loginUser({ email, password });
    res.status(200).json({ success: true, data: { user, token } });
  } catch (error) {
    next(error);
  }
};