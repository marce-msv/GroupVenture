"use strict"

import { Sequelize } from "sequelize";

const sequelize = new Sequelize("GroupVenture", "postgres", "2603", {
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  logging: false,
});

export default sequelize;
