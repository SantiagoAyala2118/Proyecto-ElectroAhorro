import { body } from "express-validator";

export const updateProfileValidations = [
  body("picture")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The picture_url cannot be empty")
    .isURL()
    .withMessage("The picture_url is invalid"),
  body("bio")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("The bio cannot be empty")
    .isString()
    .withMessage("The bio must be a string"),
];
