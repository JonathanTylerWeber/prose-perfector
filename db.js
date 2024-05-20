"use strict";
/** Database setup for prose. */
const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

let DB_URI = getDatabaseUri();

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;