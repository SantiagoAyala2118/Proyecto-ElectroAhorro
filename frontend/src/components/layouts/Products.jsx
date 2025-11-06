import { Heading } from "../layouts/Heading";

export const Products = () => {
  const categories = [
    "Cocina",
    "Comedor",
    "Baño",
    "Dormitorio",
    "Living",
    "Patio",
  ];

  return (
    <section>
      <div className="max-w-[1400px] mx-auto px-10 py-20">
        <Heading highlight="Tus" heading="Productos" />

        {/* Tabs */}
      </div>
    </section>
  );
};
