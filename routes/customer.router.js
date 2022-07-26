const mongoose = require("mongoose");
const { Customer, validateCustomer } = require("../models/customer.model");
const express = require("express");
const auth = require("../middleware/auth.wt_middleware");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await Customer.find();
  if (!result || result.length === 0) {
    return res.status(404).send("No customers found... start adding some");
  }
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const result = await Customer.findById(req.params.id);
  if (!result) {
    return res.status(404).send("No customers found");
  }
  res.send(result);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let customer = new Customer({
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold,
  });
  customer = await customer.save();
  res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  }

  customer.name = req.body.name;
  customer.phone = req.body.phone;
  customer.isGold = req.body.isGold;
  customer = await customer.save();

  res.send(customer);
});

router.delete("/:id", auth, async (req, res) => {
  let customer = await Customer.findById(req.params.id);
  if (!customer) {
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  }
  await customer.remove();
  res.send(customer);
});

module.exports = router;
