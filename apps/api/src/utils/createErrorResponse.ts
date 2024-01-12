import { serializeError } from "./serializeError";

export const createErrorResponse = (
  errorCode: number,
  err: Error,
  additionalData?: any,
) => ({
  code: errorCode,
  error: true,
  message: err.message,
  detail: serializeError(err),
  additionalData,
});
