import { Router } from "express";
import { postSubjects, getSubjects, patchSubjects, delSubjects} from "../controller/subjectsController.js";

const router = Router();

// Cargar catedras
router.get("/", getSubjects);

// Registrar catedra
router.post("/", postSubjects);

// Editar catedra
router.patch("/:id", patchSubjects);

// Eliminar catedra
router.delete("/:id", delSubjects);
export default router;