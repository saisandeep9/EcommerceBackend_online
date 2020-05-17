const express = require("express");
const app = express();
const mongoose = require("mongoose");
const config = require("config");

const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
require("express-async-errors");

// if (!config.get("jwtPrivateKey")) {
//   console.error("jwt Private key is not defind");
//   process.exit(1);
// }

//add a middle ware to convert your json bodycle
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  exposedHeaders: "x-auth-token",
};
app.use(cors(corsOptions));
app.use(express.json());

app.use(helmet());
app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

// app.use(function (req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

//Routers is added

const categories = require("./routes/categories");
const products = require("./routes/products");
const users = require("./routes/users");
const auth = require("./routes/auth");
const error = require("./middleware/error");

//connecting to the Data base
mongoose
  .connect(config.get("db"), { useNewUrlParser: true })
  .then(
    console.log(`Successfully connected to mongodb host${config.get("db")}`)
  )
  .catch((err) => console.log("faile to connect to db...", err));

//configuration the files
app.use("/api", categories);
app.use("/api", products);
app.use("/api", users);
app.use("/api", auth);
app.use(error);

process.on("uncaughtException", (ex) => {
  logger.error("uncaughtException occured :", ex);
});

process.on("unhandledRejection", (ex) => {
  logger.error("unhandledRejection occured :", ex);
});

const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`listening to port ${port}`));

module.exports = server;
