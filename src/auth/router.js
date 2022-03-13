"use strict";
const express = require("express");
const router = express.Router();
const { Users } = require("../models/index.js");
const bcrypt = require("bcrypt");
const basicAuth = require("./middleware/basic.js");
const bearerAuth = require("./middleware/bearer.js");

router.post("/signup", signUpFunction);
router.post("/signin", basicAuth, signInFunction);
router.get("/users", bearerAuth, userFunction);

async function signUpFunction(req, res) {
  const reqBody = req.body;
  const userName = reqBody.username;
  const password = reqBody.password;
  try {
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = await Users.create({
      username: userName,
      password: hashedPassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(`input invalid`);
  }
}

async function signInFunction(req, res) {
  res.status(200).json(req.user);
}
async function userFunction(req, res) {
  res.status(200).json(req.user);
}

module.exports = router;
