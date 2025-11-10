import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components/SpaceBackground.css";

export const Registro = () => {
  const navigate = useNavigate();
  const [lightsOn, setLightsOn] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Registro exitoso:", responseData);
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.log("Error del backend:", errorData);
        // Mostrar errores específicos si existen
        if (errorData.errors && Array.isArray(errorData.errors)) {
          setError(errorData.errors.map(e => e.msg).join(', '));
        } else {
          setError(errorData.message || "Error en el registro");
        }
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      setError("Error en el registro");
    }
  };

  const password = watch("password");

  // Generar estrellas aleatorias
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.8 + 0.2,
          animationDelay: Math.random() * 5,
          animationDuration: Math.random() * 3 + 2
        });
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  const toggleLights = () => {
    setLightsOn(!lightsOn);
  };

  return (
    <div
      className={`min-h-screen w-screen flex items-center justify-center p-0 m-0 fixed inset-0 overflow-hidden cursor-pointer space-background ${lightsOn ? '' : 'lights-off'}`}
      onClick={toggleLights}
    >
      {/* Fondo de estrellas */}
      <div className="absolute inset-0">
        {stars.map(star => (
          <div
            key={star.id}
            className={`star twinkle-star ${lightsOn ? '' : 'lights-off'}`}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: lightsOn ? star.opacity : star.opacity * 0.1,
              '--duration': `${star.animationDuration}s`,
              '--delay': `${star.animationDelay}s`
            }}
          />
        ))}
      </div>

      {/* Planeta Tierra */}
      <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 -translate-x-1/2">
        <div className={`planet-earth ${lightsOn ? '' : 'lights-off'}`}>
          {/* Continentes simulados */}
          <div className="continents">
            <div className="continent continent-1"></div>
            <div className="continent continent-2"></div>
            <div className="continent continent-3"></div>
            <div className="continent continent-4"></div>
          </div>

          {/* Nubes */}
          <div className={`clouds ${lightsOn ? '' : 'lights-off'}`}>
            <div className="cloud cloud-1"></div>
            <div className="cloud cloud-2"></div>
            <div className="cloud cloud-3"></div>
          </div>

          {/* Anillo orbital */}
          <div className={`orbital-ring ${lightsOn ? '' : 'lights-off'}`}></div>
        </div>
      </div>

      {/* Satélites */}
      <div className={`satellite ${lightsOn ? '' : 'lights-off'}`} style={{
        top: '33%',
        right: '25%'
      }}></div>

      {/* Formulario */}
      <div
        className="relative z-10 w-full max-w-md form-container px-6 py-6 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-lime-300 mb-2">
            ElectroAhorro
          </h1>
          <p className="text-white/90">
            Crea tu cuenta para gestionar tu consumo eléctrico
          </p>
          <p className="text-white/60 text-sm mt-2">
            💡 Click en el espacio para {lightsOn ? 'apagar' : 'encender'} las luces
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-lime-300 mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              placeholder="Introduce tu nombre completo"
              className="w-full px-3 py-2 rounded-lg form-input"
              {...register("full_name", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.full_name && (
              <p className="text-red-300 text-xs mt-1">
                {errors.full_name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-lime-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Introduce tu email"
              className="w-full px-3 py-2 rounded-lg form-input"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: { value: /^\S+@\S+$/i, message: "Email no válido" },
              })}
            />
            {errors.email && (
              <p className="text-red-300 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-lime-300 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Crea tu contraseña"
              className="w-full px-3 py-2 rounded-lg form-input"
              {...register("password", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-300 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-lime-300 mb-1">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              placeholder="Confirma tu contraseña"
              className="w-full px-3 py-2 rounded-lg form-input"
              {...register("confirmPassword", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-300 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-lime-300 focus:ring-lime-300 border-lime-300/70 rounded bg-white/10"
              {...register("terms", {
                required: "Debes aceptar los términos y condiciones",
              })}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-white/90">
              Acepto los términos y condiciones
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-300 text-xs mt-1">{errors.terms.message}</p>
          )}

          <button
            type="submit"
            className="w-full font-semibold py-2 px-4 rounded-lg submit-button"
          >
            Crear cuenta
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-white/80 text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-lime-300 underline hover:text-lime-200 font-semibold"
            >
              Inicia sesión
            </Link>
          </p>
          <p className="text-white/80 text-sm mt-2">
            ¿Quieres calcular tu consumo?{" "}
            <Link
              to="/calculator"
              className="text-lime-300 underline hover:text-lime-200 font-semibold"
            >
              Ir a la calculadora
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};