"use strict";

/** Shared config for application; can be required many places. */

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";

const PORT = +process.env.PORT || 3001;

// Use dev database, testing database, or via env var, production database
// function getDatabaseUri() {
//   return (process.env.NODE_ENV === "test")
//     ? "postgresql:///prose_test"
//     : process.env.DATABASE_URL || "postgresql:///prose";
// }

// Database configuration using individual environment variables
function getDatabaseUri() {
  const env = process.env.NODE_ENV || "development";

  // Define default values or use environment variables
  const dbUser = process.env.DB_USER || "postgres";
  const dbPassword = process.env.DB_PASSWORD || "password";
  const dbHost = process.env.DB_HOST || "localhost";
  const dbPort = process.env.DB_PORT || 5432;
  const dbName =
    process.env.NODE_ENV === "test"
      ? process.env.TEST_DB_NAME || "prose_test"
      : process.env.DB_NAME || "prose";

  // Construct the database URI
  return `postgresql://${dbUser}:${encodeURIComponent(
    dbPassword
  )}@${dbHost}:${dbPort}/${dbName}`;
}

const BCRYPT_WORK_FACTOR = process.env.NODE_ENV === "test" ? 1 : 13;

// console.log("Config:".green);
// console.log("SECRET_KEY:".yellow, SECRET_KEY);
// console.log("PORT:".yellow, PORT.toString());
// console.log("BCRYPT_WORK_FACTOR".yellow, BCRYPT_WORK_FACTOR);
// console.log("Database:".yellow, getDatabaseUri());
// console.log("---");

console.log("Config:");
console.log("SECRET_KEY:", SECRET_KEY);
console.log("PORT:", PORT.toString());
console.log("BCRYPT_WORK_FACTOR", BCRYPT_WORK_FACTOR);
console.log("Database:", getDatabaseUri());
console.log("---");

module.exports = {
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};
