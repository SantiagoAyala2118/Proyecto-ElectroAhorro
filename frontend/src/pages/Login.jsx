import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components/SpaceBackground.css";

export const Login = () => {
  const navigate = useNavigate();
  const [lightsOn, setLightsOn] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsTransitioning(true);

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

        // Pequeño delay para mostrar la transición
        setTimeout(() => {
          navigate("/app");
        }, 600);
      } else {
        setIsTransitioning(false);
        alert("Email o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      setIsTransitioning(false);
      alert("Hubo un problema al iniciar sesión");
    }
  };

  const handleNavigateToRegister = (e) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  const handleNavigateToCalculator = (e) => {
    e.preventDefault();
    setIsTransitioning(true);
    setTimeout(() => {
      navigate("/calculator");
    }, 800);
  };

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
      className={`min-h-screen w-screen flex items-center justify-center p-0 m-0 fixed inset-0 overflow-hidden cursor-pointer space-background ${lightsOn ? '' : 'lights-off'} ${isTransitioning ? 'page-transition-out' : 'page-transition-in'}`}
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
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${star.animationDelay}s`
            }}
          />
        ))}
      </div>

      {/* Planeta Tierra - Diferente posición para variar */}
      <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 translate-x-1/2">
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

      {/* Satélites adicionales para hacerlo más interesante */}
      <div className={`satellite satellite-1 ${lightsOn ? '' : 'lights-off'}`} style={{
        top: '25%',
        left: '20%'
      }}></div>
      
      <div className={`satellite satellite-2 ${lightsOn ? '' : 'lights-off'}`} style={{
        bottom: '30%',
        right: '20%'
      }}></div>

      {/* Formulario */}
      <div 
        className="relative z-10 w-full max-w-md form-container px-8 py-8 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-lime-300 mb-3">
            ElectroAhorro
          </h1>
          <p className="text-white/90 text-lg">
            Gestiona tu consumo eléctrico de forma inteligente
          </p>
          <p className="text-white/60 text-sm mt-3">
            💡 Click en el espacio para {lightsOn ? 'apagar' : 'encender'} las luces
          </p>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-lime-300/30"></div>
          <span className="mx-4 text-lime-300 text-sm font-medium">Iniciar Sesión</span>
          <div className="flex-grow border-t border-lime-300/30"></div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-lime-300 mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Introduce tu email"
              className="w-full px-4 py-3 rounded-lg form-input text-white placeholder-white/60"
              required
              disabled={isTransitioning}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-lime-300 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="Introduce tu contraseña"
              className="w-full px-4 py-3 rounded-lg form-input text-white placeholder-white/60"
              required
              disabled={isTransitioning}
            />
          </div>

          <button
            type="submit"
            className={`w-full font-semibold py-3 px-4 rounded-lg submit-button text-lg ${
              isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
            }`}
            disabled={isTransitioning}
          >
            {isTransitioning ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="text-center mt-8 space-y-3">
          <p className="text-white/80 text-sm">
            ¿No tienes una cuenta?{" "}
            <button
              onClick={handleNavigateToRegister}
              className="text-lime-300 underline hover:text-lime-200 font-semibold transition-colors duration-200"
              disabled={isTransitioning}
            >
              Regístrate
            </button>
          </p>
          <p className="text-white/80 text-sm">
            ¿Quieres calcular tu consumo?{" "}
            <button
              onClick={handleNavigateToCalculator}
              className="text-lime-300 underline hover:text-lime-200 font-semibold transition-colors duration-200"
              disabled={isTransitioning}
            >
              Ir a la calculadora
            </button>
          </p>
        </div>

        <div className="text-center mt-8 pt-6 border-t border-lime-300/30">
          <p className="text-white/60 text-sm">
            © 2025 ElectroAhorro. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </div>
  );
};