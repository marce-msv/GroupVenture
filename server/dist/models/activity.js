'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityClass = void 0;
const sequelize_1 = require("sequelize");
const modelDB_js_1 = __importDefault(require("./modelDB.js"));
class ActivityClass extends sequelize_1.Model {
}
exports.ActivityClass = ActivityClass;
const Activity = modelDB_js_1.default.define('Activity', {
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    meetingPoint: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    coordinates: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false,
    },
    typeOfActivity: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    aboutActivity: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    spots: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    telegramLink: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
});
exports.default = Activity;
