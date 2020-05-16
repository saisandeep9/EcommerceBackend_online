const express = require("express");
const app = express();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const config = require("config");
// const router = express.Router();
const { User, validate } = require("../models/user");
// const validate = require("../models/users");

// posting users

app.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

app.get("/allusers", async (req, res) => {
  const user = await User.find();
  res.send(user);
});

app.post("/users", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ "e-mail": req.body["e-mail"] });
  if (user) return res.send("user already exist");
  user = await new User(_.pick(req.body, ["name", "e-mail"]));

  //Hash the password

  const salt = await bcrypt.genSalt(9);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  // res.send(user);

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["name", "e-mail"]));
});

module.exports = app;
