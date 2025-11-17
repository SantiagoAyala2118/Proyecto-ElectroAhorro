// controllers/consumption.controller.js
import { ApplianceModel } from "../models/appliance.model.js";
import { UserApplianceModel } from "../models/user_appliance.model.js"; // tabla intermedia
import { MonthlyConsumptionModel } from "../models/monthlyConsumption.model.js";
import { sequelize } from "../config/database.js"; // si lo exportás así
// Si tu tabla intermedia se llama distinto, ajustá el import

// Helper: convierte a number seguro
const toNum = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

/**
 * Calcula consumo del usuario y guarda (upsert) el costo del mes actual.
 * Request body opcional: { costPerKwh }  // si querés permitir tarifa por llamada
 */
export const calculateAndSaveMonthly = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const userId = req.userLogged?.id;
    if (!userId) return res.status(401).json({ message: "No autorizado" });

    // 1) Traer appliances del usuario con datos de potencia y horas de uso
    const userAppliances = await UserApplianceModel.findAll({
      where: { user_id: userId },
      include: [{ model: ApplianceModel, as: "Appliance" }], // ajustá alias
      transaction: t,
    });

    // Si no hay appliances, guardamos 0 y salimos
    if (!userAppliances || userAppliances.length === 0) {
      const monthStr = new Date().toISOString().slice(0, 7); // YYYY-MM
      await MonthlyConsumptionModel.upsert(
        {
          user_id: userId,
          month: monthStr,
          cost: 0.0,
        },
        { transaction: t }
      );
      await t.commit();
      return res.status(200).json({
        message: "Sin electrodomésticos",
        monthlyCost: 0,
        details: [],
      });
    }

    // 2) Tarifa: preferimos la tarifa enviada por el cliente, si no la tenemos un valor por defecto
    const tariff = toNum(req.body.costPerKwh ?? req.body.tariff ?? 0.5, 0.5);

    const details = []; // para debug / devolver detalles al frontend
    let totalMonthlyKwh = 0;

    // 3) Calcular por cada electrodoméstico
    for (const ua of userAppliances) {
      const ap = ua.Appliance;
      if (!ap) continue;

      // Hora de uso registrada en la tabla user_appliances
      const hours = toNum(ua.hours_of_use ?? ua.hoursOfUse ?? 1, 1);

      // Prioridad: usar potencia (W) si está; si no, usar consumo_promedio (kWh por hora) si está
      const potencia = toNum(ap.potencia, 0); // watts
      const consumo_promedio = toNum(ap.consumo_promedio, 0); // asume kWh/h si se usa

      let dailyKwh = 0;
      if (potencia > 0) {
        // potencia está en W -> convertir a kW * horas
        dailyKwh = (potencia / 1000) * hours;
      } else if (consumo_promedio > 0) {
        // consumo_promedio: asumimos que es kWh por hora, así que se multiplica por horas
        dailyKwh = consumo_promedio * hours;
      } else {
        dailyKwh = 0;
      }

      const monthlyKwh = dailyKwh * 30; // aproximación con 30 días
      totalMonthlyKwh += monthlyKwh;

      details.push({
        applianceId: ap.id,
        nombre: ap.nombre,
        potencia,
        consumo_promedio,
        hours,
        dailyKwh: Number(dailyKwh.toFixed(4)),
        monthlyKwh: Number(monthlyKwh.toFixed(4)),
      });
    }

    // 4) Calcular costo
    const monthlyCostRaw = totalMonthlyKwh * tariff;
    const monthlyCost = Number(monthlyCostRaw.toFixed(2));

    // 5) Upsert en monthly_consumptions (user_id + month único)
    const monthStr = new Date().toISOString().slice(0, 7); // 'YYYY-MM'
    await MonthlyConsumptionModel.upsert(
      {
        user_id: userId,
        month: monthStr,
        cost: monthlyCost,
      },
      { transaction: t }
    );

    await t.commit();

    return res.status(200).json({
      message: "Cálculo guardado",
      monthlyCost,
      totalMonthlyKwh: Number(totalMonthlyKwh.toFixed(4)),
      details,
    });
  } catch (err) {
    await t.rollback();
    console.error("Error calculateAndSaveMonthly:", err);
    return res.status(500).json({ message: "Error calculando consumo" });
  }
};
