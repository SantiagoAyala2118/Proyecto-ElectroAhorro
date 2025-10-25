// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite"; // <-- 1. IMPORTA EL PLUGIN

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- 2. AÑADE EL PLUGIN AQUÍ
  ],
});
