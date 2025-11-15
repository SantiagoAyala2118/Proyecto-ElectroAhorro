import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar } from '../components/layouts/NavBar'; // Ajusta la ruta de importación según tu estructura

// Importamos los iconos de React Icons que necesitamos
import {
    FaHeart,
    FaRegHeart,
    FaEye,
    FaPlus,
    FaSnowflake,
    FaWifi,
    FaTv,
    FaLightbulb,
    FaMobile,
    FaDesktop,
    FaBolt,
    FaTint,
    FaThermometerHalf,
    FaWind,
    FaShieldAlt,
    FaMemory,
    FaBath,
    FaCoffee,
    FaUmbrellaBeach
} from 'react-icons/fa';
import {
    IoMdSettings,
    IoMdWater,
    IoMdSpeedometer
} from 'react-icons/io';
import {
    GiWashingMachine,
    GiKitchenScale,
    GiElectric
} from 'react-icons/gi';

export const CatalogoElectrodomesticos = () => {
    const navigate = useNavigate();


    // Estado del componente
    const [likedProducts, setLikedProducts] = useState(new Set());
    const [currentCategory, setCurrentCategory] = useState('all');
    const [currentConsumption, setCurrentConsumption] = useState('all');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Datos de ejemplo - electrodomésticos reales con iconos de React Icons
    const electrodomesticos = [
        {
            id: 1,
            name: "Refrigerador Samsung",
            category: "cocina",
            consumption: "alto",
            brand: "Samsung",
            model: "RT38K5932S8",
            description: "Refrigerador side by side con tecnología Digital Inverter",
            consumo: "120 kWh/mes",
            icon: <GiKitchenScale className="text-6xl" />,
            specs: [
                { icon: <IoMdSettings className="text-[#90AFC5]" />, text: "Capacidad: 635L" },
                { icon: <FaSnowflake className="text-[#90AFC5]" />, text: "Tecnología No Frost" },
                { icon: <FaBolt className="text-[#90AFC5]" />, text: "Consumo: 120 kWh/mes" }
            ]
        },
        {
            id: 2,
            name: "Lavadora LG",
            category: "lavanderia",
            consumption: "medio",
            brand: "LG",
            model: "F4V5RGP2S",
            description: "Lavadora carga frontal con motor Direct Drive",
            consumo: "45 kWh/mes",
            icon: <GiWashingMachine className="text-6xl" />,
            specs: [
                { icon: <IoMdSettings className="text-[#90AFC5]" />, text: "Capacidad: 8kg" },
                { icon: <IoMdWater className="text-[#90AFC5]" />, text: "A+++ Eficiencia" },
                { icon: <FaBolt className="text-[#90AFC5]" />, text: "Consumo: 45 kWh/mes" }
            ]
        },
        {
            id: 3,
            name: "Aire Acondicionado",
            category: "climatizacion",
            consumption: "alto",
            brand: "Midea",
            model: "MSMA-12CRN8",
            description: "Aire acondicionado split inverter 12000 BTU",
            consumo: "180 kWh/mes",
            icon: <FaWind className="text-6xl" />,
            specs: [
                { icon: <FaThermometerHalf className="text-[#90AFC5]" />, text: "12000 BTU" },
                { icon: <FaWifi className="text-[#90AFC5]" />, text: "WiFi Control" },
                { icon: <FaBolt className="text-[#90AFC5]" />, text: "Consumo: 180 kWh/mes" }
            ]
        },
        {
            id: 4,
            name: "Televisor OLED",
            category: "entretenimiento",
            consumption: "medio",
            brand: "LG",
            model: "OLED55C3PSA",
            description: "Smart TV OLED 55\" 4K con WebOS",
            consumo: "30 kWh/mes",
            icon: <FaTv className="text-6xl" />,
            specs: [
                { icon: <FaDesktop className="text-[#90AFC5]" />, text: "55\" OLED 4K" },
                { icon: <FaShieldAlt className="text-[#90AFC5]" />, text: "WebOS" },
                { icon: <FaBolt className="text-[#90AFC5]" />, text: "Consumo: 30 kWh/mes" }
            ]
        },
        {
            id: 5,
            name: "Microondas Panasonic",
            category: "cocina",
            consumption: "medio",
            brand: "Panasonic",
            model: "NN-ST67LS",
            description: "Horno microondas con grill y 1100W de potencia",
            consumo: "25 kWh/mes",
            icon: <GiElectric className="text-6xl" />,
            specs: [
                { icon: <FaCoffee className="text-[#90AFC5]" />, text: "Grill Incorporado" },
                { icon: <IoMdSpeedometer className="text-[#90AFC5]" />, text: "1100W" },
                { icon: <FaBolt className="text-[#90AFC5]" />, text: "Consumo: 25 kWh/mes" }
            ]
        },
        {
            id: 6,
            name: "Secadora Electrolux",
            category: "lavanderia",
            consumption: "alto",
            brand: "Electrolux",
            model: "LSE11",
            description: "Secadora de ropa con bomba de calor y 11kg",
            consumo: "85 kWh/mes",
            icon: <FaUmbrellaBeach className="text-6xl" />,
            specs: [
                { icon: <FaBath className="text-[#90AFC5]" />, text: "Capacidad: 11kg" },
                { icon: <FaTint className="text-[#90AFC5]" />, text: "Bomba de Calor" },
                { icon: <FaBolt className="text-[#90AFC5]" />, text: "Consumo: 85 kWh/mes" }
            ]
        },
        {
            id: 7,
            name: "Lámpara LED Smart",
            category: "iluminacion",
            consumption: "bajo",
            brand: "Philips",
            model: "Hue White",
            description: "Bombilla LED inteligente control por app",
            consumo: "5 kWh/mes",
            icon: <FaLightbulb className="text-6xl" />,
            specs: [
                { icon: <FaLightbulb className="text-[#90AFC5]" />, text: "LED 9W" },
                { icon: <FaMobile className="text-[#90AFC5]" />, text: "Control App" },
                { icon: <FaBolt className="text-[#90AFC5]" />, text: "Consumo: 5 kWh/mes" }
            ]
        },
        {
            id: 8,
            name: "Computadora All-in-One",
            category: "oficina",
            consumption: "medio",
            brand: "HP",
            model: "Pavilion 24-ca1010la",
            description: "Computadora todo en uno con procesador Intel Core i5",
            consumo: "40 kWh/mes",
            icon: <FaDesktop className="text-6xl" />,
            specs: [
                { icon: <FaMemory className="text-[#90AFC5]" />, text: "8GB RAM, 512GB SSD" },
                { icon: <FaDesktop className="text-[#90AFC5]" />, text: "23.8\" FHD" },
                { icon: <FaBolt className="text-[#90AFC5]" />, text: "Consumo: 40 kWh/mes" }
            ]
        }
    ];

    // Categorías para filtros
    const categorias = [
        { id: 'all', name: 'Todos' },
        { id: 'cocina', name: 'Cocina' },
        { id: 'lavanderia', name: 'Lavandería' },
        { id: 'climatizacion', name: 'Climatización' },
        { id: 'entretenimiento', name: 'Entretenimiento' },
        { id: 'iluminacion', name: 'Iluminación' },
        { id: 'oficina', name: 'Oficina' }
    ];

    // Niveles de consumo
    const nivelesConsumo = [
        { id: 'all', name: 'Todos' },
        { id: 'bajo', name: 'Bajo' },
        { id: 'medio', name: 'Medio' },
        { id: 'alto', name: 'Alto' }
    ];

    // Función para mostrar toast
    const mostrarToast = (mensaje) => {
        setToastMessage(mensaje);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Función para toggle like
    const toggleLike = (productId) => {
        const nuevosLikes = new Set(likedProducts);
        if (nuevosLikes.has(productId)) {
            nuevosLikes.delete(productId);
            mostrarToast('Eliminado de favoritos');
        } else {
            nuevosLikes.add(productId);
            mostrarToast('Agregado a favoritos');
        }
        setLikedProducts(nuevosLikes);
    };

    // Función para ver detalles (abre modal)
    const verDetalles = (producto) => {
        setSelectedProduct(producto);
        setShowModal(true);
    };

    // Función para agregar al perfil
    const agregarAlPerfil = (producto) => {
        // Aquí iría la lógica para agregar al array del perfil
        mostrarToast(`${producto.name} agregado a tu perfil`);
    };

    // Filtrar productos
    const productosFiltrados = electrodomesticos.filter(producto => {
        const coincideCategoria = currentCategory === 'all' || producto.category === currentCategory;
        const coincideConsumo = currentConsumption === 'all' || producto.consumption === currentConsumption;
        return coincideCategoria && coincideConsumo;
    });

    return (
        <div className="min-h-screen bg-slate-300">
            {/* Usamos tu componente Navbar personalizado */}
            <Navbar />

            {/* Añadimos margen superior para compensar el navbar fijo */}
            <div className="pt-[14vh]">

                {/* Contenido principal */}
                <div className="max-w-7xl mx-auto p-6">
                    {/* Filtros */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-8">
                        <h2 className="text-2xl font-bold text-[#2A3132] mb-6 border-b-2 border-[#763626] pb-3">
                            Filtrar Electrodomésticos
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Filtro por categoría */}
                            <div>
                                <h3 className="text-sm font-semibold text-[#336B87] uppercase tracking-wide mb-3">
                                    Categoría
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {categorias.map((categoria) => (
                                        <button
                                            key={categoria.id}
                                            onClick={() => setCurrentCategory(categoria.id)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${currentCategory === categoria.id
                                                ? 'bg-[#336B87] text-white border border-[#336B87]'
                                                : 'bg-white text-[#2A3132] border border-gray-300'
                                                }`}
                                        >
                                            {categoria.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Filtro por consumo */}
                            <div>
                                <h3 className="text-sm font-semibold text-[#336B87] uppercase tracking-wide mb-3">
                                    Nivel de Consumo
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {nivelesConsumo.map((nivel) => (
                                        <button
                                            key={nivel.id}
                                            onClick={() => setCurrentConsumption(nivel.id)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${currentConsumption === nivel.id
                                                ? 'bg-[#336B87] text-white border border-[#336B87]'
                                                : 'bg-white text-[#2A3132] border border-gray-300'
                                                }`}
                                        >
                                            {nivel.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Grid de productos */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {productosFiltrados.map((producto) => (
                            <div
                                key={producto.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                            >
                                {/* Imagen del producto */}
                                <div className="h-48 bg-gradient-to-br from-[#336B87] to-[#2A3132] flex items-center justify-center relative">
                                    <div className="text-white opacity-90">
                                        {producto.icon}
                                    </div>

                                    {/* Botón de like */}
                                    <button
                                        onClick={() => toggleLike(producto.id)}
                                        className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                                    >
                                        {likedProducts.has(producto.id) ?
                                            <FaHeart className="text-red-500" /> :
                                            <FaRegHeart className="text-gray-400" />
                                        }
                                    </button>
                                </div>

                                {/* Contenido de la tarjeta */}
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="text-lg font-bold text-[#2A3132] mb-2">{producto.name}</h3>
                                    <p className="text-sm text-[#336B87] mb-1">{producto.brand} - {producto.model}</p>
                                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">{producto.description}</p>

                                    {/* Especificaciones */}
                                    <div className="space-y-2 mb-4 flex-1">
                                        {producto.specs.map((spec, index) => (
                                            <div key={index} className="flex items-center space-x-2">
                                                <div className="flex-shrink-0">
                                                    {spec.icon}
                                                </div>
                                                <span className="text-xs text-gray-700">{spec.text}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Botones de acción */}
                                    <div className="flex space-x-2 mt-auto">
                                        <button
                                            onClick={() => verDetalles(producto)}
                                            className="flex-1 py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-1 border border-[#336B87] text-[#336B87] bg-white hover:bg-[#90AFC5] hover:bg-opacity-10 transition-colors duration-200"
                                        >
                                            <FaEye className="text-sm" />
                                            <span>Ver Más</span>
                                        </button>
                                        <button
                                            onClick={() => agregarAlPerfil(producto)}
                                            className="flex-1 py-2 px-3 rounded-lg font-medium text-sm flex items-center justify-center space-x-1 bg-[#763626] text-white hover:bg-[#5a2a1d] transition-colors duration-200"
                                        >
                                            <FaPlus className="text-sm" />
                                            <span>Agregar</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Mensaje si no hay productos */}
                    {productosFiltrados.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-[#2A3132] text-xl font-semibold">
                                No se encontraron electrodomésticos con los filtros seleccionados
                            </div>
                            <button
                                onClick={() => {
                                    setCurrentCategory('all');
                                    setCurrentConsumption('all');
                                }}
                                className="mt-4 px-6 py-2 bg-[#763626] text-white rounded-lg hover:bg-[#5a2a1d] transition-colors duration-200"
                            >
                                Mostrar todos los productos
                            </button>
                        </div>
                    )}
                </div>

                {/* Modal de detalles */}
                {showModal && selectedProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-2xl font-bold text-[#2A3132]">{selectedProduct.name}</h2>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <FaPlus className="transform rotate-45" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gradient-to-br from-[#336B87] to-[#2A3132] rounded-lg h-48 flex items-center justify-center">
                                        <div className="text-white opacity-90">
                                            {selectedProduct.icon}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-[#2A3132] mb-2">Información del Producto</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center">
                                                <span className="font-medium text-[#336B87] w-20">Marca:</span>
                                                <span className="ml-2 text-[#2A3132]">{selectedProduct.brand}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium text-[#336B87] w-20">Modelo:</span>
                                                <span className="ml-2 text-[#2A3132]">{selectedProduct.model}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium text-[#336B87] w-20">Consumo:</span>
                                                <span className="ml-2 text-[#2A3132]">{selectedProduct.consumo}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <span className="font-medium text-[#336B87] w-20">Categoría:</span>
                                                <span className="ml-2 text-[#2A3132] capitalize">{selectedProduct.category}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-[#2A3132] mb-3">Descripción</h3>
                                    <p className="text-gray-700">{selectedProduct.description}</p>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold text-[#2A3132] mb-3">Especificaciones</h3>
                                    <div className="space-y-2">
                                        {selectedProduct.specs.map((spec, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <div className="flex-shrink-0">
                                                    {spec.icon}
                                                </div>
                                                <span className="text-gray-700">{spec.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex space-x-3 mt-6">
                                    <button
                                        onClick={() => {
                                            agregarAlPerfil(selectedProduct);
                                            setShowModal(false);
                                        }}
                                        className="flex-1 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 bg-[#763626] text-white hover:bg-[#5a2a1d] transition-colors duration-200"
                                    >
                                        <FaPlus />
                                        <span>Agregar a Mi Perfil</span>
                                    </button>
                                    <button
                                        onClick={() => toggleLike(selectedProduct.id)}
                                        className="flex-1 py-3 rounded-lg font-medium flex items-center justify-center space-x-2 border border-[#336B87] text-[#336B87] bg-white hover:bg-[#90AFC5] hover:bg-opacity-10 transition-colors duration-200"
                                    >
                                        {likedProducts.has(selectedProduct.id) ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                                        <span>
                                            {likedProducts.has(selectedProduct.id) ? 'Quitar Favorito' : 'Agregar a Favoritos'}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-[#2A3132] text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 z-50 animate-bounce">
                        <FaPlus className="text-[#90AFC5]" />
                        <span>{toastMessage}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

