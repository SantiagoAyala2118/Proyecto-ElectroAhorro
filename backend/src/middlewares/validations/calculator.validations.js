import { body } from "express-validator";

export const createCalculationValidations = [
  body("power")
    .trim()
    .notEmpty()
    .withMessage("El poder del electrodoméstico es requerido")
    .isFloat({ gt: 0 })
    .withMessage("El poder del electrodoméstico debe ser un número mayor a 0"),
  body("hours_per_day")
    .trim()
    .notEmpty()
    .withMessage("Las horas por día son requeridas")
    .isFloat({ gt: 0, lt: 25 })
    .withMessage(
      "Las horas por día deben ser números mayores a 0 y menores a 24"
    ),
  body("days")
    .trim()
    .notEmpty()
    .withMessage("Los días son requeridos")
    .isInt({ gt: 0, lt: 365 })
    .withMessage("Los días deben ser un número mayor a 0"),
];
