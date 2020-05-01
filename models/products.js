const mongoose = require("mongoose");

const Joi = require("joi");
const Schema = mongoose.Schema;

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // entryDate: { type: Date, default: Date.now },
  description: String,

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
});

const Product = mongoose.model("Product", ProductSchema);
function validate(Product) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    price: Joi.number().required(),
    entryDate: Joi.date().required(),
    description: Joi.string().required(),
  };
  return Joi.validate(Product, schema);
}

module.exports.Product = Product;
module.exports.validate = validate;
