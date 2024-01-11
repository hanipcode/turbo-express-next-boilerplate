import { Router } from "express";
import { z } from "zod";
import { ERROR_CODES } from "@repo/validator";
import logger from "../../core/logger";
import { createErrorLog } from "../../utils/createErrorLog";
import HTTP_CODES from "../../constants/httpCodes";
import { createErrorResponse } from "../../utils/createErrorResponse";

const userRouter = Router();
const serviceName = "user";

userRouter.post("auth", (req, res) => {
  const servicePath = "auth";
  try {
    const bodyValidation = z.object({
      email: z.string(),
      password: z.string(),
    });
    const validatedBody = bodyValidation.safeParse(req.body);
    if (!validatedBody.success) {
      res
        .status(HTTP_CODES.BODY_ERROR)
        .json(
          createErrorResponse(ERROR_CODES.INVALID_BODY, validatedBody.error),
        );
      return;
    }
  } catch (err) {
    logger.error(createErrorLog(serviceName, servicePath, err as Error));
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json(createErrorResponse(ERROR_CODES.SERVER_ERROR, err as Error));
  }
});

export default userRouter;
