import { Router } from "express";

//* -------------------------CONTROLADORES
import { updateUser, deletUser } from "../controllers/user.controller.js";

//* -------------------------MIDDLEWARE
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

//TODO Actualizar el usuario
userRouter.put("/users", authMiddleware, updateUser);

//TODO Eliminar el usuario
userRouter.delete("/user", authMiddleware, deletUser);

export default userRouter;
