import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components/layouts/SideBar"
import Spline from '@splinetool/react-spline';

export const UserProfile = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');

  // Datos mock para demostración
  //* Los datos de usuario en la base de datos
  const userData = {
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@email.com",
    location: "Madrid, España",
    joinDate: "Enero 2024",
    appliances: 8,
    monthlyConsumption: "245 kWh",
    annualConsumption: "2,940 kWh"
  };
  
  //& Esto deberia ser un fetch a la base de datos de electrodomesticos (custom hook)
  const appliancesList = [
    { name: "Refrigerador", consumption: "85 kWh/mes", status: "Activo" },
    { name: "Lavadora", consumption: "45 kWh/mes", status: "Activo" },
    { name: "Aire Acondicionado", consumption: "120 kWh/mes", status: "Inactivo" },
    { name: "Televisor", consumption: "30 kWh/mes", status: "Activo" },
    { name: "Computadora", consumption: "25 kWh/mes", status: "Activo" },
  ];

  //& Aqui iria la biblioteca de React de Graficos
  const monthlyData = [
    { month: "Ene", consumption: 280 },
    { month: "Feb", consumption: 245 },
    { month: "Mar", consumption: 310 },
    { month: "Abr", consumption: 195 },
    { month: "May", consumption: 265 },
    { month: "Jun", consumption: 340 },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#90AFC5] to-[#336B87]">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Contenido Principal */}
      <div className="ml-64 flex-1 p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header del Perfil */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#763626] to-[#2A3132] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  CR
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-[#2A3132]">{userData.name}</h1>
                  <p className="text-[#336B87] text-lg mt-1">{userData.email}</p>
                  <div className="flex space-x-4 mt-3 text-sm text-[#2A3132]">
                    <span>📍 {userData.location}</span>
                    <span>📅 Miembro desde {userData.joinDate}</span>
                  </div>
                </div>
              </div>
              <button className="bg-[#763626] hover:bg-[#5a2a1d] text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg">
                Editar Perfil
              </button>
            </div>
          </div>

          {/* Grid Principal */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

            {/* Columna Izquierda - Estadísticas */}
            <div className="xl:col-span-2 space-y-8">

              {/* Tarjeta de Estadísticas Rápidas */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-[#2A3132] mb-6 border-b-2 border-[#763626] pb-3">
                  📊 Resumen de Consumo
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-[#90AFC5] to-[#336B87] p-4 rounded-xl text-white text-center shadow-lg">
                    <div className="text-2xl font-bold">{userData.monthlyConsumption}</div>
                    <div className="text-sm opacity-90">Consumo Mensual</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#763626] to-[#2A3132] p-4 rounded-xl text-white text-center shadow-lg">
                    <div className="text-2xl font-bold">{userData.annualConsumption}</div>
                    <div className="text-sm opacity-90">Consumo Anual</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#336B87] to-[#2A3132] p-4 rounded-xl text-white text-center shadow-lg">
                    <div className="text-2xl font-bold">{userData.appliances}</div>
                    <div className="text-sm opacity-90">Electrodomésticos</div>
                  </div>
                  <div className="bg-gradient-to-br from-[#90AFC5] to-[#763626] p-4 rounded-xl text-white text-center shadow-lg">
                    <div className="text-2xl font-bold">$85.000</div>
                    <div className="text-sm opacity-90">Costo Estimado</div>
                  </div>
                </div>
              </div>

              {/* Gráfico de Consumo Mensual */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-[#2A3132] mb-6 border-b-2 border-[#763626] pb-3">
                  📈 Consumo Mensual
                </h2>
                <div className="h-64 flex items-end justify-between space-x-2">
                  {monthlyData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div className="text-xs text-[#2A3132] mb-1">{item.month}</div>
                      <div
                        className="w-full bg-gradient-to-t from-[#763626] to-[#90AFC5] rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                        style={{ height: `${(item.consumption / 400) * 100}%` }}
                        title={`${item.consumption} kWh`}
                      ></div>
                      <div className="text-xs text-[#2A3132] mt-1">{item.consumption}kWh</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lista de Electrodomésticos */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-[#2A3132] mb-6 border-b-2 border-[#763626] pb-3">
                  🔌 Mis Electrodomésticos
                </h2>
                <div className="space-y-4">
                  {appliancesList.map((appliance, index) => (
                    <div key={index} className="flex justify-between items-center p-4 bg-white/50 rounded-xl border border-white/30">
                      <div>
                        <h3 className="font-semibold text-[#2A3132]">{appliance.name}</h3>
                        <p className="text-sm text-[#336B87]">{appliance.consumption}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${appliance.status === 'Activo'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                        }`}>
                        {appliance.status}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 bg-[#336B87] hover:bg-[#2A3132] text-white py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105">
                  + Agregar Electrodoméstico
                </button>
              </div>
            </div>

            {/* Columna Derecha - Información Adicional */}
            <div className="space-y-8">

              {/* Tarjeta de Configuración Rápida */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-[#2A3132] mb-6 border-b-2 border-[#763626] pb-3">
                  ⚙️ Configuración
                </h2>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200">
                    <div className="font-semibold text-[#2A3132]">Notificaciones</div>
                    <div className="text-sm text-[#336B87]">Gestionar alertas de consumo</div>
                  </button>
                  <button className="w-full text-left p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200">
                    <div className="font-semibold text-[#2A3132]">Privacidad</div>
                    <div className="text-sm text-[#336B87]">Controlar datos compartidos</div>
                  </button>
                  <button className="w-full text-left p-4 bg-white/50 rounded-xl border border-white/30 hover:bg-white/70 transition-all duration-200">
                    <div className="font-semibold text-[#2A3132]">Preferencias</div>
                    <div className="text-sm text-[#336B87]">Personalizar experiencia</div>
                  </button>
                </div>
              </div>

              {/* Historial de Consumo Anual */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <h2 className="text-2xl font-bold text-[#2A3132] mb-6 border-b-2 border-[#763626] pb-3">
                  📅 Historial Anual
                </h2>
                <div className="space-y-3">
                  {[2024, 2023, 2022].map((year) => (
                    <div key={year} className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <span className="font-medium text-[#2A3132]">{year}</span>
                      <span className="text-[#763626] font-bold">{(year === 2024 ? 29400 : year === 2023 ? 31200 : 28500).toLocaleString()} kWh</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Consejos de Ahorro */}
              <div className="bg-gradient-to-br from-[#763626] to-[#2A3132] rounded-2xl p-6 shadow-xl text-white">
                <h2 className="text-2xl font-bold mb-4">💡 Tips de Ahorro</h2>
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