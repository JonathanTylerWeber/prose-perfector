"use strict";

const express = require("express");
const cors = require("cors");

const { NotFoundError } = require("./expressError");

const { authenticateJWT } = require("./middleware/auth");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users");
const submitRoute = require("./routes/submitRequest");
const promptRoutes = require("./routes/prompts");
const healthRoutes = require("./routes/health");

const morgan = require("morgan");

const app = express();

// CORS options
const corsOptions = {
  origin: "https://main.dgbs5jq18o1vy.amplifyapp.com", // Allow only this origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  credentials: true, // Allow credentials (cookies, etc.)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/users", usersRoutes);
app.use("/submit", submitRoute);
app.use("/prompt", promptRoutes);
app.use("/health", healthRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
