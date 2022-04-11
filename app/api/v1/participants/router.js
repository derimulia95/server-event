const router = require("express").Router();

const {
  signup,
  signin,
  landingPage,
  detailPage,
  checkout,
} = require("./controller");

const authenticateUser = require("../../../middlewares/auth.js");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/landing-page", landingPage);
router.get("/landing-page/detail-page/:id", detailPage);
router.post("/checkout", authenticateUser, checkout);

module.exports = router;
