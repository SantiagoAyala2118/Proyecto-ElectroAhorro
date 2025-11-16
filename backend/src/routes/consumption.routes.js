// src/routes/consumption.routes.js
import { Router } from "express";
import { calculateAndSaveMonthly } from "../controllers/consumption.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const consumptionRouter = Router();

// Protected: calcula y guarda el consumo del mes actual para el usuario logueado
consumptionRouter.post(
  "/calculate-and-save",
  authMiddleware,
  calculateAndSaveMonthly
);

export default consumptionRouter;
