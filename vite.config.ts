import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const API_URL = "http://192.168.170.159:5000";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: API_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/socket.io": {
        target: API_URL,
        ws: true,
      },
    },
  },
  plugins: [react()],
});
