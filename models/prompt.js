"use strict";

const db = require("../db");
const {
  NotFoundError
} = require("../expressError");

/** Related functions for prompts. */

class Prompt {

  static async findAll() {
    const result = await db.query(
      `SELECT * FROM "prompts"`
    )
    return result.rows;
  }

  /** Save prompt with data.
   *
   * Returns { id, username, prompt, rating }
   **/

  static async create(username, { prompt, rating, rewrite, type, adj }) {
    const result = await db.query(
      `INSERT INTO prompts
           (username,
            prompt,
            rating,
            rewrite,
            type,
            adj)
           VALUES ($1, $2, $3, $4, $5, $6)
           RETURNING id, username, prompt, rating, rewrite, type, adj`,
      [
        username,
        prompt,
        rating,
        rewrite,
        type,
        adj
      ],
    );

    const promptData = result.rows[0];

    return promptData;
  }

  /** Delete prompt with id. */

  static async delete(id) {
    const result = await db.query(
      `DELETE
           FROM prompts
           WHERE id = $1
           RETURNING id`,
      [id],
    );

    if (!result.rows[0]) throw new NotFoundError(`No prompt with id: ${id}`);
    return { message: "Prompt deleted successfully" };
  }


}

module.exports = Prompt;