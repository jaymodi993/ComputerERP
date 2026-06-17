const express = require("express");

const router = express.Router();

const { createInvoice, getInvoice } = require("../controllers/invoiceController");

router.post("/", createInvoice);

router.get("/:invoiceID", getInvoice);

module.exports = router;
