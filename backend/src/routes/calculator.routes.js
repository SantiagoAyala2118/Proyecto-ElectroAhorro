import { Router } from "express";

//* -------------------------Middlewares
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createCalculationValidations } from "../middlewares/validations/calculator.validations.js";
import { applyValidations } from "../middlewares/validator.js";

//*--------------------------Controladores
import { createCalculation, calculateEnergyConsumption } from "../controllers/calculator.controller.js";

const calcRouter = Router();

//TODO CREAR UN CALCULO
calcRouter.post(
  "/calculator",
  authMiddleware,
  createCalculationValidations,
  applyValidations,
  createCalculation
);

//TODO CALCULAR CONSUMO ENERGÉTICO (RUTA PÚBLICA)
calcRouter.post("/calculate", calculateEnergyConsumption);

export default calcRouter;
