process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
const db = require("../db");

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

describe("GET /users", function () {
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
        {
          username: "u3",
          email: "user3@user.com",
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

describe("DELETE /users/:username", function () {
  test("works for correct user", async function () {
    const resp = await request(app)
      .delete("/users/u1")
      .set("authorization", `Bearer ${u1Token}`)
      .send();
    expect(resp.body).toEqual({ deleted: "u1" });
  });

  test("unauth for incorrect user", async function () {
    const resp = await request(app)
      .delete("/users/u1")
      .set("authorization", `Bearer ${u2Token}`)
      .send();
    expect(resp.statusCode).toEqual(401);
  });
});
