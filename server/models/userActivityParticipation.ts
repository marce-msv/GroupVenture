"use strict"

import { DataTypes } from "sequelize";
import sequelize from "./modelDB.js";

const UserActivityParticipation = sequelize.define(
  "UserActivityParticipation",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["userId", "activityId"],
      },
    ],
  }
);

export default UserActivityParticipation;
