import fs from "fs";
import path from "path";
import winston from "winston";
import "winston-daily-rotate-file";

const logsDir = path.join(process.cwd(), "/logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

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

logger.exitOnError = false;

export default logger;
