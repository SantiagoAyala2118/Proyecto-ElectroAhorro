import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layouts/SideBar";
import Spline from "@splinetool/react-spline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export const UserProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("profile");
  const [userData, setUserData] = useState(null);
  const [appliancesList, setAppliancesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [monthlyData, setMonthlyData] = useState([]);
  const tariff = 13.0; // ARS por kWh

  const fetchConsumptionData = async () => {
    try {
      const res = await fetch(
        "http://localhost:4000/api/monthly-consumption?ts=" + Date.now(),
        {
          credentials: "include",
          cache: "no-store",
        }
      );

      if (res.status === 401) {
        localStorage.removeItem("isLogged");
        setMonthlyData([]);
        return;
      }

      if (!res.ok) {
        setMonthlyData([]);
        return;
      }

      const payload = await res.json();
      const monthly = payload.monthlyData || payload.data || payload || [];
      setMonthlyData(Array.isArray(monthly) ? monthly : []);
    } catch (err) {
      setMonthlyData([]);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/user/profile", {
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      }
    } catch (_) { }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/user/profile", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("No se pudo obtener el usuario");
        const data = await res.json();
        setUserData(data.user);
      } catch (err) {
        setError("Error al cargar datos de usuario");
      }
    };

    const fetchUserAppliances = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/user-appliances", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setAppliancesList(data.appliances || []);

          await fetch("http://localhost:4000/api/calculate-and-save", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({}),
          });

          await fetchUserProfile(); // refresca resumen
          await fetchConsumptionData();
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchUserAppliances();
    fetchConsumptionData();
  }, []);

  useEffect(() => {
    const runCalculation = async () => {
      if (appliancesList.length === 0) return;

      try {
        const body = {
          appliances: appliancesList
            .map((appliance) => ({
              applianceId: appliance.Appliance?.id,
              hoursOfUse: 1,
            }))
            .filter((item) => item.applianceId),
        };

        const res = await fetch("http://localhost:4000/api/calculate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          credentials: "include",
        });

        if (res.ok) {
          await fetchConsumptionData();
        }
      } catch (err) { }
    };

    runCalculation();
  }, [appliancesList]);

  // DERIVADOS PARA RESUMEN
  const totalApplianceKWh = appliancesList.reduce(
    (acc, apObj) =>
      acc +
      Number(
        apObj.Appliance?.consumo_promedio ??
        apObj.consumo_promedio ??
        0
      ),
    0
  );

  const derivedMonthlyKWh =
    (Number(userData?.monthlyConsumption) > 0
      ? Number(userData?.monthlyConsumption)
      : totalApplianceKWh) || 0;

  const derivedAnnualKWh =
    (Number(userData?.annualConsumption) > 0
      ? Number(userData?.annualConsumption)
      : derivedMonthlyKWh * 12) || 0;

  const derivedEstimatedCost =
    (Number(userData?.estimatedCost) > 0
      ? Number(userData?.estimatedCost)
      : Number((derivedMonthlyKWh * tariff).toFixed(2))) || 0;

  const derivedAnnualEstimatedCost = Number(
    (derivedAnnualKWh * tariff).toFixed(2)
  );

  const applianceCount =
    Number(userData?.appliances) > 0
      ? Number(userData?.appliances)
      : appliancesList.length;

  const monthNames = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ];

  const toNumberSafe = (v, fallback = 0) => {
    const n = Number(v);
    return Number.isFinite(n) ? n : fallback;
  };

  const transformMonthlyData = (raw) => {
    if (!Array.isArray(raw)) return [];

    const parsed = raw.map((m) => {
      const original = String(m?.month ?? "");
      let year = null;
      let monthNum = null;

      if (original.includes("-")) {
        const parts = original.split("-");
        year = toNumberSafe(parts[0], new Date().getFullYear());
        monthNum = toNumberSafe(parts[1], new Date().getMonth() + 1);
      } else {
        monthNum = toNumberSafe(original, new Date().getMonth() + 1);
        year = new Date().getFullYear();
      }

      if (monthNum < 1 || monthNum > 12)
        monthNum = new Date().getMonth() + 1;

      const date = new Date(year, monthNum - 1, 1);
      const cost = toNumberSafe(m?.cost, 0);

      return {
        date,
        monthLabel: monthNames[date.getMonth()],
        cost,
      };
    });

    const grouped = parsed.reduce((acc, cur) => {
      const key = `${cur.date.getFullYear()}-${String(
        cur.date.getMonth() + 1
      ).padStart(2, "0")}`;
      if (!acc[key])
        acc[key] = { date: cur.date, monthLabel: cur.monthLabel, cost: 0 };
      acc[key].cost += cur.cost;
      return acc;
    }, {});

    return Object.keys(grouped)
      .map((k) => ({
        month: grouped[k].monthLabel,
        cost: Number(grouped[k].cost.toFixed(2)),
        date: grouped[k].date,
      }))
      .sort((a, b) => a.date - b.date);
  };

  const simulateHistory = (currentCost = 1000, months = 6) => {
    const base = toNumberSafe(currentCost, 1000);
    const out = [];
    const today = new Date();

    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const factor = 1 + (Math.random() - 0.5) * 0.2;
      const val = Number((base * factor).toFixed(2));
      out.push({
        month: monthNames[d.getMonth()],
        cost: val,
      });
    }
    return out;
  };

  const transformedMonthly = transformMonthlyData(monthlyData);
  const hasRealNonZero = transformedMonthly.some(
    (d) => toNumberSafe(d.cost, 0) > 0
  );
  const dataToShow = hasRealNonZero
    ? transformedMonthly
    : simulateHistory(userData?.estimatedCost, 6);

  const handleGoToProducts = () => {
    navigate("/catalogo");
  };

  // Array corregido para el grid de resumen
  const summaryItems = [
    {
      value: `${derivedMonthlyKWh.toFixed(2)} kWh`,
      label: "Consumo Mensual",
    },
    {
      value: `${derivedAnnualKWh.toFixed(2)} kWh`,
      label: "Consumo Anual",
    },
    {
      value: applianceCount,
      label: "Electrodomésticos",
    },
    {
      value: `$${tariff.toFixed(2)} ARS/kWh`,
      label: "Tarifa",
    },
    {
      value: `$${derivedEstimatedCost.toFixed(2)} ARS`,
      label: "Costo Mensual",
    },
    {
      value: `$${derivedAnnualEstimatedCost.toFixed(2)} ARS`,
      label: "Costo Anual",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 text-slate-950">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Contenido Principal */}
      <div className="ml-64 flex-1 p-10">
        <div className="max-w-7xl mx-auto">

          {/* Header del Perfil */}
          <div className="bg-white rounded-2xl p-8 mb-10 shadow-xl border border-gray-200">
            <div className="flex items-center justify-between">

              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-lime-400 to-blue-950 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-md">
                  {userData?.name
                    ? userData.name
                      .split(" ")
                      .map((n) => n?.[0])
                      .join("")
                      .toUpperCase()
                    : "..."}
                </div>

                <div>
                  <h1 className="text-4xl font-extrabold text-blue-950">
                    {loading ? "Cargando..." : error ? error : userData?.name}
                  </h1>

                  <p className="text-gray-600 text-lg mt-1">
                    {loading || error ? "" : userData?.email}
                  </p>

                  <div className="flex space-x-4 mt-3 text-sm text-gray-700">
                    <span>📅 Miembro desde {userData?.joinDate}</span>
                  </div>
                </div>
              </div>

              <button className="bg-gradient-to-br from-lime-400 to-blue-950 hover:from-lime-500 hover:to-blue-900 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md">
                Editar Perfil
              </button>
            </div>
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* Columna Izquierda - Estadísticas */}
            <div className="xl:col-span-2 space-y-8">

              {/* Resumen CORREGIDO */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                <h2 className="text-3xl font-extrabold text-blue-950 mb-6 border-b-2 border-lime-400 pb-2">
                  Resumen de Consumo
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {summaryItems.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 p-4 rounded-xl text-center shadow-md hover:shadow-xl transition flex flex-col items-center justify-center space-y-2 break-words"
                    >
                      <div className="text-xl md:text-2xl font-bold text-blue-950 text-center break-words">
                        {item.value ?? "—"}
                      </div>
                      <div className="text-xs md:text-sm text-gray-700 text-center break-words">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gráfico */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                <h2 className="text-3xl font-extrabold text-blue-950 mb-6 border-b-2 border-blue-900 pb-3">
                  📈 Gasto Mensual
                </h2>
                {loading ? (
                  <div className="h-64 flex items-center justify-center text-gray-600">
                    Cargando gráfico...
                  </div>
                ) : !dataToShow || dataToShow.length === 0 ? (
                  <div className="h-64 flex items-center justify-center text-gray-600">
                    No hay datos para mostrar.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={256}>
                    <LineChart data={dataToShow}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(v) => `$${v} ARS`} />
                      <Tooltip formatter={(value) => [`$${value} ARS`, "Costo"]} />
                      <Line
                        type="monotone"
                        dataKey="cost"
                        stroke="#336B87"
                        strokeWidth={3}
                        dot={{ r: 4 }}
                        activeDot={{ r: 7 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Lista de Electrodomésticos */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                <h2 className="text-3xl font-extrabold text-blue-950 mb-6 border-b-2 border-lime-500 pb-3">
                  Mis Electrodomésticos
                </h2>

                <div className="space-y-4">
                  {appliancesList.map((applianceObj) => {
                    const ap = applianceObj.Appliance || applianceObj;
                    return (
                      <div
                        key={ap?.id ?? Math.random()}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-xl border border-gray-200 hover:shadow-md transition"
                      >
                        <div>
                          <h3 className="font-semibold text-blue-950">
                            {ap?.nombre || "Sin nombre"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {ap?.consumo_promedio ?? 0} kWh
                          </p>
                        </div>

                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Activo
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Link
                  to={"/appliance/catalog"}
                  className="w-full mt-4 bg-gradient-to-br from-lime-400 to-blue-950 hover:from-lime-500 hover:to-blue-900 text-white py-3 rounded-full font-semibold transition-all duration-300 shadow-md flex justify-center"
                  onClick={handleGoToProducts}
                >
                  + Agregar Electrodoméstico
                </Link>
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="space-y-8">

              {/* Configuración */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                <h2 className="text-3xl font-extrabold text-blue-950 mb-6 border-b-2 border-lime-400 pb-3">
                  Configuración
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      title: "Notificaciones",
                      desc: "Gestionar alertas de consumo",
                    },
                    {
                      title: "Privacidad",
                      desc: "Controlar datos compartidos",
                    },
                    {
                      title: "Preferencias",
                      desc: "Personalizar experiencia",
                    },
                  ].map((item, index) => (
                    <button
                      key={index}
                      className="w-full text-left p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-white transition-all duration-300 shadow-sm hover:shadow"
                    >
                      <div className="font-semibold text-blue-950">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-700">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Historial Anual */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                <h2 className="text-3xl font-extrabold text-blue-950 mb-6 border-b-2 border-lime-400 pb-3">
                  Historial Anual
                </h2>

                <div className="space-y-3">
                  {[2024, 2023, 2022].map((year) => (
                    <div
                      key={year}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <span className="font-medium text-blue-950">{year}</span>
                      <span className="text-blue-900 font-bold">
                        {(year === 2024
                          ? 29400
                          : year === 2023
                            ? 31200
                            : 28500
                        ).toLocaleString()}{" "}
                        kWh
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-lime-400 to-blue-950 rounded-2xl p-6 shadow-xl text-white">
                <h2 className="text-2xl font-bold mb-4">Tips de Ahorro</h2>
                <ul className="space-y-2 text-sm">
                  <li>• Apaga luces cuando no las necesites</li>
                  <li>• Usa electrodomésticos en horas valle</li>
                  <li>• Mantén tu refrigerador a 5°C</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Animación Spline */}
          <div className="h-96 mt-12 rounded-2xl overflow-hidden shadow-xl border border-gray-200 bg-gray-50">
            <Spline
              scene="https://prod.spline.design/yvKFL6HrJ5lSHl8p/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};