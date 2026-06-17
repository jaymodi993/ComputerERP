const express = require("express");

const router = express.Router();

const { addCharge, getCharges } = require("../controllers/chargesController");

router.post("/", addCharge);

router.get("/:jobID", getCharges);

module.exports = router;
