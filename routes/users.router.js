const _ = require("lodash");
const jwt = require("jsonwebtoken");
const config = require("config");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { User, validateUser } = require("../models/users.model.js");
const auth = require("../middleware/auth.wt_middleware.js");

router.get("/", async (req, res) => {
  const result = await User.find();
  if (!result || result.length === 0) {
    return res.status(404).send("No users found..");
  }
  res.send(result);
});

router.get("/whoami", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) {
    return res.status(404).send("No user found");
  }
  res.send(user);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exists.");

  user = new User(_.pick(req.body, ["name", "email", "password", "isAdmin"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // const token = jwt.sign(
  //   { _id: this._id, name: this.name },
  //   config.get("jwtPrivateKey")
  // );
  const token = user.generateAuthToken();

  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.delete("/:id", auth, async (req, res) => {
  // const user = await User.findByIdAndRemove(req.params.id);
  // if (!user)
  //   return res.status(404).send("The user with the given ID was not found.");
  // res.send(user);

  const result = await User.findByIdAndRemove(req.params.id);
  if (!result) {
    return res.status(404).send("The user with the given ID was not found.");
  }
  res.send(result);
});

module.exports = router;
