import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.NODE_ENV === "production"
    ? "/Dbms_Glob/library-management-system/frontend/dist/"
    : "/",
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/students": "http://localhost:5000",
    },
  },
});
