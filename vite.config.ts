import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint";
import istanbul from "vite-plugin-istanbul";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    define: {
      // Evite sobrescrever todo process.env — use import.meta.env no código do Vite
      "import.meta.env": env,
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: "build",
      sourcemap: true,
    },
    plugins: [
      react(),
      eslint(),
      istanbul({
        cypress: true,
        requireEnv: false,
        exclude: ["node_modules", "cypress", "dist", "coverage"],
        forceBuildInstrument: true,
      }),
    ],
    resolve: {
      alias: {
        // AWS Amplify compatibility
        "./runtimeConfig": "./runtimeConfig.browser",
        "@": path.resolve(__dirname, "src"), // Útil para imports como '@/components/Button'
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setup-tests.js",
      exclude: ["node_modules", "cypress", "dist"],
    },
  };
});
