import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { PersonModel } from "../models/person.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { UserApplianceModel } from "../models/user_appliance.model.js";
import { ApplianceModel } from "../models/appliance.model.js";

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

// Obtener perfil (name, email, joinDate, consumos) del usuario logeado
export const getLoggedUserProfile = async (req, res) => {
  try {
    console.log("Iniciando getLoggedUserProfile");
    const userLogged = req.userLogged;
    console.log("userLogged:", userLogged);
    if (!userLogged?.id) {
      return res.status(401).json({ message: "No autorizado" });
    }
    console.log("Buscando user con id:", userLogged.id);
    const user = await UserModel.findOne({
      where: { id: userLogged.id },
      attributes: ["email"],
      include: [
        {
          model: PersonModel,
          as: "person",
          attributes: ["full_name"],
        },
      ],
    });
    console.log("User encontrado:", user);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Obtener fecha de unión desde Profile
    console.log("Buscando profile para user_id:", userLogged.id);
    const profile = await ProfileModel.findOne({
      where: { user_id: userLogged.id },
      attributes: ["joinDate"],
    });
    console.log("Profile encontrado:", profile);
    const joinDate = profile?.joinDate
      ? new Date(profile.joinDate).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
      })
      : "Desconocido";
    console.log("joinDate:", joinDate);

    // Calcular consumos
    const userAppliances = await UserApplianceModel.findAll({
      where: { user_id: userLogged.id },
      include: [
        {
          model: ApplianceModel,
          as: "Appliance",
          attributes: ["potencia"],
        },
      ],
    });
    const appliancesCount = userAppliances.length;
    let monthlyConsumption = 0;
    userAppliances.forEach(ua => {
      const potencia = ua.Appliance?.potencia || 0;
      const horas = ua.horas_of_use || 0;
      monthlyConsumption += (potencia * horas * 30) / 1000; // kWh mensuales
    });
    const annualConsumption = monthlyConsumption * 12;
    const estimatedCost = monthlyConsumption * 62.10; // Precio estimado por kWh en Argentina Formosa

    return res.status(200).json({
      user: {
        name: user.person?.full_name ?? "",
        email: user.email,
        joinDate,
        monthlyConsumption: `${monthlyConsumption.toFixed(2)} kWh`,
        annualConsumption: `${annualConsumption.toFixed(2)} kWh`,
        appliances: appliancesCount,
        estimatedCost: `$${estimatedCost.toFixed(2)}`,
      },
    });
  } catch (err) {
    console.error("Error al obtener el perfil del usuario logeado:", err.message);
    console.error("Stack:", err.stack);
    return res.status(500).json({ message: "Error del servidor" });
  }
};
