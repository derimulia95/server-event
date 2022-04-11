const notFound = (req, res) =>
  res.status(404).send({ msg: "Route does no exist" });

module.exports = notFound;
