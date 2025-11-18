import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/layouts/NavBar";
import { useFetch } from "../hooks/useFetch";
import { useForm } from "../hooks/useForm";
import { useState } from "react";

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
    powerUnity: "W",
  });

  // --- INICIO PARCHÉ: estado y funciones para mantener estilos intactos ---
  const [calcResult, setCalcResult] = useState(null);
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcError, setCalcError] = useState("");

  // Esta función reemplaza la llamada original getFetch(stateForm)
  // Mantiene también tu handleSubmit (para que haga validaciones locales que ya tengas)
  const handleSubmitAndFetch = async (e) => {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    // Llamar a tu manejador de formulario original (para mantener lo que hace useForm)
    try {
      // Si handleSubmit es síncrono y ya previene, lo llamamos:
      if (typeof handleSubmit === "function") {
        handleSubmit(e);
      }
    } catch (err) {
      // no interrumpir si handleSubmit lanza (pero lo logueamos)
      console.warn("handleSubmit threw:", err);
    }

    // Ahora hacemos la petición real al backend con el contenido del form
    setCalcLoading(true);
    setCalcError("");

    //* VALIDACIONES DENTRO DEL FORMULARIO
    // Construir payload normalizado
    const payload = {
      power: Number(stateForm.power),
      hours_per_day: Number(stateForm.hours_per_day),
      days: Number(stateForm.days),
      costPerKwh: Number(stateForm.costPerKwh),
      powerUnity: String(stateForm.powerUnity || "W").toUpperCase(),
    };

    // Validaciones rápidas
    if (!Number.isFinite(payload.power) || payload.power <= 0) {
      setCalcError("Ingresá una potencia válida (>0).");
      setCalcLoading(false);
      return;
    }
    if (!Number.isFinite(payload.hours_per_day) || payload.hours_per_day <= 0) {
      setCalcError("Ingresá horas por día válidas (>0).");
      setCalcLoading(false);
      return;
    }
    if (!Number.isFinite(payload.days) || payload.days <= 0) {
      setCalcError("Ingresá días válidos (>0).");
      setCalcLoading(false);
      return;
    }
    if (!Number.isFinite(payload.costPerKwh) || payload.costPerKwh < 0) {
      setCalcError("Ingresá un precio por kWh válido (>=0).");
      setCalcLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload), // tu useForm deja los datos en stateForm
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => null);
        setCalcError("Error servidor: " + (txt || res.status));
        setCalcResult(null);
        setCalcLoading(false);
        return;
      }

      const json = await res.json();
      // Normalizamos la respuesta a la forma que usamos para graficar en el perfil:
      // json.dailyData  => array de { date: 'YYYY-MM-DD', kwh: num }
      // json.summary => { total_consumption, cost }
      setCalcResult({
        dailyData: json.dailyData || json.data?.dailyData || [],
        summary: json.summary ||
          json.data?.summary || { total_consumption: 0, cost: 0 },
        raw: json,
      });
    } catch (err) {
      console.error("Error en fetch calculadora:", err);
      setCalcError("Error de red al comunicarse con el servidor");
      setCalcResult(null);
    } finally {
      setCalcLoading(false);
    }
  };

  // // Función para guardar el cálculo en el perfil (usa endpoint ya creado)
  // const handleSaveToProfile = async () => {
  //   if (!calcResult) {
  //     alert("Primero realizá un cálculo.");
  //     return;
  //   }
  //   setCalcLoading(true);
  //   try {
  //     const res = await fetch("http://localhost:4000/api/calculate-and-save", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ costPerKwh: Number(stateForm.costPerKwh || 0) }),
  //     });
  //     const json = await res.json().catch(() => null);
  //     if (!res.ok) {
  //       alert("No se pudo guardar en perfil: " + (json?.message || res.status));
  //       return;
  //     }
  //     alert("Cálculo guardado correctamente en tu perfil (mes actual).");
  //   } catch (err) {
  //     console.error("Error guardando cálculo:", err);
  //     alert("Error guardando cálculo (ver consola).");
  //   } finally {
  //     setCalcLoading(false);
  //   }
  // };
  // // --- FIN PARCHÉ ---

  // Función para volver al login o registro
  const handleBackToLogin = () => {
    navigate("/login");
  };

  // Función para ir a la app principal
  // const handleGoToApp = () => {
  //   navigate("/app");
  // };

  return (
    <div className="min-h-screen w-full bg-cover bg-slate-300 flex flex-col items-center p-0 m-0 pt-[7vh]  inset-0">
      {/* // className="min-h-screen min-w-screen w-screen bg-cover bg-gradient-to-b from-[#eef6ff] to-[#e6eefc] flex flex-col items-center py-12 px-6 m-0 p-0"> */}
      {/* Header con botones de navegación */}
      <header className="w-full max-w-5xl text-center mb-8 mt-20">
        {/* Botones de navegación */}
        <div className="flex justify-between items-center mb-6">
          <Navbar />
        </div>
        <div className="flex items-center justify-center gap-3">
          <span className="text-3xl md:text-4xl"></span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-950 drop-shadow-sm">
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
            <svg
              className="w-6 h-6 text-slate-950"
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

          <form className="space-y-4" onSubmit={handleSubmitAndFetch}>
            <section className="h-72 overflow-auto">
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
                    value={stateForm.powerUnity}
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
                  type="number"
                  placeholder="144.50"
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
            </section>

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
              className="w-6 h-6 text-slate-950"
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
            <h2 className="text-xl font-bold text-slate-950 text-start">
              Electrodomésticos Comunes
            </h2>
          </div>

          <form className="space-y-4" onSubmit={handleSubmitAndFetch}>
            <section className="h-72 overflow-auto">
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
                  type="number"
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
                  type="number"
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
            </section>

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
      </section>

      {/* RESULTADO DEL CÁLCULO */}
      {(calcLoading || calcError || calcResult) && (
        <section className="w-full max-w-5xl mt-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-lime-100 text-center">
            {/* Loading */}
            {calcLoading && (
              <p className="text-blue-900 font-semibold animate-pulse">
                Calculando...
              </p>
            )}

            {/* Error */}
            {calcError && (
              <p className="text-red-600 font-semibold">{calcError}</p>
            )}

            {/* Resultado */}
            {calcResult && !calcLoading && !calcError && (
              <div>
                <h3 className="text-xl font-bold text-blue-900 mb-4">
                  Resultado del cálculo
                </h3>

                <p className="text-lg text-slate-900">
                  <span className="font-semibold">
                    Consumo total estimado:{" "}
                  </span>
                  {calcResult.summary.total_consumption.toFixed(2)} kWh
                </p>

                <p className="text-lg text-slate-900 mt-1">
                  <span className="font-semibold">Costo: </span>$
                  {calcResult.summary.cost.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

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
              <li>Precio promedio en Argentina: $144.32/kWh</li>
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
