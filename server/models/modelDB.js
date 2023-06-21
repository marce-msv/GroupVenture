'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: `.env.${process.env.NODE_ENV}` });
console.log(process.env.DB_NAME);
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME || 'GroupVenture', process.env.DB_USER || 'postgres', process.env.DB_PW || 'admin', {
    host: 'localhost',
    dialect: 'postgres',
    port: Number(process.env.DB_PORT) || 5432,
    logging: false,
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sequelize.sync();
        console.log('Connected to the db at port 5432');
    }
    catch (error) {
        console.error('Not connected to the database:', error);
    }
}))();
exports.default = sequelize;
