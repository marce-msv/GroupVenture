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
const bcrypt_1 = __importDefault(require("bcrypt"));
const associations_1 = require("../models/associations");
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.email)
        return res.status(409).send({ error: '409', message: 'Missing input email' });
    if (!req.body.password)
        return res.status(409).send({ error: '409', message: 'Missing input password' });
    const { password, email } = req.body;
    const user = yield associations_1.User.findOne({ where: { email: email } });
    if (user)
        return res.status(409).send({ error: '409', message: 'User already exists' });
    try {
        const hash = yield bcrypt_1.default.hash(password, 10);
        const user = yield associations_1.User.create(Object.assign(Object.assign({}, req.body), { password: hash }));
        let safeUser = {
            id: user.id,
            avatar: user.avatar,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age,
            infoAboutUser: user.infoAboutUser,
        };
        res.status(201).json({
            success: true,
            data: safeUser,
            message: 'User created',
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield associations_1.User.findOne({ where: { email: email } });
        if (!user)
            throw new Error();
        const validatedPass = yield bcrypt_1.default.compare(password, user.password);
        if (!validatedPass)
            throw new Error();
        req.session.uid = user.id;
        res.status(200).send({ success: true, data: user.id, message: 'OK' });
    }
    catch (err) {
        console.log(err);
        res.status(401).send({ error: '401', message: 'Username or password is incorrect' });
    }
});
const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send({ error, message: 'Could not log out, please try again' });
        }
        else {
            res.clearCookie('sid').status(200).send({ message: 'Logout successful' });
        }
    });
};
const getUserInfo = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let user = yield associations_1.User.findOne({ where: { id: req.params.id } });
            if (user) {
                let safeUser = {
                    id: req.params.id,
                    avatar: user.avatar,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    age: user.age,
                    email: user.email,
                    infoAboutUser: user.infoAboutUser,
                };
                res.status(200).json(safeUser);
            }
        }
        catch (err) {
            console.error(err);
            res.status(400).send({ error: '400', message: 'Bad user request' });
        }
    });
};
const editUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.body;
        try {
            const user = yield associations_1.User.findByPk(id);
            console.error(user);
            const userUpdated = yield (user === null || user === void 0 ? void 0 : user.update(req.body.info));
            res.status(200).json(userUpdated);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: err.message });
        }
    });
};
exports.default = { postUser, getUserInfo, login, logout, editUser };
