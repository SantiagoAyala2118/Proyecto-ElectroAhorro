import { sequelize } from "./database.js";

export const startDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la Base de datos");

    // Cambiar temporalmente para recrear tablas
    await sequelize.sync({ force: false });
    console.log("Sincronización exitosa con la Base de datos");
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
};
