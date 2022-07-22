const Joi = require("joi");
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});

const Movie = mongoose.model("movie", movieSchema);

const validateMovie = (movie) => {
  const schema = Joi.object({ name: Joi.string().min(5).max(50).required() });
  return schema.validate(movie);
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;
