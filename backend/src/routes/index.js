import { Router } from "express";

//* RUTAS
import userRouter from "./user.routes.js";
import profileRouter from "./profile.routes.js";
import applianceRouter from "./appliance.routes.js";
import authRouter from "./auth.routes.js";
import calcRouter from "./calculator.routes.js";

const routes = Router();

//TODO AUTH
routes.use(authRouter);

//TODO USER
routes.use(userRouter);

//TODO PROFILE
routes.use(profileRouter);

//TODO APPLIANCE
routes.use(applianceRouter);

//TODO CALCULATOR
routes.use(calcRouter);

export default routes;
