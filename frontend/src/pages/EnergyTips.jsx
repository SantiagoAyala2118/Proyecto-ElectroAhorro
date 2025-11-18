import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components/layouts/NavBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';

export const EnergyTips = () => {
  const navigate = useNavigate();

  const [expandedItems, setExpandedItems] = useState([]);
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const toggleExpand = (id) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const fetchNews = async (currentPage = 1, append = false) => {
    if (!append) setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
      if (!apiKey) throw new Error("Falta VITE_NEWS_API_KEY en tu .env");

      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=renewable+energy&language=en&sortBy=publishedAt&page=${currentPage}&pageSize=6&apiKey=${apiKey}`
      );

      const formatted = res.data.articles.map((a, i) => ({
        id: (currentPage - 1) * 6 + i + 1,
        type: "noticia",
        title: a.title,
        description: a.description || "Sin descripción disponible.",
        image: a.urlToImage || "https://via.placeholder.com/800x400?text=Sin+imagen",
        fullContent: a.content || a.description || "Contenido no disponible."
      }));

      setNewsItems((prev) => (append ? [...prev, ...formatted] : formatted));

      if (formatted.length < 6) setHasMore(false);
    } catch (e) {
      setError("Error cargando noticias.");
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const loadMore = () => {
    if (!hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchNews(nextPage, true);
  };

  const staticTips = [
    {
      id: 1,
      type: "consejo",
      title: "Optimiza el uso de calefacción",
      description: "Ajusta tu termostato para ahorrar hasta un 10%.",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=800&q=80",
      fullContent:
        "Reducir 1°C en tu calefacción ahorra energía. Programa horarios inteligentes."
    },
    {
      id: 2,
      type: "consejo",
      title: "Aprovecha la luz natural",
      description: "Usa colores claros y ubicá escritorios cerca de ventanas.",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=800&q=80",
      fullContent:
        "La luz natural reduce el uso de lámparas y mejora el bienestar."
    },
    {
      id: 3,
      type: "consejo",
      title: "Cuida tus electrodomésticos",
      description: "Un buen mantenimiento reduce hasta un 15% del consumo.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
      fullContent:
        "Limpia filtros, revisa burletes y descongela heladeras."
    }
  ];

  const contentItems = [...staticTips, ...newsItems];

  return (
    <>
      {/* Navbar fijo */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navbar />
      </div>

      {/* Fondo general */}
      <div className="min-h-screen bg-gradient-to-b from-lime-50 via-blue-50 to-blue-100 pt-24 pb-16">

        {/* Encabezado */}
        <div className="text-center mb-16 px-4">
          <h1 className="text-4xl font-extrabold text-blue-950 tracking-wide drop-shadow-sm">
            Energía Sustentable
          </h1>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto mt-4">
            Noticias sobre energía renovable y consejos prácticos para ahorrar en el día a día.
          </p>
        </div>

        {/* Errores / Loading */}
        {loading && <p className="text-center text-blue-950 font-medium">Cargando noticias...</p>}

        {error && (
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => fetchNews()}
              className="px-6 py-2 bg-gradient-to-br from-lime-400 to-blue-950 text-white rounded-xl font-semibold shadow-md hover:scale-105 transition-all"
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Scroll infinito */}
        {!loading && !error && (
          <InfiniteScroll
            dataLength={contentItems.length}
            next={loadMore}
            hasMore={hasMore}
            loader={<p className="text-center mt-4 text-blue-800">Cargando más...</p>}
            endMessage={<p className="text-center mt-4 text-blue-800">No hay más noticias.</p>}
          >
            <div className="max-w-6xl mx-auto px-4">
              {contentItems.map((item, index) => {
                const isEven = index % 2 === 0;
                const isExpanded = expandedItems.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className={`mb-20 flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-10
                      ${isExpanded ? "bg-white rounded-3xl p-6 shadow-xl border border-blue-100 scale-[1.01]" : "transition-all"}
                    `}
                  >

                    {/* Imagen */}
                    <div className="w-full lg:w-1/2 relative">
                      <div
                        onClick={() => toggleExpand(item.id)}
                        className="rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:scale-[1.03] transition-transform"
                      >
                        <img src={item.image} alt={item.title} className="w-full h-72 object-cover" />
                      </div>

                      {/* Etiqueta */}
                      <span
                        className={`absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-semibold shadow-md 
                        ${item.type === "noticia"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-lime-100 text-lime-800"
                        }`}
                      >
                        {item.type === "noticia" ? "Noticia" : "Consejo"}
                      </span>
                    </div>

                    {/* Texto */}
                    <div className="w-full lg:w-1/2">
                      <h2
                        onClick={() => toggleExpand(item.id)}
                        className="text-3xl font-extrabold text-blue-950 mb-3 cursor-pointer hover:text-lime-600 transition-colors"
                      >
                        {item.title}
                      </h2>

                      <p className="text-slate-700 mb-4 cursor-pointer" onClick={() => toggleExpand(item.id)}>
                        {item.description}
                      </p>

                      {/* Expandido */}
                      {isExpanded && (
                        <div className="bg-lime-50 p-4 rounded-xl border border-lime-200 shadow-inner">
                          <p className="text-slate-700">{item.fullContent}</p>

                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="mt-4 text-blue-900 hover:text-blue-700 font-semibold flex items-center"
                          >
                            Leer menos
                            <span className="ml-1">▲</span>
                          </button>
                        </div>
                      )}

                      {!isExpanded && (
                        <button
                          onClick={() => toggleExpand(item.id)}
                          className="text-blue-900 hover:text-blue-700 font-semibold flex items-center mt-2"
                        >
                          Leer más
                          <span className="ml-1">▼</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </InfiniteScroll>
        )}

        {/* Estadísticas finales */}
        <div className="mt-20 max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-10 border border-slate-200">
          <h2 className="text-center text-3xl font-extrabold text-blue-950 mb-10 tracking-wide">
            Impacto del Ahorro Energético
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-4">
              <p className="text-4xl font-extrabold text-lime-600">30%</p>
              <p className="mt-2 text-slate-700">Reducción promedio con buenos hábitos</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-extrabold text-blue-600">5M</p>
              <p className="mt-2 text-slate-700">Toneladas de CO₂ evitadas</p>
            </div>
            <div className="p-4">
              <p className="text-4xl font-extrabold text-lime-600">85%</p>
              <p className="mt-2 text-slate-700">Usuarios que reportan ahorro</p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
