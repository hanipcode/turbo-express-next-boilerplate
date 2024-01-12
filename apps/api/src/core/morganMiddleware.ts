import morgan from "morgan";
import { httpLogger } from "./logger";

const morganMiddleware = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  {
    stream: {
      // Configure Morgan to use our custom logger with the http severity
      write: (message) => httpLogger.http(message.trim()),
    },
  },
);

export default morganMiddleware;
