const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Movie = mongoose.model("movie", movieSchema);

router.get("/", async (req, res) => {
  const result = await Movie.find();
  if (!result || result.length === 0) {
    return res.status(404).send("No movies found start adding some");
  }
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await Movie.findById(req.params.id);
  if (!result) {
    return res.status(404).send("No movie found");
  }
  res.send(result);
});

router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let movie = new Movie({
    name: req.body.name,
  });
  movie = await movie.save();
  res.send(movie);
});

router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("The movie with the given ID was not found.");
  }

  movie.name = req.body.name;
  movie = await movie.save();

  res.send(movie);
});

router.delete("/:id", async (req, res) => {
  let movie = await Movie.findById(req.params.id);
  if (!movie) {
    return res.status(404).send("The movie with the given ID was not found.");
  }
  movie = await movie.remove();
  res.send(movie);
});

const validateMovie = (movie) => {
  const schema = Joi.object({ name: Joi.string().min(5).max(50).required() });
  return schema.validate(movie);
};

module.exports = router;
