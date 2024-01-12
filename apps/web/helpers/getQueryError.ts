import { AxiosError } from "axios";
import { ERROR_CODES } from "@repo/validator";

interface QueryErrorResult {
  type: "Server" | "DefaultError";
  data: {
    code: number;
    detail?: any;
    message: string;
  };
}

const getQueryError = (err: Error): QueryErrorResult => {
  if (err instanceof AxiosError) {
    if (err.response?.data) {
      return {
        type: "Server",
        data: {
          code: err.response.data.code,
          message: err.response.data.message,
          detail: err.response.data.detail,
        },
      };
    }
  }
  return {
    type: "DefaultError",
    data: {
      code: ERROR_CODES.INTERNAL_CLIENT_ERROR,
      message: err.message,
    },
  };
};

export default getQueryError;
