import { ApplianceModel } from "../models/appliance.model.js";
import { matchedData } from "express-validator";
import { UserApplianceModel } from "../models/user_appliance.model.js";

export const createAppliance = async (req, res) => {
  try {
    const userLogged = req.userLogged;

    const validatedData = matchedData(req);

    //CREO/AÑADO UN ELECTRODOMÉSTICO
    const appliance = await ApplianceModel.create(validatedData);

    //AUTOMÁTICAMENTE CREO UN REGISTRO EN LA TABLA INTERMEDIA EN DONDE RELACIONO EL ELECTRODOMÉSTICO CON EL USUARO
    await UserApplianceModel.create({
      appliance_id: appliance.id,
      user_id: userLogged.id,
    });

    return res.status(201).json({
      message: "Appliance created",
    });
  } catch (err) {
    console.error("Server error while creating an appliance", err);
    return res.status(500).json({
      message: "Server error while creating an appliance",
    });
  }
};

/*Un usuario puede crear/añadir un electrodoméstico, cuando añade un electrodoméstico, éste se asocia 
automáticamente a su usuario. De esta forma, se crea un registro en la tabla intermedia. Desde su 
perfil, puede actualizar electrodomésticos propios que haya creado él, NO ELECTRODOMÉSTICOS AJENOS*/

/*Cuando el usuario ingresa en su perfil, a parte de sus datos le aparece una opción de "VER ELECTRODOMÉSTIOS" 
(donde le aparecen todos sus electrodomésticos añadidos manualmente), cuando ingresa, puede clickear en alguno, 
posteriormente podrá o "ACTUALIZAR ELECTRODOMÉSTICO" o "ELIMINAR ELECTRODOMÉSTICO". Todo esto mediante el id 
presente en el params*/

export const getAllApliances = async (req, res) => {
  try {
    const userLogged = req.userLogged;

    const appliances = await UserApplianceModel.findAll({
      where: { user_id: userLogged.id },
    });

    return res.status(200).json({
      message: "Appliances",
      appliances,
    });
  } catch (err) {
    console.error("Server error while getting apliences", err);
    return res.status(500).json({
      message: "Server error while getting appliances",
    });
  }
};

export const getAppliance = async (req, res) => {
  try {
    const appliance = await ApplianceModel.findByPk(req.params.id);

    return res.status(200).json({
      appliance,
    });
  } catch (err) {
    console.error("Server error while getting appliance", err);
    return res.status(500).json({
      message: "Server error while getting appliance",
    });
  }
};

export const updateAppliance = async (req, res) => {
  try {
    const validatedData = matchedData(req, { locations: ["body"] });

    if (Object.keys(validatedData).length === 0) {
      return res.status(400).json({
        message: "Nothing to update",
      });
    }

    await ApplianceModel.update(validatedData, {
      where: { id: req.params.id },
    });

    return res.status(200).json({
      message: "Appliance updated",
    });
  } catch (err) {
    console.error("Server error while updating an appliance", err);
    return res.status(500).json({
      message: "Server error while updating an appliance",
    });
  }
};

export const deleteAppliance = async (req, res) => {
  try {
    await ApplianceModel.destroy({ where: { id: req.params.id } });
  } catch (err) {
    console.error("Server error while deleting an appliance", err);
    return res.status(500).json({
      message: "Server error while deleting an appliance",
    });
  }
};
