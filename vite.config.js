import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  base:'/accounts.skinalyze/',
  build: {
    rollupOptions: {
      input: {
        main: "index.html",              
        forgot: "forgot-password.html",
      },
    },
  },
});
