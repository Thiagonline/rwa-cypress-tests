#!/usr/bin/env ts-node

import path from "path";
import express from "express";
import history from "connect-history-api-fallback";
import setupProxy from "../src/setupProxy";
import { frontendPort } from "../src/utils/portUtils";

const app = express();

// Aplica o proxy (ex: para redirecionamento de /api)
setupProxy(app);

// Suporte ao React Router (SPA)
app.use("/", history() as express.RequestHandler);

// Servir arquivos estáticos do build (React)
app.use(express.static(path.join(__dirname, "../build")));

// Inicia o servidor
app.listen(frontendPort, () => {
  console.log(`🚀 Frontend rodando em http://localhost:${frontendPort}`);
});
