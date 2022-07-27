const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  process.on("uncaughtException", (ex) => {
    console.log("we got an uncaught exception");
    winston.error(ex.message, ex);
  });

  const logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.prettyPrint()
    ),
    transports: [
      new winston.transports.Console({ colorize: true, prettyPrint: true }),
      new winston.transports.File({ filename: "logfile.log" }),
    ],
  });
  winston.add(logger);
};
