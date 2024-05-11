"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Prompt = require("../models/prompt");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  await db.query("BEGIN");
  await db.query("DELETE FROM prompts");
  await db.query("DELETE FROM users");

  await User.register({
    username: "u1",
    email: "user1@user.com",
    password: "password1",
  });
  await User.register({
    username: "u2",
    email: "user2@user.com",
    password: "password2",
  });
  await User.register({
    username: "u3",
    email: "user3@user.com",
    password: "password3",
  });
  await Prompt.create("u1", {
    type: "test",
    adj: "test",
    prompt: "test",
    rating: "test",
    rewrite: "test"
  });
  const prompts = await db.query("SELECT * FROM prompts");
  console.log("Prompts:", prompts.rows);
  const users = await db.query("SELECT * FROM users");
  console.log("users:", users.rows);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.query("DELETE FROM prompts");
  await db.query("DELETE FROM users");
  await db.end();
}


const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
};
