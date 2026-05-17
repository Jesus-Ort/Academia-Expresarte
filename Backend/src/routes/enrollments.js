import { Router } from "express";
import { postEnrollments, getEnrollments, patchEnrollments, delEnrollments} from "../controller/enrollmentsController.js";

const router = Router();

// Cargar asignados
router.get("/", getEnrollments);

// Registrar asignado
router.post("/", postEnrollments);

// Editar asignado
router.patch("/:id", patchEnrollments);

// Eliminar asignado
router.delete("/:id", delEnrollments);
export default router;