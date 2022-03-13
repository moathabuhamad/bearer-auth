"use strict";
const { Users } = require("../../models/index.js");

module.exports = async (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      let user = await Users.verifyToken(token);
      if (user) {
        req.user = user;
        next();
      }
      else{
        res.status(403).send("undefined")
      }
    } catch (err) {
      res.status(403).send({message:`${err} invalid user`});
    }
  }else{
    next();
  }
};
