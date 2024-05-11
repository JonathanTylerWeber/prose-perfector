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

describe("POST /submit/rating", function () {
  test("works", async function () {
    const resp = await request(app)
      .post("/submit/rating")
      .set("authorization", `Bearer ${u1Token}`)
      .send({
        "type": "test",
        "adj": "test",
        "prompt": "test",
        "rating": "test",
        "rewrite": "test"
      });
    expect(resp.body).toEqual({
      "id": expect.any(String),
      "object": "chat.completion",
      "created": expect.any(Number),
      "model": "gpt-3.5-turbo-0125",
      "choices": [
        {
          "index": 0,
          "message": {
            "role": "assistant",
            "content": expect.any(String),
          },
          "logprobs": null,
          "finish_reason": "stop"
        }
      ],
      "usage": {
        "prompt_tokens": expect.any(Number),
        "completion_tokens": expect.any(Number),
        "total_tokens": expect.any(Number),
      },
      "system_fingerprint": null
    });
  });
});
