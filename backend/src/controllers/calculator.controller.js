import { matchedData } from "express-validator";
import { CalculationModel } from "../models/calculator.model.js";
import { UserModel } from "../models/user.model.js";

export const createCalculation = async (req, res) => {
  const { costPerKwh } = req.body;

  const userLogged = req.userLogged;
  const validatedData = matchedData(req);
  try {
    // TODO: Esto calcula el total del consumo de la persona
    const total_consumption =
      (validatedData.power * validatedData.hours_per_day * validatedData.days) /
      1000; //TODO: Al dividir por 1000 sacamos los Kwh

    //TODO: Esto es lo que la persona dice que cuesta un Kwh
    const tariff = costPerKwh;
    //TODO: esto ya es el costo final
    const cost = total_consumption * tariff;

    // ** Creamos el registro del calculo asociado al usuario
    const newCalculation = await CalculationModel.create({
      power: validatedData.power,
      hours_per_day: validatedData.hours_per_day,
      days: validatedData.days,
      total_consumption: total_consumption,
      cost: cost,
      user_id: userLogged.id,
    });

    // ! ESTO ES PARA QUE EL FRONT LEA LA DATA Y GENERE LOS GRÁFICOS
    const perDayKwh = (power * hours_per_day) / 1000;
    const dailyData = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dailyData.push({
        date: d.toISOString().slice(0, 10), // "YYYY-MM-DD"
        kwh: Number(perDayKwh.toFixed(4)),
      });
    }

    return res.status(201).json({
      ok: true,
      message: "Cálculo creado",
      data: newCalculation,
      dailyData, //! Acá está lo de arriba
      summary: { total_consumption, cost },
    });
  } catch (err) {
    console.error("Error creating a calculation", err);
    return res.status(500).json({
      ok: false,
      message: "Error creating a calculation",
    });
  }
};
