import { Router } from "express";

//* RUTAS
import userRouter from "./user.routes.js";
import profileRouter from "./profile.routes.js";
import applianceRouter from "./appliance.routes.js";
import authRouter from "./auth.routes.js";
import calcRouter from "./calculator.routes.js";
import userApplianceRouter from "./user_appliance.routes.js"; // Nueva importación
import consumptionRouter from "./consumption.routes.js";

const routes = Router();

//TODO AUTH
routes.use(authRouter);

//TODO USER
routes.use(userRouter);

//TODO PROFILE
routes.use(profileRouter);

//TODO APPLIANCE
routes.use(applianceRouter);

//TODO USER APPLIANCES
routes.use(userApplianceRouter); // Nueva ruta

//TODO CALCULATOR
routes.use(calcRouter);

//TODO CONSUMPTION
routes.use(consumptionRouter);

export default routes;
