import { Router } from "express";
import { postTeachers, getTeachers, patchTeachers, delTeachers} from "../controller/teachersController.js";

const router = Router();

// Cargar profesores
router.get("/", getTeachers);

// Registrar profesores
router.post("/", postTeachers);

// Editar profesores
router.patch("/:id", patchTeachers);

// Eliminar profesores
router.delete("/:id", delTeachers);
export default router;