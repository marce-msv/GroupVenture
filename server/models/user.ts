"use strict"

import { DataTypes } from "sequelize";
import sequelize from "./modelDB";

const User = sequelize.define("User", {
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  infoAboutUser: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default User;
