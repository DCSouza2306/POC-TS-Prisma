import express from "express";
import { json } from "express";
import dotven from "dotenv";
import vehiclesRouter from "./router/vehicles-router";
import modelsRouter from "./router/models-router";
dotven.config();

const app = express();
app.use(json());
app.use("/vehicles", vehiclesRouter);
app.use("/models", modelsRouter);

export default app
