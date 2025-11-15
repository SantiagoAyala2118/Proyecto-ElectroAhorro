import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layouts/SideBar"
import Spline from '@splinetool/react-spline';
// Update Recharts imports for LineChart
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const UserProfile = () => {
  // const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [userData, setUserData] = useState(null);
  const [appliancesList, setAppliancesList] = useState([]); // Cambiar a estado dinámico
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [monthlyData, setMonthlyData] = useState([]); // Datos históricos mensuales
  const tariff = 0.5; // Tarifa fija en pesos por kWh (ajusta según necesidad)

  const fetchConsumptionData = async () => {
    try {
      const res = await fetch('http://localhost:4000/api/monthly-consumption', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setMonthlyData(data.monthlyData || []);
      }
    } catch (err) {
      console.error('Error fetching monthly data:', err);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        console.log('Intentando obtener datos del usuario...');
        const res = await fetch('http://localhost:4000/api/user/profile', {
          credentials: 'include',
        });
        console.log('Respuesta del fetch:', res.status, res.statusText);
        if (!res.ok) throw new Error('No se pudo obtener el usuario');
        const data = await res.json();
        console.log('Datos obtenidos:', data);
        setUserData(data.user);
      } catch (err) {
        console.error('Error al cargar datos de usuario:', err);
        setError('Error al cargar datos de usuario');
      }
    };

    const fetchUserAppliances = async () => {
      try {
        console.log('Intentando obtener electrodomésticos del usuario...');
        const res = await fetch('http://localhost:4000/api/user-appliances', {
          credentials: 'include',
        });
        console.log('Respuesta de appliances:', res.status);
        if (res.ok) {
          const data = await res.json();
          setAppliancesList(data.appliances || []);
        }
      } catch (err) {
        console.error('Error obteniendo electrodomésticos del usuario:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
    fetchUserAppliances();
  }, []); // Remove dependency to avoid loop

  // Separate useEffect for consumption calculation (ahora solo para actualizar el mes actual)
  useEffect(() => {
    if (appliancesList.length > 0) {
      // Llamar al cálculo para actualizar el mes actual
      fetch('http://localhost:4000/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          appliances: appliancesList.map(appliance => ({
            applianceId: appliance.Appliance?.id,
            hoursOfUse: 1
          })).filter(item => item.applianceId)
        }),
        credentials: 'include',
      }).then(() => fetchConsumptionData()); // Recargar datos después de calcular
    }
  }, [appliancesList]); // Only runs when appliancesList changes

  //& Aqui iria la biblioteca de React de Graficos
  // const monthlyData = [
  //   { month: "Ene", consumption: 280 },
  //   { month: "Feb", consumption: 245 },
  //   { month: "Mar", consumption: 310 },
  //   { month: "Abr", consumption: 195 },
  //   { month: "May", consumption: 265 },
  //   { month: "Jun", consumption: 340 },
  // ];
  const handleGoToProducts = () => {
    navigate('/catalogo'); // Ajusta la ruta según tu configuración de rutas
  };

  return (
    <div className="flex min-h-screen bg-slate-300">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Contenido Principal */}
      <div className="ml-64 flex-1 p-10">
        <div className="max-w-7xl mx-auto">

          {/* Header del Perfil */}
          <div className="bg-white/90 rounded-2xl p-8 mb-10 shadow-xl border border-lime-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-lime-400 to-blue-950 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {/* Iniciales del usuario */}
                  {userData?.name
                    ? userData.name.split(' ').map(n => n?.[0]).join('').toUpperCase()
                    : '...'}
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-[#2A3132]">
                    {loading ? 'Cargando...' : error ? error : userData?.name}
                  </h1>
                  <p className="text-[#336B87] text-lg mt-1">
                    {loading || error ? '' : userData?.email}
                  </p>
                  <div className="flex space-x-4 mt-3 text-sm text-[#2A3132]">
                    <span>📅 Miembro desde {userData?.joinDate}</span>
                  </div>
                </div>
              </div>
              <button className="bg-gradient-to-r from-lime-600 to-blue-950 hover:from-blue-950 hover:to-lime-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg">
                Editar Perfil
              </button>
            </div>
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* Columna Izquierda - Estadísticas */}
            <div className="xl:col-span-2 space-y-8">

              {/* Tarjeta de Estadísticas Rápidas */}
              <div className="bg-white/90 rounded-2xl p-6 shadow-xl border border-lime-200">
                <h2 className="text-2xl font-bold text-slate-950 mb-6 border-b-2 border-lime-400 pb-2">
                  Resumen de Consumo
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-[#90AFC5] to-[#336B87] p-4 rounded-xl text-white text-center shadow-lg">
                    <div className="text-2xl font-bold">{userData?.monthlyConsumption ?? '—'}</div>
                    <div className="text-sm opacity-90">Consumo Mensual</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#763626] to-[#2A3132] p-4 rounded-xl text-white text-center shadow-lg">
                    <div className="text-2xl font-bold">{userData?.annualConsumption ?? '—'}</div>
                    <div className="text-sm opacity-90">Consumo Anual</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#336B87] to-[#2A3132] p-4 rounded-xl text-white text-center shadow-lg">
                    <div className="text-2xl font-bold">{userData?.appliances ?? '—'}</div>
                    <div className="text-sm opacity-90">Electrodomésticos</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#90AFC5] to-[#763626] p-4 rounded-xl text-white text-center shadow-lg">
                    <div className="text-2xl font-bold">{userData?.estimatedCost ?? '—'}</div>
                    <div className="text-sm opacity-90">Costo Estimado</div>
                  </div>
                </div>
              </div>


              {/* Gráfico de Gasto Mensual */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-[#2A3132] mb-6 border-b-2 border-[#763626] pb-3">
                  📈 Gasto Mensual
                </h2>
                {loading || monthlyData.length === 0 ? (
                  <div className="h-64 flex items-center justify-center">Cargando gráfico...</div>
                ) : (
                  <ResponsiveContainer width="100%" height={256}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="cost" stroke="#763626" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Lista de Electrodomésticos */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-slate-950 mb-6 border-b-2 border-lime-500 pb-3">
                  Mis Electrodomésticos
                </h2>
                <div className="space-y-4">
                  {appliancesList.map((appliance, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-white/55 rounded-xl border border-white/30">
                      <div>
                        <h3 className="font-semibold text-[#2A3132]">{appliance.Appliance?.nombre || 'Sin nombre'}</h3>
                        <p className="text-sm text-[#336B87]">{appliance.Appliance?.consumo_promedio || 0} kWh</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Activo
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-[#336B87] hover:bg-[#2A3132] text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105" onClick={handleGoToProducts}>
                  + Agregar Electrodoméstico
                </button>
              </div>
            </div>

            {/* Columna Derecha - Información Adicional */}
            <div className="space-y-8">

              {/* Tarjeta de Configuración Rápida */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-slate-950 mb-6 border-b-2 border-lime-400 pb-3">
                    Configuración
                </h2>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200">
                    <div className="font-semibold text-slate-950">Notificaciones</div>
                    <div className="text-sm text-blue-900">Gestionar alertas de consumo</div>
                  </button>
                  <button className="w-full text-left p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200">
                    <div className="font-semibold text-slate-900">Privacidad</div>
                    <div className="text-sm text-blue-950">Controlar datos compartidos</div>
                  </button>
                  <button className="w-full text-left p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200">
                    <div className="font-semibold text-slate-950">Preferencias</div>
                    <div className="text-sm text-blue-900">Personalizar experiencia</div>
                  </button>
                </div>
              </div>

              {/* Historial de Consumo Anual */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-slate-950 mb-6 border-b-2 border-lime-400 pb-3">
                  Historial Anual
                </h2>
                <div className="space-y-3">
                  {[2024, 2023, 2022].map((year) => (
                    <div key={year} className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <span className="font-medium text-slate-950">{year}</span>
                      <span className="text-blue-950 font-bold">{(year === 2024 ? 29400 : year === 2023 ? 31200 : 28500).toLocaleString()} kWh</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consejos de Ahorro */}
              <div className="bg-gradient-to-br from-green-700 to-blue-950 rounded-2xl p-6 shadow-xl text-white">
                <h2 className="text-2xl font-bold mb-4">Tips de Ahorro</h2>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Apaga luces cuando no las necesites
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Usa electrodomésticos en horas valle
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    Mantén tu refrigerador a 5°C
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Animación 3D con Spline - REEMPLAZADO */}
          <div className="h-96 mt-12 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black/5">
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