const { createLogger, transports, format } = require("winston");
require('winston-mongodb')

const empLogger = createLogger({
  transports: [
    new transports.File({
      filename: "logs/emp_info.log",
      level: "info",
      maxsize: 5242880,
     format: format.combine(format.timestamp({format: 'MMM-DD-YYYY HH:MM:SS'}), 
    format.align(),
    format.printf(info=> `level : ${info.level}: ${[info.timestamp]}:${info.message}`),
    ),
    }),
    new transports.File({
      filename: "logs/emp_error.log",
      level: "error",
      maxsize: 5242880,
     format: format.combine(format.timestamp({format: 'MMM-DD-YYYY HH:MM:SS'}), 
    format.align(),
    format.printf(error=> `level : ${error.level}: ${[error.timestamp]}:${error.message}`),
    ),
    }),

  ],
});

module.exports = empLogger;
