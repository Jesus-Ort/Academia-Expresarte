import { Router } from "express";
import { updateEmail, updatePassword, updateUserName } from "../controller/userController.js";

const router = Router();

// Cambiar correo
router.put("/email", updateEmail);

// Cambiar contraseña
router.put("/password", updatePassword);

// Cambiar nombre de usuario
router.put("/name", updateUserName);

export default router;