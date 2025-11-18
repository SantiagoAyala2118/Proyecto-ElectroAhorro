import Router from "express";

//* ------------------------CONTROLADORES
import {
  createAppliance,
  deleteAppliance,
  getAllApliances,
  getAppliance,
  updateAppliance,
  getAllPublicAppliances, // Nueva importación
  // seedAppliances // Nueva importación
} from "../controllers/appliance.controller.js";

//* --------------------------MIDDLEWARES
import { createApplianceValidations } from "../middlewares/validations/appliance.validations.js";
import { applyValidations } from "../middlewares/validator.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const applianceRouter = Router();

//TODO RUTAS PÚBLICAS (sin autenticación)
applianceRouter.get("/public/appliances", getAllPublicAppliances); // Para la calculadora pública
// applianceRouter.post("/seed-appliances", seedAppliances); // Para poblar la BD (puedes proteger esta ruta si quieres)

//TODO CREAR ELECTRODOMÉSTICO
applianceRouter.post(
  "/appliance",
  authMiddleware,
  createApplianceValidations,
  applyValidations,
  createAppliance
);

// TODO TRAER TODOS LOS ELECTRODOMÉSTICOS
applianceRouter.get("/appliance", authMiddleware, getAllApliances);

// TODO TRAER UN SOLO ELECTRODOMÉSTICO
applianceRouter.get("/appliance/:id", authMiddleware, getAppliance);

// TODO ACTUALIZAR UN ELECTRODOMÉSTICO
applianceRouter.put("/appliance/:id", authMiddleware, updateAppliance);

// TODO BORRAR UN ELECTRODOMÉSTICO
applianceRouter.delete("/appliance/:id", authMiddleware, deleteAppliance);

export default applianceRouter;
