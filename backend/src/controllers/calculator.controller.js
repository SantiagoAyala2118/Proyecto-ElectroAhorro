import { matchedData } from "express-validator";
import { CalculationModel } from "../models/calculator.model.js";
import { UserModel } from "../models/user.model.js";
import { ApplianceModel } from "../models/appliance.model.js";
import { MonthlyConsumptionModel } from "../models/monthlyConsumption.model.js"; // Nuevo import
import { sequelize } from "../config/database.js"; //Nuevo import

export const createCalculation = async (req, res) => {
  try {
    const userLogged = req.userLogged;
    if (!userLogged)
      return res
        .status(401)
        .json({ ok: false, message: "User not authenticated" });

    const validatedData = matchedData(req);
    const raw = req.body || {};

    const powerRaw = validatedData.power ?? raw.power;
    const hoursRaw = validatedData.hours_per_day ?? raw.hours_per_day;
    const daysRaw = validatedData.days ?? raw.days;
    const costRaw = raw.costPerKwh ?? req.body.costPerKwh ?? 0;
    const unitRaw = raw.powerUnity ?? req.body.powerUnity ?? "W";

    const power = Number(powerRaw);
    const hours_per_day = Number(hoursRaw);
    const days = Number(daysRaw);
    const tariff = Number(costRaw);
    const unit = String(unitRaw).toUpperCase() || "W";

    if (!Number.isFinite(power) || power <= 0) {
      return res.status(400).json({ ok: false, message: "Potencia inválida" });
    }
    if (!Number.isFinite(hours_per_day) || hours_per_day <= 0) {
      return res
        .status(400)
        .json({ ok: false, message: "Horas por día inválidas" });
    }
    if (!Number.isFinite(days) || days <= 0) {
      return res.status(400).json({ ok: false, message: "Días inválidos" });
    }
    if (!Number.isFinite(tariff) || tariff < 0) {
      return res.status(400).json({ ok: false, message: "Tarifa inválida" });
    }

    let total_consumption;
    if (unit === "W") {
      total_consumption = (power * hours_per_day * days) / 1000;
    } else {
      total_consumption = power * hours_per_day * days;
    }

    const cost = Number((total_consumption * tariff).toFixed(2));

    const newCalculation = await CalculationModel.create({
      power,
      hours_per_day,
      days,
      total_consumption,
      cost,
      user_id: userLogged.id,
    });

    let perDayKwh;
    if (unit === "W") {
      perDayKwh = (power * hours_per_day) / 1000;
    } else {
      perDayKwh = power * hours_per_day;
    }

    const dailyData = [];
    const today = new Date();
    for (let i = 0; i < days; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      dailyData.push({
        date: d.toISOString().slice(0, 10),
        kwh: Number(perDayKwh.toFixed(4)),
      });
    }

    return res.status(201).json({
      ok: true,
      message: "Cálculo creado",
      data: newCalculation,
      dailyData,
      summary: { total_consumption, cost },
    });
  } catch (err) {
    console.error("Error creating a calculation", err);
    return res
      .status(500)
      .json({ ok: false, message: "Error creating a calculation" });
  }
};

export const calculateEnergyConsumption = async (req, res) => {
  try {
    // Aseguramos usuario (esta ruta ahora debería estar protegida por authMiddleware)
    const userId = req.userLogged?.id;
    if (!userId) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    const { appliances } = req.body; // Array de {applianceId, hoursOfUse}

    if (!appliances || !Array.isArray(appliances)) {
      return res.status(400).json({
        message: "Se requiere un array de electrodomésticos",
      });
    }

    const results = {
      appliances: [],
      totals: {
        daily: 0,
        monthly: 0,
        yearly: 0,
      },
    };

    // Calcular consumo para cada electrodoméstico
    for (const item of appliances) {
      const appliance = await ApplianceModel.findByPk(item.applianceId);

      if (appliance) {
        const hours = item.hoursOfUse || 1;
        const dailyKwh = (appliance.potencia * hours) / 1000;
        const monthlyKwh = dailyKwh * 30;
        const yearlyKwh = dailyKwh * 365;

        results.appliances.push({
          id: appliance.id,
          nombre: appliance.nombre,
          potencia: appliance.potencia,
          hoursUsed: hours,
          dailyKwh: Number(dailyKwh.toFixed(4)),
          monthlyKwh: Number(monthlyKwh.toFixed(4)),
          yearlyKwh: Number(yearlyKwh.toFixed(4)),
        });

        results.totals.daily += dailyKwh;
        results.totals.monthly += monthlyKwh;
        results.totals.yearly += yearlyKwh;
      }
    }

    const tariff = Number(req.body.costPerKwh ?? 0.5); // si el front manda tarifa la usamos
    const monthlyCostRaw = results.totals.monthly * tariff;
    const monthlyCost = Number(monthlyCostRaw.toFixed(2)); // **guardar con 2 decimales**

    // Guardar o actualizar el gasto del mes actual
    const currentMonth = new Date().toISOString().slice(0, 7); // 'YYYY-MM'

    await MonthlyConsumptionModel.upsert({
      user_id: userId,
      month: currentMonth,
      cost: monthlyCost,
    });

    return res.status(200).json({
      message: "Cálculo realizado exitosamente",
      results,
      monthlyCost,
    });
  } catch (err) {
    console.error("Error en cálculo de consumo", err);
    return res.status(500).json({
      message: "Error al calcular el consumo energético",
    });
  }
};

export const getMonthlyConsumption = async (req, res) => {
  try {
    const userId = req.userLogged?.id;
    if (!userId)
      return res.status(401).json({ message: "Usuario no autenticado" });

    // Agrupar por mes (YYYY-MM) y sumar costos por mes
    const rows = await MonthlyConsumptionModel.findAll({
      attributes: [
        // Si usás MySQL, DATE_FORMAT; si usás Postgres, usá to_char / substring.
        [sequelize.literal("LEFT(`month`, 7)"), "month"], // toma 'YYYY-MM' o '2025-11'
        [sequelize.fn("SUM", sequelize.col("cost")), "cost"],
      ],
      where: { user_id: userId },
      group: [sequelize.literal("LEFT(`month`, 7)")],
      order: [[sequelize.literal("LEFT(`month`, 7)"), "ASC"]],
      raw: true,
    });

    // rows ejemplo: [{ month: '2025-01', cost: '123.45' }, ...]
    const monthlyData = rows.map((r) => ({
      month: r.month, // devolver YYYY-MM para que el frontend lo parsee mejor
      cost: Number(r.cost) || 0,
    }));

    // Si no hay datos, devolvemos el mes actual con cost 0
    if (monthlyData.length === 0) {
      const currentMonth = new Date().toISOString().slice(0, 7); // 'YYYY-MM'
      monthlyData.push({ month: currentMonth, cost: 0 });
    }

    return res.status(200).json({ monthlyData });
  } catch (err) {
    console.error("Error obteniendo consumo mensual", err);
    return res
      .status(500)
      .json({ message: "Error al obtener datos mensuales" });
  }
};
