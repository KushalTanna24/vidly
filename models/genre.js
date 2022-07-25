const Joi = require("joi");
const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

const Genre = mongoose.model("genre", genreSchema);

const validateGenre = (genre) => {
  const schema = Joi.object({ name: Joi.string().max(50).required() });
  return schema.validate(genre);
};

exports.Genre = Genre;
exports.genreSchema = genreSchema;
exports.validateGenre = validateGenre;
