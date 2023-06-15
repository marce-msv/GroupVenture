"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const modelDB_js_1 = __importDefault(require("./modelDB.js"));
const UserActivityParticipation = modelDB_js_1.default.define("UserActivityParticipation", {
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    activityId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    indexes: [
        {
            unique: true,
            fields: ["userId", "activityId"],
        },
    ],
});
exports.default = UserActivityParticipation;
