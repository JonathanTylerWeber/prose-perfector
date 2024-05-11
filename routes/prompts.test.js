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

// describe("DELETE /:username/:id", function () {
//   test("works for correct user", async function () {
//     const resp = await request(app)
//       .delete("/u1/1")
//       .set("authorization", `Bearer ${u1Token}`)
//       .send();
//     expect(resp.body).toEqual({ message: "Prompt deleted successfully" });
//   });

//   test("unauth for incorrect user", async function () {
//     const resp = await request(app)
//       .delete("/u1/1")
//       .set("authorization", `Bearer ${u2Token}`)
//       .send();
//     expect(resp.statusCode).toEqual(401);
//   });
// });