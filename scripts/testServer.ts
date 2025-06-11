// @ts-nocheck
// scripts/testServer.ts
import path from "path";
import express from "express";
// @ts-ignore
import history from "connect-history-api-fallback"; // Adicione @ts-ignore
import setupProxy from "../src/setupProxy";
import { frontendPort } from "../src/utils/portUtils";

require("dotenv").config();

const app = express();

setupProxy(app);

// CORRIGIDO: Aplicando 'as any' diretamente ao resultado de history()
app.use("/", history() as any);
app.use(express.static(path.join(__dirname, "../build")));

app.listen(frontendPort);
