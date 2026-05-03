import { Router } from "express";
import { updateEmail, updatePassword, updateUserName, getUsers, patchUsers, delUsers } from "../controller/usersController.js";

const router = Router();

// Cargar usuarios
router.get("/", getUsers);

// Editar usuarios
router.patch("/:id", patchUsers);

// Eliminar usuarios
router.delete("/:id", delUsers);

// Cambiar correo
router.put("/email", updateEmail);

// Cambiar contraseña
router.put("/password", updatePassword);

// Cambiar nombre de usuario
router.put("/name", updateUserName);

export default router;