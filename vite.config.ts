import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

const API_URL = "http://192.168.173.159:5000";
const SOCKET_URL = "http://192.168.173.159:4567";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
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
