const { createLogger, transports, format } = require("winston");
require("winston-mongodb");

const logger = createLogger({
  transports: [
    new transports.Console({
      level: "info",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:MM:SS" }),
        format.align(),
        format.printf(
          (info) => `level : ${info.level}:${[info.timestamp]}:${info.message}`
        )
      ),
    }),
    new transports.Console({
      level: "error",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:MM:SS" }),
        format.align(),
        format.printf(
          (info) => `level : ${info.level}:${[info.timestamp]}:${info.message}`
        )
      ),
    }),
    new transports.Console({
      level: "warn",
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:MM:SS" }),
        format.align(),
        format.printf(
          (info) => `level :${info.level}: ${[info.timestamp]}:${info.message}`
        )
      ),
    }),
    new transports.File({
      filename: "logs/emp_system_log_info.log",
      level: "info",
      maxsize: 5242880,
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:MM:SS" }),
        format.align(),
        format.printf(
          (info) => `level : ${info.level}: ${[info.timestamp]}:${info.message}`
        )
      ),
    }),
    new transports.File({
      filename: "logs/emp_system_log_info.log",
      level: "error",
      maxsize: 5242880,
      format: format.combine(
        format.timestamp({ format: "MMM-DD-YYYY HH:MM:SS" }),
        format.align(),
        format.printf(
          (info) => `level : ${info.level}: ${[info.timestamp]}:${info.message}`
        )
      ),
    }),
    new transports.MongoDB({
      level: "info",
      db: process.env.URL,
      options: {
        useUnifiedTopology: true,
      },
      collection: "logData",
      formate: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;
