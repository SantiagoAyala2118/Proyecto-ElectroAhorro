import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import { RouterProvider } from "react-router-dom";
// import { router } from "./routes/index.jsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  );
} else {
  // En desarrollo, si no existe #root esto evita que la app lance un error crasheando todo.
  // Podés quitar este else si preferís que falle explícitamente para detectar el problema.
  // console.error("Root element not found");
}
