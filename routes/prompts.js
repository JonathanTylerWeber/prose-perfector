"use strict";

const express = require("express");
const { ensureCorrectUser, ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const Prompt = require("../models/prompt");
const jsonschema = require("jsonschema");
const promptCreateSchema = require("../schemas/promptCreate.json");

const router = express.Router();


router.get("/", async function (req, res, next) {
  try {
    const prompts = await Prompt.findAll();
    return res.json({ prompts });
  } catch (err) {
    return next(err);
  }
});

/** POST / => { prompt } 
 * 
 * Create a new prompt associated with the authenticated user.
 * 
 * Returns { id, username, prompt, rating, rewrite }
 * 
 * Authorization required: authenticated user
 */
router.post("/", ensureLoggedIn, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, promptCreateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const { username } = res.locals.user;
    const prompt = await Prompt.create(username, req.body);
    return res.status(201).json({ prompt });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /:id => { deleted: id }
 * 
 * Delete a prompt with the given id.
 * 
 * Authorization required: same user
 */
router.delete("/:username/:id", ensureCorrectUser, async function (req, res, next) {
  try {
    console.log("Username:", req.params.username);
    console.log("Prompt ID:", req.params.id);
    await Prompt.delete(req.params.id);
    return res.json({ deleted: req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
