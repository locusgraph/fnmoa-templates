import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // In development the API runs with `npm run preview`; the app reaches it here.
  server: { proxy: { "/api": "http://localhost:8787" } },
});
