import { matchedData } from "express-validator";
import { PersonModel } from "../models/person.model.js";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
  try {
    // const { fullname, email, password, confirm_password } = req.body;

    const validatedData = matchedData(req);
    delete validatedData.confirm_password;

    const hashedPassword = await hashPassword(validatedData.password);

    const person = await PersonModel.create({
      full_name: validatedData.full_name,
    });

    await UserModel.create({
      email: validatedData.email,
      password: hashedPassword,
      person_id: person.id,
    });

    await ProfileModel.create(validatedData);

    return res.status(201).json({
      message: "User registred",
    });
  } catch (err) {
    console.error("Server error while registering", err);
    return res.status(500).json({
      message: "Server error while registering",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({
      where: { email: email },
      include: {
        model: PersonModel,
        as: "person",
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Email or password incorrect",
      });
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "Email or password incorrect",
      });
    }

    const token = generateToken(user);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    return res.status(200).json({
      message: "Logged correctly",
    });
  } catch (err) {
    console.error("Server error while logging", err);
    return res.status(500).json({
      message: "Server error while logging",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "Logged out correctly, good bye",
    });
  } catch (err) {
    console.error("Server error while looging out", err);
    return res.status(500).json({
      message: "Server error while looging out",
    });
  }
};
