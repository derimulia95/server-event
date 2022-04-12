const router = require("express").Router();

const { getAllTransaction } = require("./controller");

const { authenticateUser } = require("../../../../app/middlewares/auth");

router.get("/", authenticateUser, getAllTransaction);

module.exports = router;
