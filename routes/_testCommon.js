"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Prompt = require("../models/prompt");
const { createToken } = require("../helpers/tokens");

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM prompts");

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

}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM prompts");
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
