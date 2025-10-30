import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

export const Registro = () => {
  const navigate = useNavigate();
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
        console.error("Error en el registro:", response.statusText);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const password = watch("password");

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center flex items-center justify-center p-0 m-0 fixed inset-0 overflow-hidden"
      style={{
        backgroundImage: "url(/fondo-login.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md bg-blue-800/50 border-2 border-lime-300 rounded-2xl shadow-xl px-6 py-6 mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-lime-300 mb-2">
            ElectroAhorro
          </h1>
          <p className="text-white">
            Crea tu cuenta para gestionar tu consumo eléctrico
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
              className="w-full px-3 py-2 border border-lime-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-transparent"
              {...register("full_name", {
                required: "Este campo es obligatorio",
              })}
            />
            {errors.full_name && (
              <p className="text-red-500 text-xs mt-1">
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
              className="w-full px-3 py-2 border border-lime-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-transparent"
              {...register("email", {
                required: "Este campo es obligatorio",
                pattern: { value: /^\S+@\S+$/i, message: "Email no válido" },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
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
              className="w-full px-3 py-2 border border-lime-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-transparent"
              {...register("password", {
                required: "Este campo es obligatorio",
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
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
              className="w-full px-3 py-2 border border-lime-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white bg-transparent"
              {...register("confirmPassword", {
                required: "Este campo es obligatorio",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              {...register("terms", {
                required: "Debes aceptar los términos y condiciones",
              })}
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-white">
              Acepto los términos y condiciones
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-lime-300 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 hover:bg-lime-400 hover:text-blue-900"
          >
            Crear cuenta
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-white text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-green-500 underline hover:text-lime-300 font-semibold"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
