"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_js_1 = __importDefault(require("./router.js"));
const express_session_1 = __importDefault(require("express-session"));
const app = (0, express_1.default)();
const corsConfig = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use((0, express_session_1.default)({
    name: 'sid',
    cookie: {
        httpOnly: false,
        secure: false,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 60,
    },
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
}));
app.use((0, cors_1.default)(corsConfig));
app.use(express_1.default.json());
app.use('/', router_js_1.default);
app.get('*', (req, res) => {
    res.status(404).send('Sorry, not found 😞');
});
exports.default = app;
