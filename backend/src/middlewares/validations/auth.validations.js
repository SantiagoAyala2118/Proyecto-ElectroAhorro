import { body } from "express-validator";
import { UserModel } from "../../models/user.model.js";

export const createPersonValidations = [
  body("full_name")
    .trim()
    .notEmpty()
    .withMessage("The fullname cannot be empty")
    .isString()
    .withMessage("The fullname must be a string")
    .isLength({ min: 5, max: 50 })
    .withMessage(
      "The fullname must contain at least 5 characters and a maximun of 50"
    )
    .matches(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/)
    .withMessage(
      "The fullname must contain only letters, start with capital and be sparated by spaces"
    ),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("The email cannot be empty")
    .isEmail()
    .withMessage("Email format invalid")
    .custom(async (email, { req }) => {
      try {
        const emailExisting = await UserModel.findOne({
          where: { email: req.body.email },
        });

        if (emailExisting) {
          return Promise.reject(
            "There is already an email like that, try another one"
          );
        }
      } catch (err) {
        console.error("Error checking the viability of the email", err);
        return Promise.reject("Error checking the viability of the email");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("The password cannot be empty")
    .isString()
    .withMessage("The password must be a string"),
];
