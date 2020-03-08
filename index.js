const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");
// const config = require("config");
const bodyparser = require("body-parser");

// if (!config.get("jwtPrivateKey")) {
//   console.error("jwt Private key is not defind");
//   process.exit(1);
// }

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//Routers is added
const productrouter = require("./routes/products");
const usersrouter = require("./routes/users");
const authrouther = require("./routes/auth");
//connecting to the Data base
mongoose
  .connect(config.get("db.host"))
  .then(console.log("`Successfully connected to mongodb host"))
  .catch(err => console.log("faile to connect to db...", err));

//add a middle ware to convert your json bodycle
app.use(express.json());

// app.use(bodyparser.json());

//configuration the files
app.use("/api", productrouter);
app.use("/api", usersrouter);
app.use("/api", authrouther);

const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`listening to port ${port}`));

module.exports = server;
