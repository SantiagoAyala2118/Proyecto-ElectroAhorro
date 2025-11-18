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
      horas_of_use: 1, // Valor por defecto
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

// Nueva función para obtener todos los electrodomésticos (sin filtrar por usuario)
export const getAllPublicAppliances = async (req, res) => {
  try {
    const appliances = await ApplianceModel.findAll();

    return res.status(200).json({
      message: "All appliances retrieved successfully",
      appliances,
    });
  } catch (err) {
    console.error("Server error while getting all appliances", err);
    return res.status(500).json({
      message: "Server error while getting all appliances",
    });
  }
};

// //! Función para poblar la base de datos con electrodomésticos predefinidos
// export const seedAppliances = async (req, res) => {
//   try {
//     const appliancesData = [
//       {
//         nombre: "Aire acondicionado 3000 frigorías",
//         marca: "Surrey",
//         modelo: "Split Inverter",
//         potencia: 1500,
//         consumo_promedio: 1.2,
//         descripcion: "Aire acondicionado para habitaciones medianas"
//       },
//       {
//         nombre: "Ventilador de techo",
//         marca: "Liliana",
//         modelo: "Standard",
//         potencia: 75,
//         consumo_promedio: 0.075,
//         descripcion: "Ventilador de techo para circulación de aire"
//       },
//       {
//         nombre: "Heladera con freezer",
//         marca: "Whirlpool",
//         modelo: "Frostless",
//         potencia: 350,
//         consumo_promedio: 0.35,
//         descripcion: "Heladera automática con descongelamiento"
//       },
//       {
//         nombre: "Televisor LED",
//         marca: "Philips",
//         modelo: "Smart TV 42'",
//         potencia: 120,
//         consumo_promedio: 0.12,
//         descripcion: "Televisor inteligente"
//       },
//       {
//         nombre: "Computadora de escritorio",
//         marca: "Genérica",
//         modelo: "PC Gamer",
//         potencia: 500,
//         consumo_promedio: 0.5,
//         descripcion: "Computadora para trabajo y entretenimiento"
//       },
//       {
//         nombre: "Lavarropas automático",
//         marca: "Drean",
//         modelo: "Next 6.06",
//         potencia: 800,
//         consumo_promedio: 0.8,
//         descripcion: "Lavarropas con múltiples programas"
//       },
//       {
//         nombre: "Microondas",
//         marca: "Atma",
//         modelo: "MWO20",
//         potencia: 1200,
//         consumo_promedio: 1.2,
//         descripcion: "Horno microondas 20 litros"
//       },
//       {
//         nombre: "Pava eléctrica",
//         marca: "Liliana",
//         modelo: "Rapid",
//         potencia: 2200,
//         consumo_promedio: 0.15,
//         descripcion: "Pava para calentar agua"
//       },
//       {
//         nombre: "Lámpara LED",
//         marca: "Philips",
//         modelo: "10W",
//         potencia: 10,
//         consumo_promedio: 0.01,
//         descripcion: "Iluminación eficiente"
//       },
//       {
//         nombre: "Ventilador de pie",
//         marca: "Atma",
//         modelo: "VF2080",
//         potencia: 85,
//         consumo_promedio: 0.085,
//         descripcion: "Ventilador portátil"
//       }
//     ];

//     // Insertar electrodomésticos predefinidos
//     await ApplianceModel.bulkCreate(appliancesData, {
//       ignoreDuplicates: true
//     });

//     return res.status(201).json({
//       message: "Electrodomésticos predefinidos agregados exitosamente"
//     });
//   } catch (err) {
//     console.error("Error al poblar electrodomésticos", err);
//     return res.status(500).json({
//       message: "Error al poblar electrodomésticos predefinidos"
//     });
//   }
// };
