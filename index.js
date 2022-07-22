const express = require("express");
const mongoose = require("mongoose");
const movie = require("./routes/movie.router");
const customer = require("./routes/customer.router");
const app = express();

mongoose.connect("mongodb://localhost/vidly").then(() => {
  console.log("Connected to MongoDB");
});

app.use(express.json());
app.use("/movie", movie);
app.use("/customer", customer);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
