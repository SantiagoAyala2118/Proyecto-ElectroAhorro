import { body, param } from "express-validator";
import { UserModel } from "../../models/user.model.js";
import { Op } from "sequelize";

export const updateUserValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id, { req }) => {
      try {
        const existingId = await UserModel.findOne({
          where: { id: req.params.id },
        });
        if (!existingId) {
          return Promise.reject("There is no user with that id in the DB");
        }
      } catch (err) {
        console.error(
          "Error while checking the existency of that user by id",
          err
        );
        return Promise.reject(
          "Error while checking the existency of that user by id"
        );
      }
    }),
  body("username")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 10 })
    .withMessage(
      "Username must contain at least 3 characters and a maximum of 10"
    )
    .custom(async (username, { req }) => {
      try {
        const existingUsername = await UserModel.findOne({
          where: username,
          id: { [Op.ne]: req.params.id },
        });
        if (existingUsername) {
          return Promise.reject("There is already an user with that username");
        }
      } catch (err) {
        console.error(
          "Error while checking the viability of the username",
          err
        );
        return Promise.reject(
          "Error while checking the viability of the username"
        );
      }
    }),
  body("email")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("The email must have a valid format")
    .custom(async (email, { req }) => {
      try {
        const existingEmail = await UserModel.findOne({
          where: email,
          id: { [Op.ne]: req.params.id },
        });
        if (existingEmail) {
          return Promise.reject("There is already an user with that email");
        }
      } catch (err) {
        console.error("Error while checking the viability of the email", err);
        return Promise.reject(
          "Error while checking the viability of the email"
        );
      }
    }),
  body("password")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The password cannot be empty")
    .isString()
    .withMessage("The password must be a string")
    .isLength({ min: 8, max: 16 })
    .withMessage(
      "The password must contain at least 8 characters and a maximum of 16"
    ),
];

export const deleteUserValidations = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("The id must be a number greater than 0")
    .custom(async (id, { req }) => {
      try {
        const existingId = await UserModel.findOne({
          where: { id: req.params.id },
        });

        if (!existingId) {
          return Promise.reject("There are no user with that id in the DB");
        }
      } catch (err) {
        console.error(
          "Error while checking the existency of the user by id",
          err
        );
        return Promise.reject(
          "Error while checking the existency of the user by id"
        );
      }
    }),
];
