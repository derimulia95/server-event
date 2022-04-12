const router = require("express").Router();

const {
  getAllPayment,
  createPayment,
  getOnePayment,
  updatePayment,
  deletePayment,
  changeStatusPayment,
} = require("./controller");

const upload = require("../../../middlewares/multer");

const { authenticateUser } = require("../../../../app/middlewares/auth");

router.get("/", authenticateUser, getAllPayment);
router.post("/", authenticateUser, upload.single("imageUrl"), createPayment);
router.get("/:id", authenticateUser, getOnePayment);
router.put("/:id", authenticateUser, upload.single("imageUrl"), updatePayment);
router.delete("/:id", authenticateUser, deletePayment);
router.put("/:id/status", authenticateUser, changeStatusPayment);

module.exports = router;
