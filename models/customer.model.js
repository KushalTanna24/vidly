const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  isGold: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("customer", customerSchema);

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean(),
  });
  return schema.validate(customer);
};

exports.Customer = Customer;
exports.validateCustomer = validateCustomer;
