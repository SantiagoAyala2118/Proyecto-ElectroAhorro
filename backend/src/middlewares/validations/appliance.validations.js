import { body } from "express-validator";
import { ApplianceModel } from "../../models/appliance.model.js";

export const createApplianceValidations = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .isString()
    .withMessage("El nombre debe ser un string")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+)*$/
    )
    .withMessage(
      "El nombre debe contener al menos una minúscula, una mayúscula, y estar separado por espacios"
    )
    .custom(async (nombre, { req }) => {
      try {
        const nameExisting = await ApplianceModel.findOne({
          where: { nombre: req.body.nombre },
        });

        if (nameExisting) {
          return Promise.reject("El nombre ingresado ya existe, use otro");
        }
      } catch (err) {
        console.error("Error verificando la disponibilidad del nombre", err);
        return Promise.reject("Error verificando la disponibilidad del nombre");
      }
    }),
  body("marca")
    .trim()
    .notEmpty()
    .withMessage("La marca no puede estar vacía")
    .isString()
    .withMessage("La marca debe ser un string")
    .matches(
      /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+)*$/
    )
    .withMessage(
      "La marca debe contener al menos una minúscula, una mayúscula, y estar separado por espacios"
    ),
  body("modelo")
    .trim()
    .notEmpty()
    .withMessage("El modelo no puede estar vacío")
    .isString()
    .withMessage("El modelo debe ser un string")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ0-9]+)*$/)
    .withMessage(
      "El modelo debe contener al menos una minúscula, una mayúscula, y estar separado por espacios"
    ),
  body("potencia")
    .trim()
    .notEmpty()
    .withMessage("La potencia no puede estar")
    .custom((potencia) => {
      const potenciaEnWatts = Number(potencia);

      if (isNaN(potenciaEnWatts)) {
        throw new Error(
          "La potencia debe ser un numero, debido a que se trabaja con watts"
        );
      }

      if (potenciaEnWatts <= 0) {
        throw new Error("La potencia debe ser un numero mayor a cero");
      }

      return true;
    }),
  body("consumo_promedio")
    .trim()
    .custom((consumoPromedio) => {
      const consumoPromedioEnKwh = Number(consumoPromedio);

      if (isNaN(consumoPromedioEnKwh)) {
        throw new Error(
          "El consumo promedio debe ser un numero, debido a que se trabaja con Kwh (kilowatts por hora)"
        );
      }

      if (consumoPromedioEnKwh <= 0) {
        throw new Error("El consumo promedio debe ser un numero mayor a cero");
      }

      return true;
    }),
  body("descripcion")
    .trim()
    .isString()
    .withMessage("La descripcion debe ser un string")
    .isLength({ min: 10, max: 2000 })
    .withMessage("La descripcion debe tener entre 10 y 2000 caracteres"),
];

export const getOneAppliance = [];
