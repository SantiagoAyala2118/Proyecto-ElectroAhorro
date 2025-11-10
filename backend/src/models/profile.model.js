import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { UserModel } from "./user.model.js";

export const ProfileModel = sequelize.define(
  "Profile",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: UserModel,
        key: "id",
      },
    },
    joinDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

// Relaciones
ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id",
  as: "profile",
});
