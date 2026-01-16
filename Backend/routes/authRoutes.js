const express = require("express");
const router = express.Router();
const { googleAuthController, restoreSessionController, logoutController } = require("../controllers/authController");

router.post("/google", googleAuthController);
router.get("/me", restoreSessionController);
router.post("/logout", logoutController);

module.exports = router;
