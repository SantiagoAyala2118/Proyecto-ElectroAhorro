import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";

//Update an user
export const updateUser = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });

    if (Object.keys(validatedData).length === 0) {
      return res.status(400).json({
        message: "You did not send anything to update",
      });
    }

    await UserModel.update(validatedData, { where: { id: req.params.id } });

    return res.status(200).json({
      message: "User updated",
    });
  } catch (err) {
    console.error("Server error while updating an user", err);
    return res.status(500).json({
      message: "Server error while updating an user",
    });
  }
};

//Deleting an user
export const deletUser = async (req, res) => {
  try {
    await UserModel.destroy({ where: { id: req.params.id } });
    return res.status(200).json({
      message: "User deleted",
    });
  } catch (err) {
    console.error("Server error while deleting an user", err);
    return res.status(500).json({
      message: "Server error while deleting an user",
    });
  }
};
