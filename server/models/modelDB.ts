"use strict"

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("GroupVenture", "postgres", "admin", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

export default sequelize;
