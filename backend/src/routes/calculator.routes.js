import { Router } from "express";

//* -------------------------Middlewares
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createCalculationValidations } from "../middlewares/validations/calculator.validations.js";
import { applyValidations } from "../middlewares/validator.js";

//*--------------------------Controladores
import {
  createCalculation,
  calculateEnergyConsumption,
  getMonthlyConsumption,
} from "../controllers/calculator.controller.js"; // Agregar getMonthlyConsumption

const calcRouter = Router();

//TODO CREAR UN CALCULO
calcRouter.post(
  "/calculator",
  authMiddleware,
  createCalculationValidations,
  applyValidations,
  createCalculation
);

//TODO CALCULAR CONSUMO ENERGÉTICO
calcRouter.post("/calculate", authMiddleware, calculateEnergyConsumption);

// Nueva ruta para obtener consumo mensual
calcRouter.get("/monthly-consumption", authMiddleware, getMonthlyConsumption); // Requiere auth si es privada

export default calcRouter;
