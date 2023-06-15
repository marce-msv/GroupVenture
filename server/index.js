"use strict";
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
const express_1 = __importDefault(require("express"));
const modelDB_js_1 = __importDefault(require("./models/modelDB.js"));
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
// Sync models with database and connect to server
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield modelDB_js_1.default.sync();
        console.log('Connected to the db at port 5432');
        // Start server
        const port = 3333;
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    }
    catch (error) {
        console.error('NOT CONNECTED to the database:', error);
    }
}))();
