const Sequelize = require("sequelize");
const db = require("../db");

const Image = db.define("image", {
  url: Sequelize.TEXT,
  title: Sequelize.TEXT
});

module.exports = Image;
