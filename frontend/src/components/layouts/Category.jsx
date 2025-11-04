import { Heading } from "./Heading";
import CategoriaCocina from "../../assets/images/categoria-cocina.jpg";
import CategoriaComedor from "../../assets/images/categoria-comedor.jpg";
import CategoriaBathtoom from "../../assets/images/categoria-Bathtoom.jpg";
import CategoriaDormitorio from "../../assets/images/categoria-dormitorio.jpg";
import CategoriaLiving from "../../assets/images/categoria-living.jpg";
import CategoriaPatio from "../../assets/images/categoria-patio.jpg";
import { Button } from "../common/Button";

// tu array de elementos siempre va arriba de todo
const categories = [
  {
    id: 1,
    title: "Cocina",
    description:
      "Ahorra energía en la cocina con soluciones eficientes y sostenibles.",
    image: CategoriaCocina,
  },
  {
    id: 2,
    title: "Comedor",
    description:
      "Ahorra energía en el comedor con soluciones eficientes y sostenibles.",
    image: CategoriaComedor,
  },
  {
    id: 3,
    title: "Baño",
    description:
      "Ahorra energía en el baño con soluciones eficientes y sostenibles.",
    image: CategoriaBathtoom,
  },
  {
    id: 4,
    title: "Dormitorio",
    description:
      "Ahorra energía en el dormitorio con soluciones eficientes y sostenibles.",
    image: CategoriaDormitorio,
  },
  {
    id: 5,
    title: "Living",
    description:
      "Ahorra energía en el living con soluciones eficientes y sostenibles.",
    image: CategoriaLiving,
  },
  {
    id: 6,
    title: "Patio",
    description:
      "Ahorra energía en el patio con soluciones eficientes y sostenibles.",
    image: CategoriaPatio,
  },
];

export const Category = () => {
  const renderCards = categories.map((card) => {
    return (
      // no olvides colocar la key para que no se repitan
      <div key={card.id} className="w-1/3 p-4">
        <div className="bg-white border-lime-400 rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 transition-all duration-300">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-48 object-cover rounded-md"
          />
          <h3 className="text-lg font-bold mt-4">{card.title}</h3>
          <p className="text-gray-600 text-sm mt-2">{card.description}</p>
          <Button className="mt-4 bg-lime-400">Ver más</Button>
        </div>
      </div>
    );
  });

  return (
    <section className="py-20 ">
      <Heading highlight="Categoría" heading="de Productos" />

      {/* Aca pones tus cards */}
      <div className="flex flex-wrap justify-center">{renderCards}</div>
    </section>
  );
};
