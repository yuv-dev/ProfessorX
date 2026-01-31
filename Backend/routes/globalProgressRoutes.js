const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  getDashboardData,
  updateActivityStats,
  updateLastActiveModule,
  updateSkill,
  addMilestone,
} = require("../controllers/globalProgressController");

router.get("/", verifyToken, getDashboardData);
router.post("/activity", verifyToken, updateActivityStats);
router.put("/module", verifyToken, updateLastActiveModule);
router.put("/skill", verifyToken, updateSkill);
router.post("/milestone", verifyToken, addMilestone);


module.exports = router;
