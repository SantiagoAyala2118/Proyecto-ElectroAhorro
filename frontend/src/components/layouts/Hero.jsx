import { useState, useEffect } from "react";
import img1 from "../../assets/images/concientizacion1.2.jpg";
import img2 from "../../assets/images/concientizacion1.3.jpg";
import img3 from "../../assets/images/concientizacion1.4.jpg";
import img4 from "../../assets/images/concientizacion1.5.jpg";
import img5 from "../../assets/images/concientizacion1.6.jpg";

const slides = [
  { image: img1, title: "", description: "" },
  { image: img2, title: "", description: "" },
  { image: img3, title: "", description: "" },
  { image: img4, title: "", description: "" },
  { image: img5, title: "", description: "" },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const goToNext = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  const goToPrev = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full mt-[20vh] flex justify-center">
      <div className="
        relative w-full max-w-7xl h-[450px] md:h-[520px]
        rounded-3xl overflow-hidden shadow-2xl">

        {/* SLIDES */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`
              absolute inset-0 transition-all duration-[1200ms] 
              ${index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"}
            `}
          >
            <img
              src={slide.image}
              alt=""
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        ))}

        {/* FLECHA IZQUIERDA */}
        <button
          onClick={goToPrev}
          className="absolute top-1/2 left-5 -translate-y-1/2 
          bg-white/80 hover:bg-white text-blue-900 shadow-lg
          w-10 h-10 flex items-center justify-center rounded-full
          transition z-20"
        >
          ‹
        </button>

        {/* FLECHA DERECHA */}
        <button
          onClick={goToNext}
          className="absolute top-1/2 right-5 -translate-y-1/2 
          bg-white/80 hover:bg-white text-blue-900 shadow-lg
          w-10 h-10 flex items-center justify-center rounded-full
          transition z-20"
        >
          ›
        </button>

        {/* INDICADORES */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`
                w-3 h-3 rounded-full transition
                ${index === currentSlide ? "bg-blue-950 scale-125" : "bg-gray-400"}
              `}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

