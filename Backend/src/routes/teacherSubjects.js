import { Router } from "express";
import { postTeacherSubjects, getTeacherSubjects, patchTeacherSubjects, delTeacherSubjects} from "../controller/teacherSubjectsController.js";

const router = Router();

// Cargar clases
router.get("/", getTeacherSubjects);

// Registrar clase
router.post("/", postTeacherSubjects);

// Editar clase
router.patch("/:id", patchTeacherSubjects);

// Eliminar clase
router.delete("/:id", delTeacherSubjects);
export default router;