import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ERROR_CODES } from "@repo/validator";
import { R } from "@mobily/ts-belt";
import { JwtPayload } from "jsonwebtoken";
import logger from "../../../core/logger";
import userServices from "../service";
import HTTP_CODES from "../../../constants/httpCodes";
import { createErrorResponse } from "../../../utils/createErrorResponse";
import { MESSAGE } from "../../../constants/message";
import { createErrorLog } from "../../../utils/createErrorLog";
import { createSuccessResponse } from "../../../utils/createSuccesResponse";
import { createSuccessLog } from "../../../utils/createSuccessLog";

const serviceName = "user";

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const servicePath = "refresh";
  res.locals.serviceName = serviceName;
  res.locals.servicePath = servicePath;
  const profiler = logger.startTimer();

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    const error = new Error(MESSAGE.REFRESH_TOKEN_MISSING);
    const errorCode = ERROR_CODES.MISSING_COOKIE;
    logger.error(createErrorLog(serviceName, servicePath, errorCode, error));
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .json(createErrorResponse(errorCode, error));
    return;
  }

  const RToken = R.fromExecution(() => userServices.verifyToken(refreshToken));

  if (R.isError(RToken)) {
    R.tapError(RToken, (err: Error) => {
      const errorCode = ERROR_CODES.INVALID_JWT;
      logger.error(createErrorLog(serviceName, servicePath, errorCode, err));
      res
        .status(HTTP_CODES.UNAUTHORIZED)
        .json(createErrorResponse(errorCode, err));
    });
    return;
  }
  const decoded = R.toNullable(RToken)!;
  const accessToken = userServices.signAccessToken({
    email: (decoded.payload as JwtPayload).email,
    role: (decoded.payload as JwtPayload).role,
  });

  profiler.done({
    message: createSuccessLog(serviceName, servicePath, {}),
  });
  res.status(HTTP_CODES.SUCCESS).json(createSuccessResponse({ accessToken }));
});

export default refreshToken;
