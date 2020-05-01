function error(err, req, res, next) {
  res.status(500).send("An error occurred");
  // res.status(404).send({ error: "Invalid category is provided" });
}

module.exports = error;
