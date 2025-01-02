"use strict";

const express = require("express");

const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    console.log("Healthy Log");
    return res.json({ message: "Healthy" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
