import { registerUser, loginUser, getUserById, updateUser } from "../services/auth.service.js";

const isProduction = process.env.NODE_ENV === "production";

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
    });
    res.status(200).json({ success: true, message: "Sesión cerrada correctamente" });
  } catch (error) {
    next(error);
  }
};

export const me = async (req, res, next) => {
  try {
    const user = await getUserById(req.user.id);
    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name && !email) {
      const error = new Error("Debes enviar al menos un campo para actualizar");
      error.statusCode = 400;
      throw error;
    }
    const user = await updateUser(req.user.id, { name, email });
    res.status(200).json({ success: true, data: { user } });
  } catch (error) {
    next(error);
  }
};