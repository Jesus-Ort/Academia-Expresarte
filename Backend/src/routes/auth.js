import { Router } from "express";
import { register, login, refreshToken } from "../controller/authController.js";

const router = Router();

// Registro
router.post("/register", register);

// Login
router.post("/login", login);

// Refrescar el token
router.post('/refresh', refreshToken)

export default router;