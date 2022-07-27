const auth = require("../middleware/auth.wt_middleware");
const admin = require("../middleware/admin.middleware");
const express = require("express");
const router = express.Router();
const { Genre, validateGenre } = require("../models/genre.model.js");

router.get("/", async (req, res) => {
  const result = await Genre.find();
  if (!result || result.length === 0) {
    return res.status(404).send("No genre found..");
  }
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await Genre.findById(req.params.id);
  if (!result) {
    return res.status(404).send("No such genre found");
  }
  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  let genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("The gene with the given ID was not found.");
  }

  genre.name = req.body.name;
  genre = await genre.save();

  res.send(genre);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  let genre = await Genre.findById(req.params.id);
  if (!genre) {
    return res.status(404).send("The genre with the given ID was not found.");
  }
  genre = await genre.remove();
  res.send(genre);
});

module.exports = router;
