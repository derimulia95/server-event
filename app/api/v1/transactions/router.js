const router = require("express").Router();

const { getAllTransaction } = require("./controller");

const authenticateUser = require("../../../middlewares/auth.js");

router.get("/", authenticateUser, getAllTransaction);

module.exports = router;
