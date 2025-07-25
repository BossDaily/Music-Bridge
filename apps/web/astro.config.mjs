import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react({ experimentalReactChildren: true })],
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    port: 4321,
    host: true,
  },
  build: {
    outDir: "dist",
  },
});
