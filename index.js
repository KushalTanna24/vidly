const express = require("express");
require("express-async-errors");
const winston = require("winston");
require("winston-mongodb");
const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const movie = require("./routes/movie.router");
const customer = require("./routes/customer.router");
const genre = require("./routes/genre.router");
const rental = require("./routes/rental.router");
const users = require("./routes/users.router");
const auth = require("./routes/auth.router");
const error = require("./middleware/error");
const app = express();

process.on("uncaughtException", (ex) => {
  console.log("we got an uncaught exception");
  winson.error(ex.message, ex);
});

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});
winston.add(logger);

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
mongoose.connect("mongodb://localhost/vidly").then(() => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use("/movie", movie);
app.use("/customer", customer);
app.use("/genre", genre);
app.use("/rental", rental);
app.use("/users", users);
app.use("/auth", auth);
app.use(error);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
