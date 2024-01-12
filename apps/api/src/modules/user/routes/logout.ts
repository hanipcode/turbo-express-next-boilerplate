import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import logger from "../../../core/logger";
import { createSuccessLog } from "../../../utils/createSuccessLog";
import HTTP_CODES from "../../../constants/httpCodes";
import { createSuccessResponse } from "../../../utils/createSuccesResponse";
import { MESSAGE } from "../../../constants/message";

const serviceName = "user";

export const logout = asyncHandler((req: Request, res: Response) => {
  const servicePath = "logout";
  res.locals.serviceName = serviceName;
  res.locals.servicePath = servicePath;

  const profiler = logger.startTimer();

  res.clearCookie("refreshToken");

  profiler.done({ message: createSuccessLog(serviceName, servicePath, {}) });

  res
    .status(HTTP_CODES.SUCCESS)
    .json(createSuccessResponse({}, MESSAGE.SUCCESS_LOGOUT));
});
