import { Router } from "express";
import { postStudentRepresentatives, getStudentRepresentatives, patchStudentRepresentatives, delStudentRepresentatives} from "../controller/studentRepresentativesController.js";

const router = Router();

// Cargar representados
router.get("/", getStudentRepresentatives);

// Registrar representado
router.post("/", postStudentRepresentatives);

// Editar representado
router.patch("/:id", patchStudentRepresentatives);

// Eliminar representado
router.delete("/:id", delStudentRepresentatives);
export default router;