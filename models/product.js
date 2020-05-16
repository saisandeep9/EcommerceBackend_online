const mongoose = require("mongoose");

const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const Schema = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    min: 10,
    max: 10000,
  },
  // entryDate: { type: Date, default: Date.now },
  description: {
    type: String,
    minlength: 5,
    maxlength: 250,
    trim: true,
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  // pimg: String,
});

const Product = mongoose.model("Product", productSchema);
function validate(product) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    price: Joi.number().required().min(10).max(10000),
    description: Joi.string(),
    category: Joi.objectId().required(),
  };
  return Joi.validate(product, schema);
}

module.exports.Product = Product;
module.exports.validate = validate;
