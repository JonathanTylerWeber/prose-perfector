"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config.js");

/** Related functions for users. */

class User {
  static async getPrompts(username) {
    // Query the database to retrieve prompts associated with the given username
    const promptsRes = await db.query(
      `SELECT id, username, prompt, rating, type, adj, rewrite
       FROM prompts
       WHERE username = $1`,
      [username]
    );

    // If no prompts are found, throw a NotFoundError
    if (promptsRes.rows.length === 0) {
      throw new NotFoundError(`No prompts found for user: ${username}`);
    }

    // Return the array of prompts
    return promptsRes.rows;
  }



  /** authenticate user with username, password.
   *
   * Returns { username, email }
   *
   * Throws UnauthorizedError is user not found or wrong password.
   **/

  static async authenticate(username, password) {
    // try to find the user first
    const result = await db.query(
      `SELECT username,
                  password,
                  email
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = result.rows[0];

    if (user) {
      // compare hashed password to a new hash from password
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid === true) {
        delete user.password;
        return user;
      }
    }

    throw new UnauthorizedError("Invalid username/password");
  }

  /** Register user with data.
   *
   * Returns { username, email }
   *
   * Throws BadRequestError on duplicates.
   **/

  static async register(
    { username, password, email }) {
    const duplicateCheck = await db.query(
      `SELECT username
           FROM users
           WHERE username = $1`,
      [username],
    );

    if (duplicateCheck.rows[0]) {
      throw new BadRequestError(`Duplicate username: ${username}`);
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    const result = await db.query(
      `INSERT INTO users
           (username,
            password,
            email)
           VALUES ($1, $2, $3)
           RETURNING username, email`,
      [
        username,
        hashedPassword,
        email,
      ],
    );

    const user = result.rows[0];

    return user;
  }

  /** Find all users.
   *
   * Returns [{ username, email }, ...]
   **/

  static async findAll() {
    const result = await db.query(
      `SELECT username,
                  email
           FROM users
           ORDER BY username`,
    );

    return result.rows;
  }

  /** Given a username, return data about user.
   *
   * Returns { username, email }
   * 
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(username) {
    const userRes = await db.query(
      `SELECT username,
                  email
           FROM users
           WHERE username = $1`,
      [username],
    );

    const user = userRes.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);

    return user;
  }

  /** Update user data with `data`.
   *
   * This is a "partial update" --- it's fine if data doesn't contain
   * all the fields; this only changes provided ones.
   *
   * Data can include:
   *   { password, email }
   *
   * Returns { username, email }
   *
   * Throws NotFoundError if not found.
   *
   */

  static async update(username, data) {
    let newPassword;

    if (data.password) {
      newPassword = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
    }

    const values = [username];

    let updateFields = '';
    if (data.email) {
      updateFields += 'email = $2';
      values.push(data.email);
    }

    if (newPassword) {
      if (updateFields) updateFields += ', ';
      updateFields += 'password = $3';
      values.push(newPassword);
    }

    const query = `UPDATE users 
                   SET ${updateFields} 
                   WHERE username = $1 
                   RETURNING username, email`;

    try {
      const result = await db.query(query, values);
      const user = result.rows[0];

      if (!user) {
        console.log('not found*******')
        throw new NotFoundError(`No user found with username: ${username}`);
      }

      delete user.password;
      return user;
    } catch (error) {
      console.log(`other error ********${error}`)
      if (error.message.includes("syntax error")) {
        // If the error message indicates a syntax error, throw a BadRequestError
        throw new BadRequestError("Bad request: Invalid data provided");
      } else {
        // Otherwise, re-throw the original error
        throw error;
      }
    }
  }

  /** Delete given user from database; returns undefined. */

  static async remove(username) {
    // Delete related records in the prompts table first
    await db.query(
      `DELETE FROM prompts
       WHERE username = $1`,
      [username]
    );

    // Then delete the user
    let result = await db.query(
      `DELETE FROM users
       WHERE username = $1`,
      [username]
    );

    if (result.rowCount === 0) {
      throw new NotFoundError(`No user: ${username}`);
    }
  }


}


module.exports = User;
