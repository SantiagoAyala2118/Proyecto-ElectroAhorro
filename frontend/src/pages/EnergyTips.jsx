import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layouts/NavBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export const EnergyTips = () => {
  const navigate = useNavigate();
  // Estado para manejar qué elementos están expandidos
  const [expandedItems, setExpandedItems] = useState([]);
  // Estado para noticias dinámicas
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Estado para scroll infinito
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Función para alternar la expansión de elementos
  const toggleExpand = (id) => {
    if (expandedItems.includes(id)) {
      setExpandedItems(expandedItems.filter(itemId => itemId !== id));
    } else {
      setExpandedItems([...expandedItems, id]);
    }
  };

  // Función para obtener noticias de NewsAPI
  const fetchNews = async (currentPage = 1, append = false) => {
    if (append) setLoading(false); // No mostrar loading para cargas adicionales
    else setLoading(true);
    setError(null);
    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) {
        throw new Error('Clave de API no configurada. Verifica tu archivo .env.');
      }
      const response = await axios.get(`https://newsapi.org/v2/everything?q=renewable+energy&language=en&sortBy=publishedAt&page=${currentPage}&pageSize=6&apiKey=${apiKey}`);
      const articles = response.data.articles;
      const formattedNews = articles.map((article, index) => ({
        id: (currentPage - 1) * 6 + index + 1, // IDs únicos
        type: 'noticia',
        title: article.title,
        description: article.description || 'Sin descripción disponible.',
        image: article.urlToImage || 'https://via.placeholder.com/800x400?text=Imagen+no+disponible',
        fullContent: article.content || article.description || 'Contenido completo no disponible.'
      }));
      if (append) {
        setNewsItems(prev => [...prev, ...formattedNews]);
      } else {
        setNewsItems(formattedNews);
      }
      if (articles.length < 6) {
        setHasMore(false); // No hay más artículos
      }
    } catch (err) {
      console.error('Error al cargar noticias:', err);
      setError(`Error al cargar las noticias: ${err.message || 'Inténtalo de nuevo más tarde.'}`);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  // Función para cargar más
  const loadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
      fetchNews(page + 1, true);
    }
  };

  // Consejos estáticos (siempre al inicio)
  const staticTips = [
    {
      id: 1,
      type: 'consejo',
      title: 'Optimiza el uso de tu calefacción',
      description: 'Ajusta tu termostato para ahorrar hasta un 10% en tu factura energética.',
      image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      fullContent: 'Reducir la temperatura de tu calefacción en solo 1°C puede representar un ahorro significativo. Programa tu termostato para bajar la temperatura cuando no estés en casa o durante la noche. Además, asegúrate de que tus radiadores estén libres de obstrucciones para una mejor circulación del calor.'
    },
    {
      id: 2,
      type: 'consejo',
      title: 'Aprovecha la luz natural',
      description: 'Reorganiza tus espacios para maximizar el uso de luz solar durante el día.',
      image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      fullContent: 'La luz natural no solo es gratuita, sino que también tiene beneficios para la salud. Mantén las cortinas abiertas durante el día y considera el uso de colores claros en paredes y techos para reflejar mejor la luz. Además, realiza actividades que requieran buena iluminación cerca de ventanas durante las horas de luz.'
    },
    {
      id: 3,
      type: 'consejo',
      title: 'Mantenimiento de electrodomésticos',
      description: 'El cuidado regular de tus electrodomésticos puede reducir su consumo hasta un 15%.',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
      fullContent: 'Limpia regularmente los filtros de tu aire acondicionado y nevera para mantener su eficiencia. Descongela el congelador antes de que la capa de hielo supere los 3mm. Revisa los burletes de puertas de nevera y horno para asegurar un cierre hermético. Estos pequeños mantenimientos pueden prolongar la vida útil de tus electrodomésticos y reducir significativamente su consumo energético.'
    }
  ];

  // Combinar consejos con noticias
  const contentItems = [...staticTips, ...newsItems];

  return (
    <>
      {/* Navbar fijo en la parte superior */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
        <Navbar />
      </div>

      {/* Contenido principal con padding superior para evitar que quede detrás del navbar */}
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 pt-24 pb-8">
        <div className="container mx-auto px-4">
          {/* Encabezado */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Energía Sustentable
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mantente informado sobre las últimas noticias en energías renovables y descubre consejos prácticos para ahorrar energía en tu día a día.
            </p>
          </div>

          {/* Indicador de carga o error */}
          {loading && <p className="text-center text-gray-600">Cargando noticias...</p>}
          {error && (
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => fetchNews()}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Reintentar
              </button>
            </div>
          )}

          {/* Contenido principal con scroll infinito */}
          {!loading && !error && (
            <InfiniteScroll
              dataLength={contentItems.length}
              next={loadMore}
              hasMore={hasMore}
              loader={<p className="text-center text-gray-600">Cargando más noticias...</p>}
              endMessage={<p className="text-center text-gray-600">No hay más noticias.</p>}
            >
              <div className="max-w-6xl mx-auto">
                {contentItems.map((item, index) => {
                  const isEven = index % 2 === 0;
                  const isExpanded = expandedItems.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`mb-16 flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 transition-all duration-500 ${isExpanded ? 'bg-white rounded-2xl p-6 shadow-lg' : ''}`}
                    >
                      {/* Imagen */}
                      <div className={`w-full lg:w-1/2 ${isExpanded ? 'lg:w-2/5' : ''} transition-all duration-500 relative`}>
                        <div
                          className="rounded-xl overflow-hidden shadow-md cursor-pointer transform hover:scale-105 transition-transform duration-300"
                          onClick={() => toggleExpand(item.id)}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-64 object-cover"
                          />
                        </div>
                        {/* Etiqueta de tipo (Noticia/Consejo) */}
                        <div className="absolute top-4 left-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${item.type === 'noticia' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {item.type === 'noticia' ? 'Noticia' : 'Consejo'}
                          </span>
                        </div>
                      </div>

                      {/* Texto */}
                      <div className={`w-full lg:w-1/2 ${isExpanded ? 'lg:w-3/5' : ''} transition-all duration-500`}>
                        <div
                          className="cursor-pointer"
                          onClick={() => toggleExpand(item.id)}
                        >
                          <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-green-700 transition-colors">
                            {item.title}
                          </h2>
                          <p className="text-gray-600 mb-4">
                            {item.description}
                          </p>
                        </div>

                        {/* Contenido expandido */}
                        {isExpanded && (
                          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-100">
                            <p className="text-gray-700 mb-4">
                              {item.fullContent}
                            </p>
                            <button
                              onClick={() => toggleExpand(item.id)}
                              className="text-green-600 hover:text-green-800 font-medium flex items-center"
                            >
                              <span>Leer menos</span>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        )}

                        {/* Botón para expandir cuando no está expandido */}
                        {!isExpanded && (
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="text-green-600 hover:text-green-800 font-medium flex items-center mt-2"
                          >
                            <span>Leer más</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </InfiniteScroll>
          )}

          {/* Sección de estadísticas */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
              Impacto del Ahorro Energético
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">30%</div>
                <p className="text-gray-600">Reducción promedio en el consumo con nuestros consejos</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">5M</div>
                <p className="text-gray-600">Toneladas de CO₂ evitadas anualmente</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl font-bold text-green-600 mb-2">85%</div>
                <p className="text-gray-600">De usuarios reportan ahorro en sus facturas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

