const express = require("express");

const router = express.Router();

const path = require("path");

router.get("/invoice/:file", (req, res) => {
  const filePath = path.join(
    __dirname,

    "../uploads/invoices/",

    req.params.file,
  );

  res.sendFile(filePath);
});

router.get("/jobsheet/:file", (req, res) => {
  const filePath = path.join(
    __dirname,

    "../uploads/jobsheets/",

    req.params.file,
  );

  res.sendFile(filePath);
});

module.exports = router;
