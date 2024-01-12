import { ERROR_CODES } from "@repo/validator";
import { NextFunction, Request, Response } from "express";
import { createErrorLog } from "../utils/createErrorLog";
import HTTP_CODES from "../constants/httpCodes";
import { createErrorResponse } from "../utils/createErrorResponse";
import logger from "./logger";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction,
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
};

export default errorHandler;
