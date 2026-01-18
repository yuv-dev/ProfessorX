const express = require("express");
const router = express.Router();
const { getUserProgress } = require("../controllers/progressController");
const verifyToken = require("../middleware/verifyToken");

router.get("/user/:userId", verifyToken, getUserProgress);

module.exports = router;
