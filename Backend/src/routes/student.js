import { Router } from "express";
import { postStudents, getStudents} from "../controller/studentController.js";

const router = Router();

// Cargar estudiantes
router.get("/", getStudents);

// Registrar estudiante
router.post("/", postStudents);

export default router;