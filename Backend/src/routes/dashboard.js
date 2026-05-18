import { Router } from "express";
import { getDashboard } from "../controller/dashboardController.js";

const router = Router();

// Cargar dashboard
router.get("/", getDashboard);

export default router;