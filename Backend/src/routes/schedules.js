import { Router } from "express";
import { postSchedules, getSchedules, patchSchedules, delSchedules} from "../controller/schedulesController.js";

const router = Router();

// Cargar clases
router.get("/", getSchedules);

// Registrar clase
router.post("/", postSchedules);

// Editar clase
router.patch("/:id", patchSchedules);

// Eliminar clase
router.delete("/:id", delSchedules);
export default router;