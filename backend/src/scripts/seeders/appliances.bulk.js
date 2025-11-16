import { ApplianceModel } from "../../models/appliance.model.js";
import { sequelize } from "../../config/database.js";

const appliancesData = [
  {
    nombre: "Aire acondicionado 3000 frigorías",
    marca: "Surrey",
    modelo: "Split Inverter",
    potencia: 1500,
    consumo_promedio: 1.2,
    descripcion: "Aire acondicionado para habitaciones medianas",
  },
  {
    nombre: "Ventilador de techo",
    marca: "Liliana",
    modelo: "Standard",
    potencia: 75,
    consumo_promedio: 0.075,
    descripcion: "Ventilador de techo para circulación de aire",
  },
  {
    nombre: "Heladera con freezer",
    marca: "Whirlpool",
    modelo: "Frostless",
    potencia: 350,
    consumo_promedio: 0.35,
    descripcion: "Heladera automática con descongelamiento",
  },
  {
    nombre: "Televisor LED",
    marca: "Philips",
    modelo: "Smart TV 42'",
    potencia: 120,
    consumo_promedio: 0.12,
    descripcion: "Televisor inteligente",
  },
  {
    nombre: "Computadora de escritorio",
    marca: "Genérica",
    modelo: "PC Gamer",
    potencia: 500,
    consumo_promedio: 0.5,
    descripcion: "Computadora para trabajo y entretenimiento",
  },
  {
    nombre: "Lavarropas automático",
    marca: "Drean",
    modelo: "Next 6.06",
    potencia: 800,
    consumo_promedio: 0.8,
    descripcion: "Lavarropas con múltiples programas",
  },
  {
    nombre: "Microondas",
    marca: "Atma",
    modelo: "MWO20",
    potencia: 1200,
    consumo_promedio: 1.2,
    descripcion: "Horno microondas 20 litros",
  },
  {
    nombre: "Pava eléctrica",
    marca: "Liliana",
    modelo: "Rapid",
    potencia: 2200,
    consumo_promedio: 0.15,
    descripcion: "Pava para calentar agua",
  },
  {
    nombre: "Lámpara LED",
    marca: "Philips",
    modelo: "10W",
    potencia: 10,
    consumo_promedio: 0.01,
    descripcion: "Iluminación eficiente",
  },
  {
    nombre: "Ventilador de pie",
    marca: "Atma",
    modelo: "VF2080",
    potencia: 85,
    consumo_promedio: 0.085,
    descripcion: "Ventilador portátil",
  },
];

(async () => {
  try {
    await sequelize.authenticate();
    // bulkCreate puede tener opciones específicas según la BD; aquí intentamos ignorar duplicados si el DB lo soporta.
    await ApplianceModel.bulkCreate(appliancesData, { ignoreDuplicates: true });
    console.log("Electrodomésticos insertados correctamente.");
    process.exit(0);
  } catch (err) {
    console.error("Error al poblar electrodomésticos:", err);
    process.exit(1);
  }
})();
