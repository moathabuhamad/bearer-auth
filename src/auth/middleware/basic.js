"use strict";
const base64 = require("base-64");
const { Users } = require("../../models/index.js");


module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    let headerSplit = req.headers.authorization.split(" ");
    let encoded = headerSplit[1];
    let decoded = base64.decode(encoded);
    let [userName, password] = decoded.split(":");
    try {
      let validUser = await Users.authenticate(userName, password);
      req.user = validUser;
      console.log(validUser,"**********************************");
      next();
    } catch (err) {
      res.status(403).send(`invalid input ${err}`);
    }
  } else {
    next('error');
  }
};
