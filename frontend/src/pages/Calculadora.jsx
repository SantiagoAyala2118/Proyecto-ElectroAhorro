import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/layouts/NavBar";
import { useFetch } from "../hooks/useFetch";
import { useForm } from "../hooks/useForm";

export default function Calculadora() {
  //* NAVEGACIÓN
  const navigate = useNavigate();

  //* FETCH
  const { getFetch } = useFetch("http://localhost:4000/api/calculator");

  //* FORM
  const { stateForm, handleChange, handleSelect, handleSubmit } = useForm({
    power: "",
    hours_per_day: "",
    days: "",
    costPerKwh: "",
    powerUnity: "",
  });

  // Función para volver al login o registro
  const handleBackToLogin = () => {
    navigate("/login");
  };

  // Función para ir a la app principal
  // const handleGoToApp = () => {
  //   navigate("/app");
  // };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-gradient-to-t from-blue-950 to-lime-500 flex flex-col items-center p-0 m-0  inset-0">
      {/* // className="min-h-screen min-w-screen w-screen bg-cover bg-gradient-to-b from-[#eef6ff] to-[#e6eefc] flex flex-col items-center py-12 px-6 m-0 p-0"> */}
      {/* Header con botones de navegación */}
      <header className="w-full max-w-5xl text-center mb-8 mt-20">
        {/* Botones de navegación */}
        <div className="flex justify-between items-center mb-6">
          <Navbar />
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl md:text-4xl"></span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-950 drop-shadow-sm">
            Calculadora de Consumo Eléctrico
          </h1>
        </div>
        <p className="mt-2 text-sm md:text-base text-slate-950">
          Calcula el costo de tus electrodomésticos de forma fácil y precisa
        </p>
      </header>
      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-md p-8 md:p-8 border border-lime-100">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-slate-800" viewBox="0 0 24 24" fill="none"/>
              <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M12 3v18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <svg
              className="w-6 h-6 text-slate-700"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M3 12h18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M12 3v18"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <h2 className="text-xl font-bold text-slate-950">Cálculo Manual</h2>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => (handleSubmit(e), getFetch(stateForm))}
          >
            <div>
              <label className="block text-sm text-slate-950 mb-2">
                Potencia del Electrodoméstico
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="1000"
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-transparent bg-white 
           text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#1e3a8a,#b6ff3b)_border-box] 
           hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#b6ff3b,#162456)_border-box]"
                  aria-label="Potencia"
                  name="power"
                  value={stateForm.power}
                  onChange={handleChange}
                />
                <select
                  className="w-36 px-4 py-2 rounded-lg border-2 border-transparent bg-white 
           text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#1e3a8a,#b6ff3b)_border-box] 
           hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#b6ff3b,#162456)_border-box]"
                  aria-label="Unidad de potencia"
                  defaultValue="W"
                  name="powerUnity"
                  onChange={handleChange}
                >
                  <option value="W">Watts (W)</option>
                  <option value="kW">Kilowatts (kW)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-950 mb-2">
                Horas de uso por día
              </label>
              <input
                type="number"
                placeholder="8"
                className="w-full px-4 py-2 rounded-lg border-2 border-transparent bg-white 
           text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#1e3a8a,#b6ff3b)_border-box] 
           hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#b6ff3b,#162456)_border-box]"
                aria-label="Horas por dia"
                name="hours_per_day"
                value={stateForm.hours_per_day}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                Promedio de días al año
              </label>
              <input
                type="number"
                placeholder="247"
                className="w-full px-4 py-2 rounded-lg border-2 border-transparent bg-white 
           text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#1e3a8a,#b6ff3b)_border-box] 
           hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#b6ff3b,#162456)_border-box]"
                aria-label="Cantidad de días"
                name="days"
                value={stateForm.days}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-2">
                Precio por kWh
              </label>
              <input
                type="number"
                placeholder="0.15"
                className="w-full px-4 py-2 rounded-lg border-2 border-transparent bg-white 
           text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#1e3a8a,#b6ff3b)_border-box] 
           hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#b6ff3b,#162456)_border-box]"
                aria-label="Precio kWh"
                name="costPerKwh"
                value={stateForm.costPerKwh}
                onChange={handleChange}
              />
            </div>

            <div className="pt-2">
              <button
                className="w-full bg-gradient-to-r from-blue-950 to-lime-500  hover:from-lime-500 hover:to-blue-950 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                type="submit"
              >
                Calcular Consumo
              </button>
            </div>
          </form>
        </div>

        {/* Common Appliances Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <svg
              className="w-6 h-6 text-slate-700"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3C7 3 3 6 3 10v7a2 2 0 0 0 2 2h2v-6h10v6h2a2 2 0 0 0 2-2v-7c0-4-4-7-9-7z"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2 className="text-xl font-bold text-slate-950">
              Electrodomésticos Comunes
            </h2>
          </div>

          <form
            className="space-y-4"
            onSubmit={(e) => (handleSubmit(e), getFetch(stateForm))}
          >
            <div>
              <label className="block text-sm text-slate-950 mb-2">
                Selecciona un electrodoméstico
              </label>
              <select
                className="w-full px-4 py-2 rounded-lg border-2 border-transparent bg-white 
           text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#1e3a8a,#b6ff3b)_border-box] 
           hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#b6ff3b,#162456)_border-box]"
                aria-label="Electrodoméstico"
                defaultValue=""
              >
                <option value="">-- Selecciona --</option>
                <option value="fridge">Nevera</option>
                <option value="tv">Televisor</option>
                <option value="washer">Lavarropas</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-slate-950 mb-2">
                Potencia del Electrodoméstico (Kwh)
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="1000"
                  className="w-full px-4 py-2 rounded-lg border-2 border-transparent bg-white 
           text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#1e3a8a,#b6ff3b)_border-box] 
           hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#b6ff3b,#162456)_border-box]"
                  aria-label="Potencia"
                  name="power"
                  value={stateForm.power}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-950 mb-2">
                Horas de uso por día
              </label>
              <input
                type="text"
                placeholder="8"
                className="w-full px-4 py-2 rounded-lg border-2 border-transparent bg-white 
           text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#1e3a8a,#b6ff3b)_border-box] 
           hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#b6ff3b,#162456)_border-box]"
                aria-label="Horas uso (comunes) "
                name="hours_per_day"
                value={stateForm.hours_per_day}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm text-slate-950 mb-2">
                Promedio de días al año
              </label>
              <input
                type="number"
                placeholder="247"
                className="w-full px-4 py-2 rounded-lg border-2 border-transparent bg-white 
           text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#1e3a8a,#b6ff3b)_border-box] 
           hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#b6ff3b,#162456)_border-box]"
                aria-label="Cantidad de días"
                name="days"
                value={stateForm.days}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm text-slate-950 mb-2">
                Precio por kWh
              </label>
              <input
                type="text"
                placeholder="0.15"
                className="w-full px-4 py-2 rounded-lg border-2 border-transparent bg-white 
           text-gray-900 focus:outline-none focus:ring-0 transition-all duration-300 
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#1e3a8a,#b6ff3b)_border-box] 
           hover:[background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#b6ff3b,#162456)_border-box]"
                aria-label="Precio kWh (comunes)"
                name="costPerKwh"
                value={stateForm.costPerKwh}
                onChange={handleChange}
              />
            </div>

            <div className="pt-2">
              <button
                className="w-full bg-gradient-to-r from-blue-950 to-lime-500  hover:from-lime-500 hover:to-blue-950 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                type="button"
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
              <span className="text-2xl"></span>
              <h3 className="font-semibold text-slate-950 text-lg">
                Información Útil
              </h3>
            </div>

            <ul className="text-sm text-start text-slate-950 list-disc list-inside space-y-2">
              <li>1 kW = 1,000 W</li>
              <li>1 kWh = 1 kW usado durante 1 hora</li>
              <li>Precio promedio en España: €0.15/kWh</li>
            </ul>
          </div>

          <div>
            <h4 className="flex font-semibold text-slate-950 mb-3">
              Consejos de ahorro:
            </h4>
            <ul className=" text-sm text-start text-slate-950 list-disc list-inside space-y-2">
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
          className="bg-gradient-to-t from-lime-950 to-lime-500 hover:from-lime-500 hover:to-lime-950 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
        >
          Volver al Inicio
        </button>
      </div>

      {/* small footer spacing */}
      <div className="h-8" />
    </div>
  );
}
