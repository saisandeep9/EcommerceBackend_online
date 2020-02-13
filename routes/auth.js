const express = require("express");
const app = express();
const Joi = require("joi");
const _ = require("lodash");
const bcrypt = require("bcrypt");

// const router = express.Router();
const { Users } = require("../models/users");
// const validate = require("../models/users");

// posting users
app.post("/auth", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  let user = await Users.findOne({ "e-mail": req.body["e-mail"] });
  if (!user) return res.status(400).send("Invalid email or password");

  //Hash the password
  const ispasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!ispasswordValid)
    return res.status(400).send("Invalid password. please try again");

  const token = user.generateAuthToken();
  res.send(token);
  // res.send(true);
  // res.header("x-auth-token", token).send(ures);
});

function validate(req) {
  const schema = {
    "e-mail": Joi.string()
      .min(5)
      .max(50)
      .required(),
    password: Joi.string()
      .min(5)
      .max(350)
      .required()
  };
  return Joi.validate(req, schema);
}

module.exports = app;
