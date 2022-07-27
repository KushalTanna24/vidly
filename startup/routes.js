const express = require("express");
const movie = require("../routes/movie.router");
const customer = require("../routes/customer.router");
const genre = require("../routes/genre.router");
const rental = require("../routes/rental.router");
const users = require("../routes/users.router");
const auth = require("../routes/auth.router");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/movie", movie);
  app.use("/customer", customer);
  app.use("/genre", genre);
  app.use("/rental", rental);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use(error);
};
