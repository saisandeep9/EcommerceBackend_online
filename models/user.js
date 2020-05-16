const mongoose = require("mongoose");

const Joi = require("joi");
const jwt = require("jsonwebtoken");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    trim: true,
  },
  "e-mail": {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 1050,
    required: true,
    trim: true,
  },
  isAdmin: Boolean,
});

usersSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    "jwtkey"
  );
  return token;
};

const User = mongoose.model("Users", usersSchema);
function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).trim().required(),
    "e-mail": Joi.string().min(5).max(50).required().email(),
    password: Joi.string().min(5).max(350).required(),

    description: Joi.string(),
  };
  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
