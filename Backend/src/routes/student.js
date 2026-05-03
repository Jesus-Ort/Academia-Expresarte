import { Router } from "express";
import { postStudents, getStudents, patchStudents, delStudents} from "../controller/studentController.js";

const router = Router();

// Cargar estudiantes
router.get("/", getStudents);

// Registrar estudiante
router.post("/", postStudents);

// Editar estudiante
router.patch("/:id", patchStudents);

// Eliminar estudiante
router.delete("/:id", delStudents);
export default router;