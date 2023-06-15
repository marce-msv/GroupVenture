const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("GroupVenture", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

module.exports = sequelize;
