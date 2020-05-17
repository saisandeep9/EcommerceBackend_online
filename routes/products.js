const express = require("express");
const multer = require("multer");
const auth = require("../middleware/auth");

const upload = require("../middleware/upload");

// const mongoose = require("mongoose");
// const Joi = require("joi");
// const router = express.Router();
const app = express();

const { Product, validate } = require("../models/product");

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
app.post(
  "/products",
  auth,
  // upload.single("pimg"),
  async (req, res) => {
    // const { error } = validate(req.body);

    const result = validate(req.body);
    if (result.error)
      return res.status(400).send(result.error.details[0].message);
    //   try {
    const product = await new Product({
      name: req.body.name,
      price: req.body.price,

      description: req.body.description,
      category: req.body.category,
      // pimg: req.file.path,
    });
    await product.save();
    res.send(product);

    //   } catch (error) {
    //     console.log(error);
    //     res.status(500).json({ error: "Invalid Product Details" });
    //   }
  }
);

app.get("/products", auth, async (req, res) => {
  const product = await Product.find().populate("Category", "name -_id");
  res.status(200).send(product);
});

module.exports = app;
