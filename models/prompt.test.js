"use strict";

const db = require("../db.js");
const User = require("./user.js");
const Prompt = require('./prompt')

beforeAll(async () => {
  await db.query("DELETE FROM prompts");
  await db.query("DELETE FROM users");

  await User.register({
    username: "u1",
    email: "u1@email.com",
    password: "password1",
  });
  await Prompt.create('u1', {
    "type": "test",
    "adj": "test",
    "prompt": "test",
    "rating": "test",
    "rewrite": "test"
  })
  const users = await db.query("SELECT * FROM users");
  console.log("users:", users.rows);
});
afterAll(async () => {
  await db.end();
});

/************************************** create prompt */
describe("create", function () {
  const newPrompt = {
    "type": "test",
    "adj": "test",
    "prompt": "test",
    "rating": "test",
    "rewrite": "test"
  };

  test("works", async function () {
    let prompt = await Prompt.create('u1', {
      "type": "test",
      "adj": "test",
      "prompt": "test",
      "rating": "test",
      "rewrite": "test"
    });

    const expectedPromptData = {
      "type": "test",
      "adj": "test",
      "prompt": "test",
      "rating": "test",
      "rewrite": "test",
      "username": "u1"
    };

    expect(prompt).toEqual(expect.objectContaining(expectedPromptData));

    const found = await db.query("SELECT * FROM users WHERE username = 'u1'");
    expect(found.rows.length).toEqual(1);
  });
});