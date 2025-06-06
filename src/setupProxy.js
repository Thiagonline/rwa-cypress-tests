const createProxyMiddleware = require("http-proxy-middleware");
require("dotenv").config();

module.exports = function (app) {
  app.use(
    createProxyMiddleware(["/login", "/callback", "/logout", "/checkAuth", "graphql"], {
      // CORREÇÃO: Usar VITE_BACKEND_PORT, que é o nome correto da variável no .env
      target: `http://localhost:${process.env.VITE_BACKEND_PORT}`, 
      changeOrigin: true,
      logLevel: "debug",
    })
  );
};