import "../utils/configureDotEnv";
import express, { Request, Response } from "express";
import cors from "cors";
import compression from "compression";
import { ERROR_CODES } from "@repo/validator";
import { API_PORT, ORIGINS } from "../constants/apiEnvs";
import apiRouter from "../modules";
import { createErrorLog } from "../utils/createErrorLog";
import HTTP_CODES from "../constants/httpCodes";
import { createErrorResponse } from "../utils/createErrorResponse";
import morganMiddleware from "./morganMiddleware";
import "./db";
import logger from "./logger";

const app = express();

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ): void => {
    const errorCode = ERROR_CODES.SERVER_ERROR;
    logger.error(
      createErrorLog(
        res.locals.serviceName,
        res.locals.servicePath,
        errorCode,
        err as Error,
      ),
    );
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(errorCode, err as Error));
  },
);

app.listen(API_PORT, () => {
  console.log(`Server is running on port ${API_PORT}`);
});
