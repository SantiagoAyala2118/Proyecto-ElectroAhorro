import { useNavigate } from "react-router-dom";

// Componente Sidebar
export const Sidebar = ({ activeSection, setActiveSection }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'profile', label: 'Mi Perfil', icon: '👤', path: '/user/profile' },
    { id: 'inicio', label: 'Home', icon: '📊', path: '/app' },
    { id: 'Catalogo', label: 'Catalogo', icon: '🔌', path: '/catalogo' },
    { id: 'calculadora', label: 'calculadora', icon: '📈', path: '/calculator' },
    { id: 'settings', label: 'Configuración', icon: '⚙️', path: '/settings' },
  ];

  const handleNavigation = (item) => {
    // Actualizar la sección activa
    setActiveSection(item.id);
    // Navegar a la ruta correspondiente
    navigate(item.path);
  };

  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
    // Redirigir al login
    navigate('/login');
  };

  return (
    <div className="w-64 bg-[#2A3132] text-white h-screen fixed left-0 top-0 shadow-xl">
      {/* Logo/Header del Sidebar - EXACTAMENTE IGUAL */}
      <div className="p-6 border-b border-[#336B87]">
        <h1 className="text-2xl font-bold text-[#90AFC5]">EnergyTrack</h1>
        <p className="text-sm text-[#90AFC5] opacity-80">Control de Consumo</p>
      </div>

      {/* Menú de Navegación - MISMOS ESTILOS VISUALES */}
      <nav className="p-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavigation(item)}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-all duration-200 ${
              activeSection === item.id
                ? 'bg-[#763626] text-white shadow-md'
                : 'text-[#90AFC5] hover:bg-[#336B87] hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer del Sidebar - IDÉNTICO AL ORIGINAL */}
      <div className="absolute bottom-0 w-full p-4 border-t border-[#336B87]">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 p-3 rounded-lg text-[#90AFC5] hover:bg-[#336B87] hover:text-white transition-all duration-200"
        >
          <span className="text-xl">🚪</span>
          <span className="font-medium">Cerrar Sesión</span>
        </button>
      </div>
    </div>
  );
};