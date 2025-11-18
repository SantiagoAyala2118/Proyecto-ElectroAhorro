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
  const tariff = 0.5;

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
      } catch (err) {}
    };

    runCalculation();
  }, [appliancesList]);

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

              {/* Resumen */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-200">
                <h2 className="text-3xl font-extrabold text-blue-950 mb-6 border-b-2 border-lime-400 pb-2">
                  Resumen de Consumo
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      value: userData?.monthlyConsumption,
                      label: "Consumo Mensual",
                    },
                    {
                      value: userData?.annualConsumption,
                      label: "Consumo Anual",
                    },
                    {
                      value: userData?.appliances,
                      label: "Electrodomésticos",
                    },
                    {
                      value: userData?.estimatedCost,
                      label: "Costo Estimado",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 p-4 rounded-xl text-center shadow-md hover:shadow-xl transition"
                    >
                      <div className="text-2xl font-bold text-blue-950">
                        {item.value ?? "—"}
                      </div>
                      <div className="text-sm text-gray-700">{item.label}</div>
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
                      <YAxis tickFormatter={(v) => `$${v}`} />
                      <Tooltip formatter={(value) => [`$${value}`, "Costo"]} />
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
                  ].map((item) => (
                    <button
                      key={item.title}
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

// import { useState, useEffect, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// // Eliminamos la importación externa que causaba el error
// // import { Sidebar } from "../components/layouts/SideBar";
// import Spline from "@splinetool/react-spline";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// // --- COMPONENTE SIDEBAR INTEGRADO (MOCK) ---
// // Lo definimos aquí para evitar errores de importación en el entorno de prueba
// const Sidebar = ({ activeSection, setActiveSection }) => {
//   const menuItems = [
//     { id: "profile", label: "Mi Perfil", icon: "👤" },
//     { id: "dashboard", label: "Tablero", icon: "📊" },
//     { id: "appliances", label: "Electrodomésticos", icon: "🔌" },
//     { id: "settings", label: "Configuración", icon: "⚙️" },
//   ];

//   return (
//     <div className="fixed top-0 left-0 h-full w-64 bg-white border-r border-lime-200 shadow-lg z-50 flex flex-col">
//       <div className="p-6 border-b border-lime-100">
//         <h2 className="text-2xl font-bold text-lime-700">EcoTracker</h2>
//       </div>
//       <nav className="flex-1 p-4 space-y-2">
//         {menuItems.map((item) => (
//           <button
//             key={item.id}
//             onClick={() => setActiveSection(item.id)}
//             className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
//               activeSection === item.id
//                 ? "bg-lime-100 text-lime-800 shadow-sm"
//                 : "text-slate-600 hover:bg-lime-50"
//             }`}
//           >
//             <span className="text-xl">{item.icon}</span>
//             <span className="font-medium">{item.label}</span>
//           </button>
//         ))}
//       </nav>
//       <div className="p-4 border-t border-lime-100">
//         <button className="w-full text-left px-4 py-2 text-slate-500 hover:text-red-500 transition-colors text-sm font-medium">
//           Cerrar Sesión
//         </button>
//       </div>
//     </div>
//   );
// };

// // --- COMPONENTE PRINCIPAL ---

// export const UserProfile = () => {
//   const navigate = useNavigate();
//   const [activeSection, setActiveSection] = useState("profile");
//   const [userData, setUserData] = useState(null);
//   const [appliancesList, setAppliancesList] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [monthlyData, setMonthlyData] = useState([]);

//   // 1. Función segura para transformar números
//   const toNumberSafe = (v, fallback = 0) => {
//     const n = Number(v);
//     return Number.isFinite(n) ? n : fallback;
//   };

//   // 2. Lógica de obtención del historial (separada para reutilizar)
//   const fetchConsumptionData = useCallback(async () => {
//     try {
//       console.log("📡 Solicitando historial de consumo...");
//       const res = await fetch(
//         "http://localhost:4000/api/monthly-consumption?ts=" + Date.now(),
//         { credentials: "include", cache: "no-store" }
//       );

//       if (res.status === 401) {
//         localStorage.removeItem("isLogged");
//         // navigate('/login');
//         return;
//       }

//       if (!res.ok) throw new Error("Error fetching consumption");

//       const payload = await res.json();
//       // Ajuste: Muestra en consola qué estructura exacta llega
//       console.log("📦 Payload recibido del backend:", payload);

//       const monthly = payload.monthlyData || payload.data || payload || [];
//       setMonthlyData(Array.isArray(monthly) ? monthly : []);
//     } catch (err) {
//       console.error("❌ Error en fetchConsumptionData:", err);
//       setMonthlyData([]);
//     }
//   }, []);

//   // 3. Efecto Principal Unificado (Evita Race Conditions)
//   useEffect(() => {
//     const initData = async () => {
//       try {
//         setLoading(true);

//         // A. Obtener Usuario
//         // Nota: Si falla, usamos datos mock para que la UI no se rompa en la demo
//         let dataUser = {
//           user: {
//             name: "Usuario Demo",
//             email: "demo@user.com",
//             monthlyConsumption: 0,
//             estimatedCost: 0,
//           },
//         };
//         try {
//           const resUser = await fetch(
//             "http://localhost:4000/api/user/profile",
//             { credentials: "include" }
//           );
//           if (resUser.ok) dataUser = await resUser.json();
//         } catch (e) {
//           console.warn("Usando usuario mock por fallo de red");
//         }

//         setUserData(dataUser.user);

//         // B. Obtener Electrodomésticos
//         try {
//           const resApp = await fetch(
//             "http://localhost:4000/api/user-appliances",
//             { credentials: "include" }
//           );
//           if (resApp.ok) {
//             const dataApp = await resApp.json();
//             const apps = dataApp.appliances || [];
//             setAppliancesList(apps);

//             // C. CALCULAR (Solo si hay electrodomésticos)
//             if (apps.length > 0) {
//               console.log("⚙️ Ejecutando cálculo en backend...");
//               await fetch("http://localhost:4000/api/calculate-and-save", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({}),
//                 credentials: "include",
//               });
//             }
//           }
//         } catch (e) {
//           console.warn("Fallo al obtener electrodomésticos", e);
//         }

//         // D. Finalmente, traer el historial
//         await fetchConsumptionData();
//       } catch (err) {
//         console.error("Error en carga inicial:", err);
//         setError("Error cargando perfil");
//       } finally {
//         setLoading(false);
//       }
//     };

//     initData();
//   }, [fetchConsumptionData]);

//   // 4. Transformación de datos para el gráfico
//   const monthNames = [
//     "Ene",
//     "Feb",
//     "Mar",
//     "Abr",
//     "May",
//     "Jun",
//     "Jul",
//     "Ago",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dic",
//   ];

//   const transformMonthlyData = (raw) => {
//     if (!Array.isArray(raw)) return [];

//     if (raw.length > 0) console.log("🔍 Estructura de un item crudo:", raw[0]);

//     const parsed = raw.map((m) => {
//       // IMPORTANTE: Verifica estos nombres con tu backend
//       const rawCost = m?.cost ?? m?.total ?? m?.estimatedCost ?? 0;

//       const original = String(m?.month ?? "");
//       let year = new Date().getFullYear();
//       let monthNum = new Date().getMonth() + 1;

//       if (original.includes("-")) {
//         const parts = original.split("-");
//         year = toNumberSafe(parts[0], year);
//         monthNum = toNumberSafe(parts[1], monthNum);
//       }

//       const date = new Date(year, monthNum - 1, 1);

//       return {
//         date,
//         monthLabel: monthNames[date.getMonth()],
//         cost: toNumberSafe(rawCost, 0),
//       };
//     });

//     return parsed.sort((a, b) => a.date - b.date);
//   };

//   const chartData = transformMonthlyData(monthlyData);
//   const dataToShow = chartData.length > 0 ? chartData : [];

//   const handleGoToProducts = () => {
//     navigate("/catalogo");
//   };

//   return (
//     <div className="flex min-h-screen bg-slate-300 font-sans">
//       {/* Usamos el Sidebar integrado */}
//       <Sidebar
//         activeSection={activeSection}
//         setActiveSection={setActiveSection}
//       />

//       <div className="ml-64 flex-1 p-10">
//         <div className="max-w-7xl mx-auto">
//           {/* Header */}
//           <div className="bg-white/90 rounded-2xl p-8 mb-10 shadow-xl border border-lime-200">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center space-x-6">
//                 <div className="w-24 h-24 bg-gradient-to-br from-lime-400 to-blue-950 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
//                   {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
//                 </div>
//                 <div>
//                   <h1 className="text-4xl font-bold text-[#2A3132]">
//                     {loading
//                       ? "Cargando..."
//                       : error
//                       ? error
//                       : userData?.name || "Usuario"}
//                   </h1>
//                   <p className="text-[#336B87] text-lg mt-1">
//                     {userData?.email || "cargando..."}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
//             <div className="xl:col-span-2 space-y-8">
//               {/* Resumen */}
//               <div className="bg-white/90 rounded-2xl p-6 shadow-xl border border-lime-200">
//                 <h2 className="text-2xl font-bold text-slate-950 mb-6 border-b-2 border-lime-400 pb-2">
//                   Resumen de Consumo
//                 </h2>
//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                   <div className="bg-gradient-to-br from-[#90AFC5] to-[#336B87] p-4 rounded-xl text-white text-center shadow-lg">
//                     <div className="text-2xl font-bold">
//                       {userData?.monthlyConsumption ?? "—"}
//                     </div>
//                     <div className="text-sm opacity-90">Consumo Mensual</div>
//                   </div>
//                   <div className="bg-gradient-to-br from-[#763626] to-[#2A3132] p-4 rounded-xl text-white text-center shadow-lg">
//                     <div className="text-2xl font-bold">
//                       {userData?.estimatedCost ?? "—"}
//                     </div>
//                     <div className="text-sm opacity-90">Costo Estimado</div>
//                   </div>
//                   <div className="bg-gradient-to-br from-[#336B87] to-[#2A3132] p-4 rounded-xl text-white text-center shadow-lg">
//                     <div className="text-2xl font-bold">
//                       {appliancesList.length}
//                     </div>
//                     <div className="text-sm opacity-90">Electrodomésticos</div>
//                   </div>
//                   <div className="bg-gradient-to-br from-[#90AFC5] to-[#763626] p-4 rounded-xl text-white text-center shadow-lg">
//                     <div className="text-2xl font-bold">0.5</div>
//                     <div className="text-sm opacity-90">Tarifa $/kWh</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Gráfico */}
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
//                 <h2 className="text-2xl font-bold text-[#2A3132] mb-6 border-b-2 border-[#763626] pb-3">
//                   📈 Gasto Mensual
//                 </h2>
//                 {loading ? (
//                   <div className="h-64 flex items-center justify-center">
//                     Cargando gráfico...
//                   </div>
//                 ) : dataToShow.length === 0 ? (
//                   <div className="h-64 flex flex-col items-center justify-center text-gray-500">
//                     <p>No hay datos de consumo registrados.</p>
//                     <small>
//                       Asegúrate de tener electrodomésticos agregados.
//                     </small>
//                   </div>
//                 ) : (
//                   <ResponsiveContainer width="100%" height={256}>
//                     <LineChart data={dataToShow}>
//                       <defs>
//                         <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
//                           <stop
//                             offset="0%"
//                             stopColor="#763626"
//                             stopOpacity={0.6}
//                           />
//                           <stop
//                             offset="100%"
//                             stopColor="#763626"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid strokeDasharray="3 3" />
//                       <XAxis dataKey="monthLabel" />
//                       <YAxis tickFormatter={(v) => `$${v}`} />
//                       <Tooltip formatter={(value) => [`$${value}`, "Costo"]} />
//                       <Line
//                         type="monotone"
//                         dataKey="cost"
//                         stroke="#763626"
//                         strokeWidth={2}
//                         dot={{ r: 3 }}
//                         activeDot={{ r: 6 }}
//                         fill="url(#grad)"
//                       />
//                     </LineChart>
//                   </ResponsiveContainer>
//                 )}
//               </div>

//               {/* Lista Electrodomésticos */}
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
//                 <h2 className="text-2xl font-bold text-slate-950 mb-6 border-b-2 border-lime-500 pb-3">
//                   Mis Electrodomésticos
//                 </h2>
//                 <div className="space-y-4">
//                   {appliancesList.map((applianceObj) => {
//                     const ap = applianceObj.Appliance || applianceObj;
//                     return (
//                       <div
//                         key={ap?.id ?? Math.random()}
//                         className="flex justify-between items-center p-4 bg-white/55 rounded-xl border border-white/30"
//                       >
//                         <div>
//                           <h3 className="font-semibold text-[#2A3132]">
//                             {ap?.nombre || "Sin nombre"}
//                           </h3>
//                           <p className="text-sm text-[#336B87]">
//                             {ap?.consumo_promedio ?? 0} kWh
//                           </p>
//                         </div>
//                         <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
//                           Activo
//                         </span>
//                       </div>
//                     );
//                   })}
//                 </div>
//                 <Link
//                   to={"/appliance/catalog"}
//                   onClick={handleGoToProducts}
//                   className="block text-center w-full mt-4 bg-[#336B87] hover:bg-[#2A3132] text-white py-3 rounded-xl font-medium transition-all"
//                 >
//                   + Agregar Electrodoméstico
//                 </Link>
//               </div>
//             </div>

//             {/* Columna Derecha (Tips, etc) */}
//             <div className="space-y-8">
//               <div className="bg-gradient-to-br from-green-700 to-blue-950 rounded-2xl p-6 shadow-xl text-white">
//                 <h2 className="text-2xl font-bold mb-4">Tips de Ahorro</h2>
//                 <ul className="space-y-2 text-sm">
//                   <li>• Apaga luces innecesarias</li>
//                   <li>• Usa electrodomésticos en horas valle</li>
//                   <li>• Desconecta cargadores sin uso</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
