process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");

// const {
//   commonBeforeAll,
//   commonBeforeEach,
//   commonAfterEach,
//   commonAfterAll,
//   u1Token,
//   u2Token,
// } = require("./_testCommon");

beforeAll(async () => {

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
  const users = await db.query("SELECT * FROM users");
  console.log("users:", users.rows);
});
afterAll(async () => {
  await db.query("DELETE FROM users");
  await db.end();
});

const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });

describe("GET /users", function () {
  beforeAll(async () => {
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
  });
  test("works", async function () {
    const resp = await request(app).get("/users").send({ _token: u1Token });
    expect(resp.body).toEqual({
      users: [
        {
          username: "u1",
          email: "user1@user.com",
        },
        {
          username: "u2",
          email: "user2@user.com",
        },
      ],
    });
  });
});

describe("GET /users/:username", function () {
  test("works for correct user", async function () {
    const resp = await request(app)
      .get("/users/u1")
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        email: "user1@user.com",
      },
    });
  });

  test("unauth for incorrect user", async function () {
    const resp = await request(app)
      .get("/users/u1")
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });
});

describe("PATCH /users/:username", function () {
  test("works for correct user", async function () {
    const resp = await request(app)
      .patch("/users/u1")
      .set("authorization", `Bearer ${u1Token}`)
      .send({ email: "newemail@example.com" });
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        email: "newemail@example.com",
      },
    });
  });

  test("unauth for incorrect user", async function () {
    const resp = await request(app)
      .patch("/users/u1")
      .set("authorization", `Bearer ${u2Token}`)
      .send({ email: "newemail@example.com" });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request with invalid data", async function () {
    const resp = await request(app)
      .patch("/users/u1")
      .set("authorization", `Bearer ${u1Token}`)
      .send({ email: 42 });
    expect(resp.statusCode).toEqual(400);
  });
});


