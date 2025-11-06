import { sequelize } from "./database.js";

export const startDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión exitosa a la Base de datos");
    await sequelize.sync({force:true  });
    console.log("Sincronización existosa con la Base de datos");
  } catch (err) {
    console.error("No se ha podido conectar con la Base de datos", err);
  }
};
