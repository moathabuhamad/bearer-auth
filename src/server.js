"use strict";
const express = require("express");
const router = require("./auth/router.js");
const serverError = require("./middleware/500.js");
const pageNotfound = require("./middleware/404.js");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(router);
app.use(cors());
app.get("/", homepageHandler);

function homepageHandler(req, res) {
  res.status(200).send("HOME!");
}

app.use("*", pageNotfound);
app.use(serverError);

function start(port) {
  app.listen(port, () => {
    console.log(`listening to port ${port}`)
  });
}

module.exports = {
  app: app,
  start: start,
};
