import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define(
  "Profile",
  {
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Foto en blanco",
    },
    bio: {
      type: DataTypes.STRING(200),
      allowNull: true,
      defaultValue: "Una biografía cualquiera",
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

//Relaciones
ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
  targetKey: "id",
});

UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id",
  sourceKey: "id",
  as: "profile",
});
