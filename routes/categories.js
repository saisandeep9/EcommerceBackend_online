const express = require("express");
const app = express();
// const router = express.Router();
const { Category } = require("../models/categories");
// const Category = require("../models/categories");

app.get("/categories", async (req, res) => {
  const categories = await Category.find().sort("name");
  res.send(categories);
});

app.post("/categories", async (req, res) => {
  const category = await new Category({
    name: req.body.name,
  });
  await category.save();
  res.send(category);
});

module.exports = app;
