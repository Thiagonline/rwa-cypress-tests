import { Application } from "express";
// CORRIGIDO: Usando 'require' para importar createProxyMiddleware
const { createProxyMiddleware } = require("http-proxy-middleware");
import dotenv from "dotenv";

dotenv.config();

export default function setupProxy(app: Application) {
  app.use(
    createProxyMiddleware(
      ["/login", "/callback", "/logout", "/checkAuth", "/graphql"], // '/graphql' corrigido já estava
      {
        target: `http://localhost:${process.env.VITE_BACKEND_PORT}`,
        changeOrigin: true,
        logLevel: "debug",
      }
    )
  );
}
