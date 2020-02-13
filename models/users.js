const mongoose = require("mongoose");

const Joi = require("joi");
const jwt = require("jsonwebtoken");

const UsersSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: true
  },
  "e-mail": {
    type: String,

    minlength: 5,
    maxlength: 50,
    required: true,
    unique: true
  },
  password: {
    type: String,

    minlength: 5,
    maxlength: 350,
    required: true
  }
});

UsersSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, "jwtkey");
  return token;
};

const Users = mongoose.model("Users", UsersSchema);
function validate(Users) {
  const schema = {
    name: Joi.string()
      .min(5)
      .max(50)
      .required(),
    "e-mail": Joi.string()
      .min(5)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(350)
      .required(),

    description: Joi.string()
  };
  return Joi.validate(Users, schema);
}

module.exports.Users = Users;
module.exports.validate = validate;
