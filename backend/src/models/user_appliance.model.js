import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";
import { ApplianceModel } from "./appliance.model.js";

export const UserApplianceModel = sequelize.define(
  "User_Appliance",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    horas_of_use: {
      type: DataTypes.FLOAT,
      defaultValue: 1,
      allowNull: false,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

//Relaciones

//Hacia la tabla intermedia
UserModel.belongsToMany(ApplianceModel, {
  through: UserApplianceModel,
  as: "users",
  foreignKey: "user_id",
  targetKey: "id",
});

ApplianceModel.belongsToMany(UserModel, {
  through: UserApplianceModel,
  as: "appliances",
  foreignKey: "appliance_id",
  targetKey: "id",
});

//Desde la tabla intermedia
UserApplianceModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "User",
});

UserApplianceModel.belongsTo(ApplianceModel, {
  foreignKey: "appliance_id",
  as: "Appliance",
});
