"use strict";

const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    console.log("Healthy Log");
    return res.json({ message: "Healthy" });
  } catch (err) {
    return next(err);
  }
});

// Fetch all users route
router.get("/users", async function (req, res, next) {
  try {
    console.log("user Log");
    const users = await User.findAll(); // Assuming a `findAll` method is available in the User model
    console.log("users", users);
    return res.json({ users });
  } catch (err) {
    console.log("error", err);
    return next(err);
  }
});

module.exports = router;
