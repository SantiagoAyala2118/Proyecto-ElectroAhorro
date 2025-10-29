import { useNavigate } from "react-router-dom";

export default function Calculadora() {
  const navigate = useNavigate(); // ✅ Correcto: en nivel superior del componente

  // Función para volver al login o registro
  const handleBackToLogin = () => {
    navigate("/login");
  };

  // Función para ir a la app principal
  const handleGoToApp = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#eef6ff] to-[#e6eefc] flex flex-col items-center py-12 px-6">
      {/* Header con botones de navegación */}
      <header className="w-full max-w-5xl text-center mb-8">
        {/* Botones de navegación */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackToLogin}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            ← Volver al Login
          </button>
          
          <button
            onClick={handleGoToApp}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Ir a App Principal →
          </button>
        </div>

        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl md:text-4xl">⚡</span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 drop-shadow-sm">
            Calculadora de Consumo Eléctrico
          </h1>
        </div>
        <p className="mt-2 text-sm md:text-base text-slate-600">
          Calcula el costo de tus electrodomésticos de forma fácil y precisa
        </p>
      </header>

      {/* Cards container */}
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Manual Calculation Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none">
              <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <h2 className="text-xl font-bold text-slate-800">Cálculo Manual</h2>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Potencia del Electrodoméstico</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="1000"
                  className="flex-1 px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                  aria-label="Potencia"
                  value={""}
                  readOnly
                />
                <select
                  className="w-36 px-3 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none"
                  aria-label="Unidad de potencia"
                  defaultValue="W"
                  disabled
                >
                  <option value="W">Watts (W)</option>
                  <option value="kW">Kilowatts (kW)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">Horas de uso por día</label>
              <input
                type="text"
                placeholder="8"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Horas por dia"
                value={""}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">Precio por kWh (€)</label>
              <input
                type="text"
                placeholder="0.15"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Precio kWh"
                value={""}
                readOnly
              />
            </div>

            <div className="pt-2">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-sm transition"
                type="button"
                disabled
              >
                Calcular Consumo
              </button>
            </div>
          </form>
        </div>

        {/* Common Appliances Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-slate-700" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C7 3 3 6 3 10v7a2 2 0 0 0 2 2h2v-6h10v6h2a2 2 0 0 0 2-2v-7c0-4-4-7-9-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <h2 className="text-xl font-bold text-slate-800">Electrodomésticos Comunes</h2>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Selecciona un electrodoméstico</label>
              <select
                className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none"
                aria-label="Electrodoméstico"
                defaultValue=""
                disabled
              >
                <option value="">-- Selecciona --</option>
                <option value="fridge">Nevera</option>
                <option value="tv">Televisor</option>
                <option value="washer">Lavadora</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">Horas de uso por día</label>
              <input
                type="text"
                placeholder="8"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
                aria-label="Horas uso (comunes)"
                value={""}
                readOnly
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">Precio por kWh (€)</label>
              <input
                type="text"
                placeholder="0.15"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-200"
                aria-label="Precio kWh (comunes)"
                value={""}
                readOnly
              />
            </div>

            <div className="pt-2">
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow-sm transition"
                type="button"
                disabled
              >
                Calcular Consumo
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Info Box */}
      <section className="w-full max-w-5xl mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">💡</span>
              <h3 className="font-semibold text-slate-800 text-lg">Información Útil</h3>
            </div>

            <ul className="text-sm text-slate-600 list-disc list-inside space-y-2">
              <li>1 kW = 1,000 W</li>
              <li>1 kWh = 1 kW usado durante 1 hora</li>
              <li>Precio promedio en España: €0.15/kWh</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-800 mb-3">Consejos de ahorro:</h4>
            <ul className="text-sm text-slate-600 list-disc list-inside space-y-2">
              <li>Usa electrodomésticos eficientes (A+++)</li>
              <li>Desconecta aparatos en standby</li>
              <li>Aprovecha las tarifas nocturnas</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Botón adicional de navegación */}
      <div className="mt-6">
        <button
          onClick={handleBackToLogin}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Volver al Inicio
        </button>
      </div>

      {/* small footer spacing */}
      <div className="h-8" />
    </div>
  );
}