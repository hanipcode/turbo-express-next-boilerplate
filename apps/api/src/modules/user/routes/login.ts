import { Request, Response } from "express";
import { z } from "zod";
import { ERROR_CODES } from "@repo/validator";
import asyncHandler from "express-async-handler";
import HTTP_CODES from "../../../constants/httpCodes";
import { createErrorResponse } from "../../../utils/createErrorResponse";
import userServices from "../service";
import logger from "../../../core/logger";
import { createErrorLog } from "../../../utils/createErrorLog";
import { MESSAGE } from "../../../constants/message";
import { createSuccessLog } from "../../../utils/createSuccessLog";
import { createSuccessResponse } from "../../../utils/createSuccesResponse";

const serviceName = "user";
export const login = asyncHandler(async (req: Request, res: Response) => {
  const servicePath = "login";
  res.locals.serviceName = serviceName;
  res.locals.servicePath = servicePath;
  const profiler = logger.startTimer();

  const bodyValidation = z.object({
    email: z.string(),
    password: z.string(),
  });
  const validatedBody = bodyValidation.safeParse(req.body);
  if (!validatedBody.success) {
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .json(createErrorResponse(ERROR_CODES.INVALID_BODY, validatedBody.error));
    return;
  }
  const user = await userServices.getUserByEmail(validatedBody.data.email);

  if (!user) {
    const error = new Error(MESSAGE.INVALID_EMAIL_PASS_LOGIN);
    const errorCode = ERROR_CODES.DATA_NOT_FOUND_DB;
    logger.error(createErrorLog(serviceName, servicePath, errorCode, error));
    res
      .status(HTTP_CODES.NOT_FOUND)
      .json(createErrorResponse(errorCode, error));
    return;
  }

  const userPassword = await userServices.getUserPassword(user._id);
  if (!userServices.checkPassword(validatedBody.data.password, userPassword)) {
    const error = new Error(MESSAGE.INVALID_EMAIL_PASS_LOGIN);
    const errorCode = ERROR_CODES.WRONG_PASSWORD;
    logger.error(createErrorLog(serviceName, servicePath, errorCode, error));
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .json(createErrorResponse(errorCode, error));

    return;
  }
  const accessToken = userServices.signAccessToken({
    email: user.email,
    role: user.role,
  });
  const refreshToken = userServices.signRefreshToken({
    email: user.email,
    role: user.role,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  profiler.done({
    message: createSuccessLog(serviceName, servicePath, user),
  });
  res
    .status(HTTP_CODES.SUCCESS)
    .json(createSuccessResponse({ user, accessToken }));
});
