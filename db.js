"use strict";
/** Database setup for prose. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///prose_test";
} else {
  DB_URI = "postgresql:///prose";
}

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;