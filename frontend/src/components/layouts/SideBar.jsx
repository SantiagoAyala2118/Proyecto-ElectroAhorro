import { useNavigate } from "react-router-dom";
import {
  UserRound,
  Home,
  Plug,
  Calculator,
  Settings,
  LogOut,
} from "lucide-react";

export const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "profile", label: "Mi Perfil", icon: <UserRound size={20} />, path: "/user/profile" },
    { id: "inicio", label: "Home", icon: <Home size={20} />, path: "/app" },
    { id: "Catalogo", label: "Catálogo", icon: <Plug size={20} />, path: "/catalogo" },
    { id: "calculadora", label: "Calculadora", icon: <Calculator size={20} />, path: "/calculator" },
    { id: "settings", label: "Configuración", icon: <Settings size={20} />, path: "/settings" },
  ];

  const handleNavigation = (item) => {
    setActiveSection(item.id);
    navigate(item.path);
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-blue-950 text-white h-screen fixed left-0 top-0 shadow-xl">
      {/* Header */}
      <div className="p-6 border-b border-lime-400">
        <h1 className="text-2xl font-bold text-lime-400">ElectroAhorro</h1>
        <p className="text-sm text-white opacity-80">Control de Consumo</p>
      </div>

      {/* Menú */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`w-full flex items-center space-x-4 p-3 rounded-lg mb-2 transition-all duration-200 ${
              activeSection === item.id
                ? "bg-lime-500 text-white shadow-md"
                : "text-lime-400 hover:bg-slate-500 hover:text-white"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 w-full p-4 border-t border-[#336B87]">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-lg text-lime-400 hover:bg-slate-500 hover:text-white transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};
