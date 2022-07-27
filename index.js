const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const mongoose = require("mongoose");
const movie = require("./routes/movie.router");
const customer = require("./routes/customer.router");
const genre = require("./routes/genre.router");
const rental = require("./routes/rental.router");
const users = require("./routes/users.router");
const auth = require("./routes/auth.router");
const app = express();

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

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
