import { Router } from "express";

//* -------------------------CONTROLADORES
import { updateUser, deletUser, getLoggedUserProfile } from "../controllers/user.controller.js";

//* -------------------------MIDDLEWARE
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

//TODO Actualizar el usuario
userRouter.put("/users", authMiddleware, updateUser);

//TODO Eliminar el usuario
userRouter.delete("/user", authMiddleware, deletUser);

// Obtener perfil del usuario logeado (name, email, joinDate)
userRouter.get("/user/profile", authMiddleware, getLoggedUserProfile);

export default userRouter;
