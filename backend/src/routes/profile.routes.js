import { Router } from "express";

//* -----------------------------CONTROLADORES
import {
  getOneProfile,
  updateProfile,
} from "../controllers/profile.controller.js";
import { updateUser, deletUser } from "../controllers/user.controller.js";

//*---------------------------------MIDDLEWARES
import { updateProfileValidations } from "../middlewares/validations/profile.validations.js";
import { updateUserValidations } from "../middlewares/validations/user.validations.js";
import { deleteUserValidations } from "../middlewares/validations/user.validations.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { applyValidations } from "../middlewares/validator.js";

const profileRouter = Router();

//TODO Ver el perfil propio
profileRouter.get("/api/profile", authMiddleware, getOneProfile);

//TODO Actualizar el perfil
profileRouter.put(
  "/api/profile",
  authMiddleware,
  updateProfileValidations,
  applyValidations,
  updateProfile
);

//TODO Actualizar el usuario
profileRouter.put(
  "/api/profile/user",
  authMiddleware,
  updateUserValidations,
  applyValidations,
  updateUser
);

//TODO Eliminar el usuario
profileRouter.delete(
  "/api/profile/user",
  authMiddleware,
  deleteUserValidations,
  applyValidations,
  deletUser
);

export default profileRouter;
