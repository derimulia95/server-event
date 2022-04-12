const router = require("express").Router();

const {
  signup,
  signin,
  landingPage,
  detailPage,
  checkout,
  dashboard,
} = require("./controller");

const { authenticateUser } = require("../../../../app/middlewares/auth");

router.post("/auth/signup", signup);
router.post("/auth/signin", signin);
router.get("/landing-page", landingPage);
router.get("/landing-page/detail-page/:id", detailPage);
router.post("/checkout", authenticateUser, checkout);
router.get("/dashboard", authenticateUser, dashboard);

module.exports = router;
