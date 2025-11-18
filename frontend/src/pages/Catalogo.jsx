import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar } from '../components/layouts/NavBar';
import { useElectrodomesticos } from '../hooks/useElectrodomesticos';

import {
    FaHeart, FaRegHeart, FaEye, FaPlus, FaSnowflake, FaWifi, FaTv, FaLightbulb,
    FaMobile, FaDesktop, FaBolt, FaTint, FaThermometerHalf, FaWind, FaShieldAlt,
    FaMemory, FaBath, FaCoffee, FaUmbrellaBeach
} from 'react-icons/fa';
import { IoMdSettings, IoMdWater, IoMdSpeedometer } from 'react-icons/io';
import { GiWashingMachine, GiKitchenScale, GiElectric } from 'react-icons/gi';

const getIconComponent = (iconName, className = "") => {
    const icons = {
        FaHeart, FaRegHeart, FaEye, FaPlus, FaSnowflake, FaWifi, FaTv,
        FaLightbulb, FaMobile, FaDesktop, FaBolt, FaTint, FaThermometerHalf,
        FaWind, FaShieldAlt, FaMemory, FaBath, FaCoffee, FaUmbrellaBeach,
        IoMdSettings, IoMdWater, IoMdSpeedometer,
        GiWashingMachine, GiKitchenScale, GiElectric
    };

    const IconComponent = icons[iconName];
    return IconComponent ? <IconComponent className={className} /> : <FaBolt className={className} />;
};

export const CatalogoElectrodomesticos = () => {
    const navigate = useNavigate();
    const { electrodomesticos, loading, error } = useElectrodomesticos();

    const [likedProducts, setLikedProducts] = useState(new Set());
    const [addedToProfile, setAddedToProfile] = useState(new Set());
    const [currentCategory, setCurrentCategory] = useState('all');
    const [currentConsumption, setCurrentConsumption] = useState('all');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const categorias = [
        { id: 'all', name: 'Todos' },
        { id: 'cocina', name: 'Cocina' },
        { id: 'lavanderia', name: 'Lavandería' },
        { id: 'climatizacion', name: 'Climatización' },
        { id: 'entretenimiento', name: 'Entretenimiento' },
        { id: 'iluminacion', name: 'Iluminación' },
        { id: 'oficina', name: 'Oficina' }
    ];

    const nivelesConsumo = [
        { id: 'all', name: 'Todos' },
        { id: 'bajo', name: 'Bajo' },
        { id: 'medio', name: 'Medio' },
        { id: 'alto', name: 'Alto' }
    ];

    useEffect(() => {
        const fetchUserAppliances = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/user-appliances', {
                    credentials: 'include',
                });
                if (res.ok) {
                    const data = await res.json();
                    const addedIds = new Set(data.appliances.map(ap => ap.appliance_id));
                    setAddedToProfile(addedIds);
                }
            } catch (err) {
                console.error('Error obteniendo electrodomésticos del usuario:', err);
            }
        };
        fetchUserAppliances();
    }, []);

    const mostrarToast = (mensaje) => {
        setToastMessage(mensaje);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    const toggleLike = (productId) => {
        const nuevos = new Set(likedProducts);
        if (nuevos.has(productId)) {
            nuevos.delete(productId);
            mostrarToast('Eliminado de favoritos');
        } else {
            nuevos.add(productId);
            mostrarToast('Agregado a favoritos');
        }
        setLikedProducts(nuevos);
    };

    const toggleAddToProfile = async (productId) => {
        const isAdded = addedToProfile.has(productId);
        try {
            if (isAdded) {
                const res = await fetch(`http://localhost:4000/api/user-appliances/${productId}`, {
                    method: 'DELETE',
                    credentials: 'include',
                });
                if (res.ok) {
                    setAddedToProfile(prev => {
                        const newSet = new Set(prev);
                        newSet.delete(productId);
                        return newSet;
                    });
                    mostrarToast('Eliminado del perfil');
                }
            } else {
                const res = await fetch('http://localhost:4000/api/user-appliances', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ appliance_id: productId }),
                });
                if (res.ok) {
                    setAddedToProfile(prev => new Set(prev).add(productId));
                    mostrarToast('Agregado al perfil');
                }
            }
        } catch (err) {
            console.error(err);
            mostrarToast('Error de conexión');
        }
    };

    const productosFiltrados = electrodomesticos.filter(producto => {
        const filtraCategoria = currentCategory === 'all' || producto.category === currentCategory;
        const filtraConsumo = currentConsumption === 'all' || producto.consumption === currentConsumption;
        return filtraCategoria && filtraConsumo;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 text-blue-900 flex items-center justify-center">
                <Navbar />
                <div className="pt-[14vh] text-2xl font-semibold">Cargando electrodomésticos...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 text-red-700 flex items-center justify-center">
                <Navbar />
                <div className="pt-[14vh] text-xl">Error al cargar los electrodomésticos</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 text-slate-950">
            <Navbar />

            <div className="pt-[14vh] max-w-7xl mx-auto p-6">

                {/* Filtros */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 mb-10 hover:shadow-xl transition-all duration-300">
                    <h2 className="text-3xl font-extrabold text-blue-950 mb-6 border-b-2 border-lime-400 pb-2 tracking-wide">
                        Filtrar Electrodomésticos
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Categoria */}
                        <div>
                            <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-3">
                                Categoría
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {categorias.map((categoria) => (
                                    <button
                                        key={categoria.id}
                                        onClick={() => setCurrentCategory(categoria.id)}
                                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm
                                            ${currentCategory === categoria.id
                                                ? "bg-gradient-to-br from-lime-400 to-blue-950 text-white shadow-md scale-105"
                                                : "bg-white text-blue-900 border border-gray-300 hover:border-blue-950"
                                            }`}
                                    >
                                        {categoria.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Consumo */}
                        <div>
                            <h3 className="text-sm font-semibold text-blue-900 uppercase tracking-wide mb-3">
                                Nivel de Consumo
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {nivelesConsumo.map((nivel) => (
                                    <button
                                        key={nivel.id}
                                        onClick={() => setCurrentConsumption(nivel.id)}
                                        className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm
                                            ${currentConsumption === nivel.id
                                                ? "bg-gradient-to-br from-lime-400 to-blue-950 text-white shadow-md scale-105"
                                                : "bg-white text-blue-900 border border-gray-300 hover:border-blue-950"
                                            }`}
                                    >
                                        {nivel.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* GRID DE PRODUCTOS */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                    {productosFiltrados.map((producto) => (
                        <div
                            key={producto.id}
                            className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 flex flex-col"
                        >

                            {/* Imagen */}
                            <div className="h-48 bg-gradient-to-br from-lime-400 to-blue-950 rounded-t-2xl flex items-center justify-center relative shadow-inner">
                                <div className="text-white opacity-90">
                                    {getIconComponent(producto.icon, "text-6xl")}
                                </div>

                                {/* Like */}
                                <button
                                    onClick={() => toggleLike(producto.id)}
                                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
                                >
                                    {likedProducts.has(producto.id)
                                        ? <FaHeart className="text-red-500" />
                                        : <FaRegHeart className="text-gray-500" />
                                    }
                                </button>

                                {/* Add */}
                                <button
                                    onClick={() => toggleAddToProfile(producto.id)}
                                    className="absolute top-3 left-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition"
                                >
                                    <FaPlus className={addedToProfile.has(producto.id) ? "text-green-500" : "text-gray-500"} />
                                </button>
                            </div>

                            {/* CONTENIDO */}
                            <div className="p-5 flex flex-col flex-1">
                                <h3 className="text-xl font-bold text-blue-950">{producto.name}</h3>
                                <p className="text-sm text-blue-800 mb-2">{producto.brand} – {producto.model}</p>
                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{producto.description}</p>

                                <div className="space-y-2 flex-1">
                                    {producto.specs.map((spec, index) => (
                                        <div key={index} className="flex items-center space-x-2">
                                            {getIconComponent(spec.icon, "text-blue-900")}
                                            <span className="text-sm text-gray-700">{spec.text}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <button
                                        onClick={() => {
                                            setSelectedProduct(producto);
                                            setShowModal(true);
                                        }}
                                        className="flex-1 py-2 rounded-xl border border-blue-900 text-blue-900 font-semibold hover:bg-blue-50 transition"
                                    >
                                        <FaEye className="inline-block mr-1" />
                                        Ver más
                                    </button>

                                    <button
                                        onClick={() => toggleAddToProfile(producto.id)}
                                        className="flex-1 py-2 rounded-xl text-white font-semibold bg-gradient-to-br from-lime-400 to-blue-950 shadow-md hover:from-lime-500 hover:to-blue-900"
                                    >
                                        <FaPlus className="inline-block mr-1" />
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SIN RESULTADOS */}
                {productosFiltrados.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-2xl text-blue-900 font-bold">
                            No se encontraron electrodomésticos
                        </p>
                    </div>
                )}

                {/* MODAL */}
                {showModal && selectedProduct && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] shadow-2xl border border-gray-200 overflow-y-auto">
                            <div className="p-6">

                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-3xl font-extrabold text-blue-950">
                                        {selectedProduct.name}
                                    </h2>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-500 hover:text-gray-700 transition"
                                    >
                                        <FaPlus className="rotate-45 text-2xl" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div className="bg-gradient-to-br from-lime-400 to-blue-950 rounded-xl h-48 flex items-center justify-center shadow-inner">
                                        {getIconComponent(selectedProduct.icon, "text-7xl text-white opacity-90")}
                                    </div>

                                    <div className="space-y-2">
                                        <p><span className="font-bold text-blue-900">Marca:</span> {selectedProduct.brand}</p>
                                        <p><span className="font-bold text-blue-900">Modelo:</span> {selectedProduct.model}</p>
                                        <p><span className="font-bold text-blue-900">Consumo:</span> {selectedProduct.consumo}</p>
                                        <p><span className="font-bold text-blue-900">Categoría:</span> {selectedProduct.category}</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-xl font-extrabold text-blue-950 mb-2">Descripción</h3>
                                    <p className="text-gray-700">{selectedProduct.description}</p>
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-xl font-extrabold text-blue-950 mb-3">Especificaciones</h3>
                                    <div className="space-y-2">
                                        {selectedProduct.specs.map((spec, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                {getIconComponent(spec.icon, "text-blue-900")}
                                                <span className="text-gray-700">{spec.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-8">
                                    <button
                                        onClick={() => toggleAddToProfile(selectedProduct.id)}
                                        className="flex-1 py-3 rounded-xl text-white font-semibold bg-gradient-to-br from-lime-400 to-blue-950 shadow-md hover:from-lime-500 hover:to-blue-900"
                                    >
                                        {addedToProfile.has(selectedProduct.id)
                                            ? "Quitar del Perfil"
                                            : "Agregar al Perfil"
                                        }
                                    </button>
                                    <button
                                        onClick={() => toggleLike(selectedProduct.id)}
                                        className="flex-1 py-3 rounded-xl border border-blue-900 text-blue-900 font-semibold hover:bg-blue-50 transition"
                                    >
                                        {likedProducts.has(selectedProduct.id)
                                            ? "Quitar Favorito"
                                            : "Agregar a Favoritos"
                                        }
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

                {showToast && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-blue-950 text-white px-6 py-3 rounded-xl shadow-xl z-50 animate-bounce flex items-center gap-2">
                        <FaPlus className="text-lime-400" />
                        <span>{toastMessage}</span>
                    </div>
                )}

            </div>
        </div>
    );
};

export const Catalogo = CatalogoElectrodomesticos;
