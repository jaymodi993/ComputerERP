const express = require("express");

const router = express.Router();

router.get("/share", (req, res) => {
  const { mobile, message } = req.query;

  const url = "https://wa.me/" + mobile + "?text=" + encodeURIComponent(message);

  res.json({
    url: url,
  });
});

module.exports = router;
