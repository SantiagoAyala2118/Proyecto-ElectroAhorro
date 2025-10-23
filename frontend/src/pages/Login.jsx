import { useNavigate, Link } from "react-router-dom";

export const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Capturamos los valores de los campos del formulario
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email");
        const password = formData.get("password");

        // * Fetch para contactarse con la API
        try {
            // Enviamos los datos al backend
            const response = await fetch("http://localhost:4000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Inicio de sesión exitoso:", data);

                navigate("/app");
            } else {
                alert("Email o contraseña incorrectos");
            }
        } catch (error) {
            console.error("Error en la conexión:", error);
            alert("Hubo un problema al iniciar sesión");
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: "url(/fondo-login.jpg)" }}
        >
            <div className="bg-blue-800/50 rounded-2xl border-2 border-solid border-lime-300 shadow-xl px-7 py-3 w-100 max-w-md mt-2">
                <div className="p-4">
                    <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold text-lime-300 mb-2">
                            ElectroAhorro
                        </h1>
                        <p className="text-white">
                            Gestiona tu consumo eléctrico de forma inteligente.
                        </p>
                    </div>

                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-dark-300 text-sm">o</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-lime-300 mb-1"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-3 border border-lime-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white bg-transparent"
                                placeholder="Introduce tu email"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-lime-300 mb-1"
                            >
                                Contraseña
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="w-full px-4 py-3 border border-lime-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-white bg-transparent"
                                placeholder="Introduce tu contraseña"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-lime-300 font-semibold py-3 px-4 rounded-lg transition-colors duration-100 transform hover:scale-105 hover:bg-lime-400 hover:text-blue-900"
                        >
                            Iniciar sesión
                        </button>
                    </form>

                    <div className="text-center mt-6">
                        <p className="mt-4 text-sm text-white">
                            ¿No tienes una cuenta?
                            <Link
                                to="/"
                                className="text-green-500 underline hover:text-lime-300 font-semibold ml-1"
                            >
                                Regístrate
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="text-center mt-3 pt-6 border-t border-gray-200">
                    <p className="text-white text-sm">
                        © 2025 ElectroAhorro. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </div>
    );
};
