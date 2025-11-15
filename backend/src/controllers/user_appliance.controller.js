import { UserApplianceModel } from "../models/user_appliance.model.js";
import { ApplianceModel } from "../models/appliance.model.js";

// Agregar electrodoméstico al perfil del usuario
export const addApplianceToUser = async (req, res) => {
    try {
        const userLogged = req.userLogged;
        const { appliance_id } = req.body;

        if (!appliance_id) {
            return res.status(400).json({ message: "appliance_id es requerido" });
        }

        // Verificar si ya existe
        const existing = await UserApplianceModel.findOne({
            where: { user_id: userLogged.id, appliance_id },
        });

        if (existing) {
            return res.status(400).json({ message: "Electrodoméstico ya agregado al perfil" });
        }

        // Crear registro
        await UserApplianceModel.create({
            user_id: userLogged.id,
            appliance_id,
        });

        return res.status(201).json({ message: "Electrodoméstico agregado al perfil" });
    } catch (err) {
        console.error("Error al agregar electrodoméstico al perfil", err);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// Quitar electrodoméstico del perfil del usuario
export const removeApplianceFromUser = async (req, res) => {
    try {
        const userLogged = req.userLogged;
        const { appliance_id } = req.params;

        const deleted = await UserApplianceModel.destroy({
            where: { user_id: userLogged.id, appliance_id },
        });

        if (deleted === 0) {
            return res.status(404).json({ message: "Electrodoméstico no encontrado en el perfil" });
        }

        return res.status(200).json({ message: "Electrodoméstico removido del perfil" });
    } catch (err) {
        console.error("Error al remover electrodoméstico del perfil", err);
        return res.status(500).json({ message: "Error del servidor" });
    }
};

// Obtener electrodomésticos del usuario (con detalles)
export const getUserAppliances = async (req, res) => {
    try {
        const userLogged = req.userLogged;

        const userAppliances = await UserApplianceModel.findAll({
            where: { user_id: userLogged.id },
            include: [
                {
                    model: ApplianceModel,
                    as: "Appliance",
                    attributes: ["id", "nombre", "marca", "modelo", "potencia", "consumo_promedio", "descripcion"],
                },
            ],
        });

        return res.status(200).json({ appliances: userAppliances });
    } catch (err) {
        console.error("Error al obtener electrodomésticos del usuario", err);
        return res.status(500).json({ message: "Error del servidor" });
    }
};
