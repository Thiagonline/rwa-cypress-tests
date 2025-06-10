// CORRIGIDO: Usando 'require' para importar createProxyMiddleware
const { createProxyMiddleware } = require("http-proxy-middleware"); // Linha 2
require("dotenv").config();

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/login", "/callback", "/logout", "/checkAuth", "graphql"], {
      target: `http://localhost:${process.env.VITE_BACKEND_PORT}`,
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};
