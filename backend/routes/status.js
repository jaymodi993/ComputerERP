const express = require("express");

const router = express.Router();

const { updateStatus, getStatusHistory } = require("../controllers/statusController");

router.post("/", updateStatus);

router.get("/:jobID", getStatusHistory);

module.exports = router;
