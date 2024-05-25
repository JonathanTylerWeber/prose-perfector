"use strict";
/** Database setup for prose. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let DB_URI = getDatabaseUri();

let db = new Client({
  connectionString: DB_URI
});

db.connect()
  .then(() => console.log("Connected to the database"))
  .catch(err => console.error("Database connection error:", err.stack));

module.exports = db;