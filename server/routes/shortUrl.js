const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/shortUrl", async (req, res) => {
  const { beforeUrl, afterUrl } = req.body;
  try {
    await db.shortUrl.create({
      beforeUrl: beforeUrl,
      afterUrl: afterUrl,
    });
    return res.status(200).json({ message: "Create short" });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
