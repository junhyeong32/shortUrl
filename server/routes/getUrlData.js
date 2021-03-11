const express = require("express");
const router = express.Router();
const db = require("../models");

router.get("/getUrlData", async (req, res) => {
  try {
    const allData = await db.shortUrl.findAll({ order: [["id", "DESC"]] });
    return res.status(200).json(allData);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
