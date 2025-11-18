import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Home,
  Plug,
  Calculator,
  Settings,
  LogOut,
  Sparkles,
} from "lucide-react";

export const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "profile",
      label: "Mi Perfil",
      icon: <UserRound size={22} />,
      path: "/user/profile",
    },
    {
      id: "inicio",
      label: "Inicio",
      icon: <Home size={22} />,
      path: "/home",
    },
    {
      id: "Catalogo",
      label: "Catálogo",
      icon: <Plug size={22} />,
      path: "/catalogo",
    },
    {
      id: "ahorro",
      label: "Ahorro",
      icon: <Sparkles size={22} />,
      path: "/energytips",
    },
    {
      id: "calculadora",
      label: "Calculadora",
      icon: <Calculator size={22} />,
      path: "/calculator",
    },
    {
      id: "settings",
      label: "Configuración",
      icon: <Settings size={22} />,
      path: "/settings",
    },
  ];

  const handleNavigation = (item) => {
    setActiveSection(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    alert("Cerrando sesión... Nos vemos pronto");
    localStorage.removeItem("isLogged");
    navigate("/login");
  };

  return (
    <div
      className="
        w-72 h-screen fixed left-0 top-0 z-40
        bg-slate-950
        border-r border-slate-800
        text-white
        flex flex-col
      "
    >
      {/* HEADER */}
      <div className="p-8 border-b border-slate-800">
        <h1 className="text-3xl font-extrabold text-lime-400">
          ElectroAhorro
        </h1>
        <p className="text-sm opacity-80 mt-1 tracking-wide">
          Control de Consumo
        </p>
      </div>

      {/* MENU */}
      <nav className="p-6 space-y-3 flex-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`
              w-full flex items-center space-x-4
              p-4 rounded-xl text-lg font-semibold
              transition-all duration-200

              ${
                activeSection === item.id
                  ? "bg-lime-500 text-slate-900"
                  : "text-lime-400 hover:bg-slate-800 hover:text-white"
              }
            `}
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="p-6 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="
            w-full flex items-center space-x-3 
            p-4 rounded-xl text-lg font-semibold
            text-red-400 hover:bg-slate-800 hover:text-white
            transition-all duration-200
          "
        >
          <LogOut size={22} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};

