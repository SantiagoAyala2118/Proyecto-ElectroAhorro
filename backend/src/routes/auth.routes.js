import { Router } from "express";

//* -------------------------------------------------------------CONTROLADORES
import { login, logout, register } from "../controllers/auth.controller.js";

//* -------------------------------------------------------------MIDDLEWARES
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { applyValidations } from "../middlewares/validator.js";
import { createPersonValidations } from "../middlewares/validations/auth.validations.js";

const authRouter = Router();

//TODO Rregistrarse
authRouter.post(
  "/auth/register",
  createPersonValidations,
  applyValidations,
  register
);

//TODO Loguearse
authRouter.post("/auth/login", login);

//TODO Desloguearse (cerrar sesión)
authRouter.post("/auth/logout", authMiddleware, logout);

export default authRouter;
