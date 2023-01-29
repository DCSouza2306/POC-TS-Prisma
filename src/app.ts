import express from "express";
import { json } from "express";
import dotven from "dotenv";
import vehiclesRouter from "./router/vehicles-router.js";
import modelsRouter from "./router/models-router.js";
dotven.config();

const app = express();
app.use(json());
app.use("/vehicles", vehiclesRouter);
app.use("/models", modelsRouter);

app.use(json());

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server Runing in port ${port}`));
