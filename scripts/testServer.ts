import path from "path";
import express from "express";
import history from "connect-history-api-fallback";
import setupProxy from "../src/setupProxy";
import { frontendPort } from "../src/utils/portUtils";

const app = express();

setupProxy(app);

// CORRIGIDO: Aplicando 'as any' diretamente ao resultado de history()
app.use("/", history() as any); // Linha 15
app.use(express.static(path.join(__dirname, "../build")));

app.listen(frontendPort);
