const Joi = require("joi");
const mongoose = require("mongoose");
const { genreSchema } = require("./genre");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: { type: Number, default: 0, min: 0, max: 255 },
  dailyRentalRate: { type: Number, default: 10, min: 0, max: 255 },
});

const Movie = mongoose.model("movie", movieSchema);

const validateMovie = (movie) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50),
    genreId: Joi.objectId().required(),
    numberInStock: Joi.number().min(0).max(255),
    dailyRentalRate: Joi.number().min(0).max(255),
  });
  return schema.validate(movie);
};

exports.Movie = Movie;
exports.validateMovie = validateMovie;
