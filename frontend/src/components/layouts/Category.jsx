import { Heading } from "./Heading";
import CategoriaCocina from "../../assets/images/categoria-cocina.jpg";
import CategoriaComedor from "../../assets/images/categoria-comedor.jpg";
import CategoriaBathtoom from "../../assets/images/categoria-Bathtoom.jpg";
import CategoriaDormitorio from "../../assets/images/categoria-dormitorio.jpg";
import CategoriaLiving from "../../assets/images/categoria-living.jpg";
import CategoriaPatio from "../../assets/images/categoria-patio.jpg";
import { Button } from "../common/Button";
import { useNavigate } from "react-router-dom";

// ⭐ NUEVAS TARJETAS EXACTAMENTE IGUALES A LAS CATEGORÍAS DEL CATÁLOGO
const categories = [
  {
    id: 1,
    title: "Cocina",
    slug: "cocina",
    description: "Electrodomésticos y artefactos para tu cocina.",
    image: CategoriaCocina,
  },
  {
    id: 2,
    title: "Lavandería",
    slug: "lavanderia",
    description: "Lavarropas, secarropas y equipos de lavado eficientes.",
    image: CategoriaBathtoom, // es lo más parecido, si tenés otra imagen después la cambiamos
  },
  {
    id: 3,
    title: "Climatización",
    slug: "climatizacion",
    description: "Aires, ventiladores, calefacción y control del clima.",
    image: CategoriaPatio, // si tenés imagen especial para clima, me decís
  },
  {
    id: 4,
    title: "Entretenimiento",
    slug: "entretenimiento",
    description: "Televisores, audio, consolas y más.",
    image: CategoriaLiving,
  },
  {
    id: 5,
    title: "Iluminación",
    slug: "iluminacion",
    description: "Luces LED, lámparas y soluciones de iluminación.",
    image: CategoriaDormitorio,
  },
  {
    id: 6,
    title: "Oficina",
    slug: "oficina",
    description: "Equipos para tu espacio de estudio o trabajo.",
    image: CategoriaComedor, // si tenés otra imagen la cambiamos
  },
];

export const Category = () => {
  const navigate = useNavigate();

  const renderCards = categories.map((card) => {
    return (
      <div
        key={card.id}
        className="w-full sm:w-1/2 lg:w-1/3 p-4"
      >
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl p-6 flex flex-col items-center transition-all duration-300 hover:scale-[1.03]">
          
          {/* Imagen */}
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-48 object-cover rounded-xl shadow-md"
          />

          {/* Título */}
          <h3 className="text-2xl font-extrabold mt-4 text-blue-950 tracking-wide">
            {card.title}
          </h3>

          {/* Descripción */}
          <p className="text-gray-600 text-sm mt-2 text-center leading-relaxed">
            {card.description}
          </p>

          {/* BOTÓN → CATÁLOGO */}
          <Button
            onClick={() => navigate(`/catalogo?categoria=${card.slug}`)}
            className="mt-4 px-6 py-2 bg-gradient-to-br from-lime-400 to-blue-950 text-white font-semibold rounded-full shadow-md hover:from-lime-500 hover:to-blue-900 transition-all duration-300"
          >
            Ver más
          </Button>
        </div>
      </div>
    );
  });

  return (
    <section className="py-20 bg-gray-100 text-slate-950">
      <Heading highlight="Categoría" heading="de Productos" />
      <div className="flex flex-wrap justify-center gap-y-6">
        {renderCards}
      </div>
    </section>
  );
};

