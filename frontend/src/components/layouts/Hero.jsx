import { useState, useEffect } from "react";
import img1 from "../../assets/images/concientizacion1.jpg";
import img2 from "../../assets/images/concientizacion2.jpg";
import img3 from "../../assets/images/concientizacion3.jpg";
import img4 from "../../assets/images/concientizacion4.jpg";
import img5 from "../../assets/images/concientizacion5.jpg";

const slides = [
  {
    image: img1,
    title: " ",
    description: " ",
    url: "/ahorros",
  },
  {
    image: img2,
    title: " ",
    description: " ",
  },
  {
    image: img3,
    title: " ",
    description: " ",
  },
  {
    image: img4,
    title: " ",
    description: " ",
  },
  {
    image: img5,
    title: " ",
    description: " ",
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Efecto para cambiar automáticamente las slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Navegación manual
  const goToSlide = (index) => setCurrentSlide(index);
  const goToNext = () =>
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  const goToPrev = () =>
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );

  return (
    <section className="relative w-full h-[500px] overflow-hidden mt-20 min-w-full">
      {/* Slides */}
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay de contenido */}
            <div className="absolute inset-0 flex flex-col justify-end items-center text-center px-4 pb-9">
              <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mt-2 max-w-2xl">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full"
      >
        &#10095;
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${index === currentSlide ? "bg-white" : "bg-gray-400"
              }`}
          />
        ))}
      </div>
    </section>
  );
};
