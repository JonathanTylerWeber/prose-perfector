process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");
const Prompt = require("../models/prompt");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  u1Token,
  u2Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

describe("POST /prompt", function () {
  test("works", async function () {
    const resp = await request(app)
      .post("/prompt")
      .set("authorization", `Bearer ${u1Token}`)
      .send({
        "type": "test",
        "adj": "test",
        "prompt": "test",
        "rating": "test",
        "rewrite": "test"
      });
    expect(resp.body).toEqual({
      "prompt": {
        "id": expect.any(Number),
        "username": "u1",
        "prompt": "test",
        "rating": "test",
        "rewrite": "test",
        "type": "test",
        "adj": "test"
      }
    });
  });

  test("unauth post", async function () {
    const resp = await request(app)
      .post("/prompt")
      .send({
        "type": "test",
        "adj": "test",
        "prompt": "test",
        "rating": "test",
        "rewrite": "test"
      });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with missing data", async function () {
    const resp = await request(app)
      .post("/prompt")
      .set("authorization", `Bearer ${u1Token}`)
      .send({
        "prompt": "test",
        "rating": "test",
        "rewrite": "test"
      });
    expect(resp.statusCode).toEqual(500);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .post("/prompt")
      .set("authorization", `Bearer ${u1Token}`)
      .send({
        "type": "",
        "adj": "test",
        "prompt": "",
        "rating": "test",
        "rewrite": "test"
      });
    expect(resp.statusCode).toEqual(400);
  });
});

describe("DELETE /:username/:id", function () {
  test("works for correct user", async function () {
    const u1 = await User.register({
      username: "u1",
      email: "user1@user.com",
      password: "password1",
    });
    const prompt = await Prompt.create("u1", {
      type: "test",
      adj: "test",
      prompt: "test",
      rating: "test",
      rewrite: "test"
    });
    console.log('prompt auth******');
    console.log(prompt);
    const resp = await request(app)
      .delete(`/prompt/u1/${prompt.id}`)
      .set("authorization", `Bearer ${u1Token}`)
      .send();
    expect(resp.body).toEqual({ deleted: `${prompt.id}` });
  });

  test("unauth for incorrect user", async function () {
    const u1 = await User.register({
      username: "u1",
      email: "user1@user.com",
      password: "password1",
    });
    const prompt = await Prompt.create("u1", {
      type: "test",
      adj: "test",
      prompt: "test",
      rating: "test",
      rewrite: "test"
    });
    console.log('prompt no auth******');
    console.log(prompt);
    const resp = await request(app)
      .delete(`/prompt/u1/${prompt.id}`)
      .set("authorization", `Bearer ${u2Token}`)
      .send();
    expect(resp.statusCode).toEqual(401);
  });
});