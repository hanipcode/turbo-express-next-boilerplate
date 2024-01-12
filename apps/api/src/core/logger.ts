import fs from "fs";
import path from "path";
import winston from "winston";
import "winston-daily-rotate-file";

const logsDir = path.join(__dirname, "../../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}
const { combine, timestamp, json } = winston.format;

const combinedFileTransport = new winston.transports.DailyRotateFile({
  filename: "combined-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  dirname: logsDir,
  maxFiles: "3d",
});
const errorFileTransport = new winston.transports.DailyRotateFile({
  filename: "error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "3d",
  level: "error",
  dirname: logsDir,
});
const exceptionFileTransport = new winston.transports.DailyRotateFile({
  filename: "exception-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "3d",
  level: "exception",
  dirname: logsDir,
});
const rejectionFileTransport = new winston.transports.DailyRotateFile({
  filename: "rejection-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "3d",
  level: "rejection",
  dirname: logsDir,
});

const httpFileTransport = new winston.transports.DailyRotateFile({
  filename: "http-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "3d",
  level: "error",
  dirname: logsDir,
});

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  level: "info",
  format: winston.format.cli(),
  transports: [
    new winston.transports.Console(),
    combinedFileTransport,
    errorFileTransport,
  ],
  exceptionHandlers: [exceptionFileTransport],
  rejectionHandlers: [rejectionFileTransport],
});

export const httpLogger = winston.createLogger({
  level: "http",
  format: combine(
    timestamp({
      format: "YYYY-MM-DD hh:mm:ss.SSS A",
    }),
    json(),
  ),
  transports: [new winston.transports.Console(), httpFileTransport],
});

httpLogger.exitOnError = false;
logger.exitOnError = false;

export default logger;
