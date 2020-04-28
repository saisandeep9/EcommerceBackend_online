const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 55,
    required: true,
  },
});

const category = mongoose.model("Category", categorySchema);

module.exports.Category = category;
