"use strict";

const db = require("../db");
const {
  NotFoundError
} = require("../expressError");

/** Related functions for prompts. */

class Prompt {
  /** Save prompt with data.
   *
   * Returns { id, username, prompt, rating }
   **/

  static async create(username, { prompt, rating, rewrite }) {
    const result = await db.query(
      `INSERT INTO prompts
           (username,
            prompt,
            rating,
            rewrite)
           VALUES ($1, $2, $3, $4)
           RETURNING id, username, prompt, rating, rewrite`,
      [
        username,
        prompt,
        rating,
        rewrite,
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
  }


}

module.exports = Prompt;