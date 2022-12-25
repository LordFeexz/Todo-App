if (process.env.Node_ENV !== "production") require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/router");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(
  cors({
    methods: ["GET", "HEAD", "POST", "PATCH", "DELETE", "PUT"],
    origin: "http://localhost:3000",
  })
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorHandler);

module.exports = app;
