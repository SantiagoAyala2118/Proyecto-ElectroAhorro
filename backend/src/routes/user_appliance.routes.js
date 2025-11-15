import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
    addApplianceToUser,
    removeApplianceFromUser,
    getUserAppliances,
} from "../controllers/user_appliance.controller.js";

const userApplianceRouter = Router();

// Agregar electrodoméstico al perfil
userApplianceRouter.post("/user-appliances", authMiddleware, addApplianceToUser);

// Obtener electrodomésticos del usuario
userApplianceRouter.get("/user-appliances", authMiddleware, getUserAppliances);

// Remover electrodoméstico del perfil
userApplianceRouter.delete("/user-appliances/:appliance_id", authMiddleware, removeApplianceFromUser);

export default userApplianceRouter;
