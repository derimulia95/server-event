var express = require("express");
const { getAllUser } = require("./controllers");
var router = express.Router();

/* GET users listing. */
router.get("/users", getAllUser);

module.exports = router;
