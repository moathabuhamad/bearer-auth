"use strict";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET = process.env.SECRET;

const UsersModel = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.VIRTUAL,
    },
  });
  Users.authenticate = async function (username, password) {
    try {
      const user = await this.findOne({ where: { username: username } });
      const valid = await bcrypt.compare(password, user.password);
      if (valid) {
        let token = jwt.sign(
          { exp: Math.floor(Date.now() / 1000) + 500, username: user.username },
          SECRET,
        );
        user.token = token;
        return user;
      } else {
        throw new Error("wrong password");
      }
    } catch (error) {
      throw new Error("wrong username");
    }
  };
  Users.verifyToken = async function (token) {
    let validToken = jwt.verify(token, SECRET);
    try {
      let user = await this.findOne({
        where: { username: validToken.username },
      });
      return user;
    } catch (err) {
      throw new Error(`wrong token ${err}`);
    }
  };
  return Users;
};
module.exports = UsersModel;
