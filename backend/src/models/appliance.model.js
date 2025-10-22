import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ApplianceModel = sequelize.define(
  "Appliance",
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    potencia: {
      //POTENCIA EN WATTS
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    consumo_promedio: {
      //CONSUMO EN KWH
      type: DataTypes.FLOAT,
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);
