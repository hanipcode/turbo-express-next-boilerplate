import "../utils/configureDotEnv";
import express, { Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import { API_PORT, ORIGINS } from "../constants/apiEnvs";
import apiRouter from "../modules";
import morganMiddleware from "./morganMiddleware";

const app = express();

app.use(morganMiddleware);
app.use(express.json());
app.use(
  cors({
    origin: ORIGINS,
  }),
);
app.use(compression());

app.use("/api", apiRouter);

app.get("/health", async (_req: Request, res: Response) =>
  res.json({
    message: "app is running",
  }),
);

app.listen(API_PORT, () => {
  console.log(`Server is running on port ${API_PORT}`);
});
