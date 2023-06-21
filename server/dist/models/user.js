'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClass = void 0;
const sequelize_1 = require("sequelize");
const modelDB_1 = __importDefault(require("./modelDB"));
class UserClass extends sequelize_1.Model {
}
exports.UserClass = UserClass;
const User = modelDB_1.default.define('User', {
    avatar: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    infoAboutUser: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
});
exports.default = User;
