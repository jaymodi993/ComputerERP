const express = require("express");

const router = express.Router();

const { addRepairJob, getRepairJobs } = require("../controllers/repairController");

router.post("/", addRepairJob);

router.get("/", getRepairJobs);

module.exports = router;
