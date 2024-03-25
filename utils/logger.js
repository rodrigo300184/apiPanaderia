import { createLogger, format, transports } from "winston";

const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }), // Agrega el stack trace del error
    format.printf(
      (info) =>
        `[${info.timestamp}] ${info.level}: ${info.message}${
          info.stack ? `\n${info.stack}` : ""
        }`
    )
  ),
  transports: [
    new transports.File({
      maxsize: 5120000,
      maxFiles: 5,
      filename: "./logs/log-api.log",
    }),
    new transports.Console({
      level: "debug",
    }),
  ],
});

export default logger;
