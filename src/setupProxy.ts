// @ts-nocheck
import { Application } from "express";
import { createProxyMiddleware } from "http-proxy-middleware"; // <- corrigido
import dotenv from "dotenv";

dotenv.config();

export default function setupProxy(app: Application) {
  app.use(
    createProxyMiddleware(["/login", "/callback", "/logout", "/checkAuth", "/graphql"], {
      target: `http://localhost:${process.env.VITE_BACKEND_PORT}`,
      changeOrigin: true,
      logLevel: "debug",
    })
  );
}
