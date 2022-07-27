const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/users.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.get("/", async (req, res) => {
  res.send("Nothing to see here.. why dont you just use post method instead");
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid email or password");

  // const token = jwt.sign(
  //   { _id: this._id, name: this.name },
  //   config.get("jwtPrivateKey")
  // );
  const token = user.generateAuthToken();
  res.send(token);
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(req);
}

module.exports = router;
