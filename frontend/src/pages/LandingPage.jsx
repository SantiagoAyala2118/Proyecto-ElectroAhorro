import elecctroAHORRO from "../assets/images/elecctroAHORRO.png";

// src/pages/LandingPage.jsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/SpaceBackground.css"; // mismo CSS que usa Login.jsx

/**
 * LandingPage pública (estética adaptada al Login)
 * - Solo rutas públicas: /register y /login
 * - Animaciones por scroll (IntersectionObserver) - misma lógica que antes
 * - Paleta: oscuro espacial + acentos lima (coherente con Login.jsx)
 */

function useScrollReveal(
  selector = ".reveal",
  options = { root: null, rootMargin: "0px", threshold: 0.15 }
) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!els.length) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        if (entry.isIntersecting) {
          target.classList.add("reveal--visible");
          target.classList.remove("reveal--hidden");
        } else {
          // Para que vuelvan a ocultarse al salir (mismo comportamiento que antes)
          target.classList.remove("reveal--visible");
          target.classList.add("reveal--hidden");
        }
      });
    }, options);

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selector, JSON.stringify(options)]);
}

export default function LandingPage() {
  const navigate = useNavigate();
  useScrollReveal();

  const cards = [
    {
      title: "¿Qué es ElectroAhorro?",
      text: "Plataforma para estimar y gestionar el consumo energético en el hogar. Pensada para familias de Formosa con herramientas simples y prácticas.",
    },
    {
      title: "Problema que resolvemos",
      text: "Muchas familias desconocen cuánto consumen sus electrodomésticos y no aplican prácticas de uso eficiente, lo que incrementa la factura.",
    },
    {
      title: "Nuestra solución (MVP)",
      text: "Sitio web con calculadora estimativa, material educativo e información por dispositivo para tomar decisiones que generen ahorro real.",
    },
    {
      title: "Beneficios clave",
      text: "Estimaciones por dispositivo, guías prácticas, fácil de usar y pensado para hogares con recursos limitados.",
    },
    {
      title: "Roadmap resumido",
      text: "Fase 1: Web (MVP) — Registro y calculadora estimativa. Fase 2: App móvil y mejoras (tiempo real y comunidad).",
    },
    {
      title: "Equipo",
      text: "Santiago Ayala (PM & Backend), Lucas Zigarán (Full-Stack & Tester), Leonel Galban (Front & UX). Proyecto estudiantil — apoyo docente.",
    },
  ];

  const handleRegister = () => navigate("/register");
  const handleLogin = () => navigate("/login");

  return (
    <div className="min-h-screen w-full text-white space-background">
      {/* Contenedor central (responsive) */}
      <main className="relative min-h-screen">
        {/* Hero */}
        <header className="max-w-6xl mx-auto px-6 py-14 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            {/* Logo / title similar al Login */}
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-lime-300 drop-shadow-md">
              ElectroAhorro — Ahorra energía, ahorrá dinero
            </h1>
            <p className="mt-4 text-lg text-white/85">
              Herramientas prácticas para estimar el consumo de tus
              electrodomésticos y recibir recomendaciones para reducir la
              factura sin perder confort.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={handleRegister}
                className="px-6 py-3 rounded-lg font-semibold shadow-lg bg-gradient-to-r from-lime-300 to-lime-500 text-slate-900 hover:scale-[1.02] transform transition-all duration-200"
              >
                Registrate gratis
              </button>

              <button
                onClick={handleLogin}
                className="px-6 py-3 rounded-lg border border-lime-300/30 bg-[rgba(255,255,255,0.04)] text-white shadow-sm hover:bg-[rgba(255,255,255,0.06)] transition"
              >
                Iniciar sesión
              </button>
            </div>

            <p className="mt-4 text-sm text-white/60">
              Proyecto enfocado en familias de Formosa — fácil, rápido y sin
              necesidad de equipos especializados.
            </p>
          </div>

          <div className="flex-1">
            {/* Mockup: bloque translucido tipo panel (coherente con Login) */}
            <div className="w-full h-72 rounded-2xl border border-lime-300/10 shadow-inner bg-gradient-to-br from-[rgba(255,255,255,0.03)] to-[rgba(255,255,255,0.01)] flex items-center justify-center">
              <div className="text-center text-white/70">
                <img src={elecctroAHORRO} alt="Electroahorro" />
              </div>
            </div>
          </div>
        </header>

        {/* Cards con reveal */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold text-lime-300 mb-6 text-center">
            Qué ofrecemos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((c, i) => (
              <article
                key={c.title}
                className="reveal reveal--hidden rounded-xl p-6 shadow-lg border border-lime-300/8 bg-[rgba(255,255,255,0.02)] transform transition-all duration-500 ease-out"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h3 className="font-semibold text-lg text-lime-300 mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-white/85 leading-relaxed">
                  {c.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Cómo funciona */}
        <section className="max-w-4xl mx-auto px-6 pb-12">
          <h2 className="text-2xl font-bold text-lime-300 mb-6">
            Cómo funciona (3 pasos)
          </h2>

          <ol className="space-y-6">
            <li className="reveal reveal--hidden p-4 rounded-xl shadow-sm border border-lime-300/8 bg-[rgba(255,255,255,0.02)] transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-lime-300 to-lime-500 text-slate-900 font-bold">
                  1
                </div>
                <div className="w-full items-center">
                  <h4 className="font-semibold text-white">
                    Registrate y creá tu perfil
                  </h4>
                  <p className="text-sm text-white/80">
                    Personalizá estimaciones y guardá cálculos para tu hogar.
                  </p>
                </div>
              </div>
            </li>

            <li className="reveal reveal--hidden p-4 rounded-xl shadow-sm border border-lime-300/8 bg-[rgba(255,255,255,0.02)] transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-lime-300 to-lime-500 text-slate-900 font-bold">
                  2
                </div>
                <div className="w-full items-center">
                  <h4 className="font-semibold text-white">
                    Ingresá tus electrodomésticos
                  </h4>
                  <p className="text-sm text-white/80">
                    Potencia, horas de uso y frecuencia para obtener
                    estimaciones realistas.
                  </p>
                </div>
              </div>
            </li>

            <li className="reveal reveal--hidden p-4 rounded-xl shadow-sm border border-lime-300/8 bg-[rgba(255,255,255,0.02)] transition-all duration-500">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-lime-300 to-lime-500 text-slate-900 font-bold">
                  3
                </div>
                <div className="w-full items-center">
                  <h4 className="font-semibold text-white">
                    Recibí consejos y ahorrá
                  </h4>
                  <p className="text-sm text-white/80">
                    Recomendaciones prácticas y material educativo para mejorar
                    hábitos de consumo.
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </section>

        {/* CTA final */}
        <section className="max-w-5xl mx-auto px-6 pb-12">
          <div className="bg-gradient-to-r from-[rgba(80,100,40,0.95)] to-lime-400/95 text-slate-900 rounded-2xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Empezá a ahorrar hoy</h3>
              <p className="mt-2 text-sm opacity-90">
                Registrate para acceder a estimaciones y guías — tomá decisiones
                informadas para reducir la factura.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleRegister}
                className="px-6 py-3 rounded-lg font-semibold bg-white text-slate-900 hover:scale-[1.02] transform transition duration-200"
              >
                Registrate
              </button>
              <button
                onClick={handleLogin}
                className="px-6 py-3 rounded-lg border border-white bg-transparent text-white hover:bg-white/10 hover:scale-[1.02] transition duration-200"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="max-w-6xl mx-auto px-6 py-8 text-sm text-white/70">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <p className="font-semibold text-lime-300">ElectroAhorro</p>
              <p>Proyecto estudiantil — Formosa</p>
            </div>

            <div className="text-white/75">
              <span className="mr-4">Santiago Ayala</span>
              <span className="mr-4">Lucas Zigarán</span>
              <span>Leonel Galban</span>
            </div>
          </div>
        </footer>

        {/* Reveal styles (igual comportamiento que antes) */}
        <style>{`
          .reveal { opacity: 0; transform: translateY(24px) scale(0.99); }
          .reveal--hidden { opacity: 0; transform: translateY(24px) scale(0.99); }
          .reveal--visible { opacity: 1; transform: translateY(0) scale(1); transition: opacity 550ms cubic-bezier(.2,.9,.2,1), transform 550ms cubic-bezier(.2,.9,.2,1); }
        `}</style>
      </main>
    </div>
  );
}
