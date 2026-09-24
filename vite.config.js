import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    strictPort: true,
    hmr: {
      port: 3000,
    },
    // Em dev, encaminha /api para o mock das serverless functions (npm run dev:api).
    // Em produção as rotas /api são servidas pela Vercel (api/*.ts).
    proxy: {
      "/api": "http://localhost:8787",
    },
  },
});
