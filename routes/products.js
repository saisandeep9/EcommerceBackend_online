const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");

// const mongoose = require("mongoose");
// const Joi = require("joi");
// const router = express.Router();
const app = express();

const { Product, validate } = require("../models/products");

// const storage = multer.diskStorage({
//   destination: function(req, fil, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function(req, file, cb) {
//     cb(null, new Date().toISOString() + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// posting products
app.post("/products", async (req, res) => {
  //   const { error } = validate(req.body);

  const result = validate(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);
  //   try {
  const product = await new Product({
    name: req.body.name,
    price: req.body.price,
    // entryDate:req.body,
    description: req.body.description
  });
  await product.save();
  res.send(product);

  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Invalid Product Details" });
  //   }
});

app.get("/products", async (req, res) => {
  const product = await Product.find();
  res.status(200).send(product);
});

module.exports = app;
