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
const auth_js_1 = require("./middleware/auth.js");
const router = express_1.default.Router();
const indexController_1 = require("./controllers/indexController");
router.get('/test', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200);
    res.json({ message: 'pass!' });
}));
// User
router.post('/signup', indexController_1.usersController.postUser);
router.post('/login', indexController_1.usersController.login);
router.post('/logout', indexController_1.usersController.logout);
router.get('/profile/:id', auth_js_1.authMiddleware, indexController_1.usersController.getUserInfo);
router.put('/profile/edit/:id', indexController_1.usersController.editUser);
// Activity
router.post('/addactivity', indexController_1.activityController.postActivity);
router.get('/activities', indexController_1.activityController.getActivities);
router.get('/activity/:id', indexController_1.activityController.getActivityInfo); // TODO ==> CHANGE FE ROUTE
router.delete('/delete/:id', indexController_1.activityController.deleteActivity);
router.put('/editactivity/:id', indexController_1.activityController.editActivity);
// User activity
router.post('/activities/join', indexController_1.userActivityController.joinParticipant);
router.post('/activities/leave', indexController_1.userActivityController.leaveParticipant);
exports.default = router;
