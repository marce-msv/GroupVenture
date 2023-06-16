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
Object.defineProperty(exports, "__esModule", { value: true });
const associations_1 = require("../models/associations");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.session;
        if (!uid) {
            throw new Error('No session uid');
        }
        const user = yield associations_1.User.findOne({ where: { id: uid } });
        if (!user) {
            throw new Error();
        }
        req.user = user;
        next();
    }
    catch (err) {
        console.log(err);
        // return res.sendStatus(401);
        // or this?
        res.status(401).json({ message: err.message });
    }
});
exports.default = authMiddleware;
