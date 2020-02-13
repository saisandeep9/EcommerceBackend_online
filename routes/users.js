const express = require("express");
const app = express();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const auth = require("../middleware/auth");

// const router = express.Router();
const { Users, validate } = require("../models/users");
// const validate = require("../models/users");

// posting users

app.get("/me", auth, async (req, res) => {
  const user = await Users.findById(req.user._id).select("-password");
  res.send(user);
});

app.post("/users", async (req, res) => {
  const result = validate(req.body);
  if (result.error) return res.send(result.error.details[0].message);

  let user = await Users.findOne({ "e-mail": req.body["e-mail"] });
  if (user) return res.send("user already exist");
  user = await new Users(_.pick(req.body, ["name", "e-mail"]));

  //Hash the password

  const salt = await bcrypt.genSalt(9);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();
  // res.send(user);

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send(_.pick(user, ["name", "e-mail"]));
});

module.exports = app;
