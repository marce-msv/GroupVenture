"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("./middleware/auth.js");
const router = express_1.default.Router();
const indexController_1 = require("./controllers/indexController");
// User
router.post('/signup', indexController_1.usersController.postUser);
router.post('/login', indexController_1.usersController.login);
router.post('/logout', indexController_1.usersController.logout);
router.get('/profile/:id', indexController_1.usersController.getUserInfo);
router.get('/profile/:id', auth_js_1.authMiddleware, indexController_1.usersController.getUserInfo);
router.put('/profile/edit/:id', indexController_1.usersController.editUser);
// Activity
router.post('/addactivity', indexController_1.activityController.postActivity);
router.get('/activities', indexController_1.activityController.getActivities);
router.get('/activity/:id', indexController_1.activityController.getActivityInfo);
router.delete('/delete/:id', indexController_1.activityController.deleteActivity);
router.put('/editactivity/:id', indexController_1.activityController.editActivity);
// User activity
router.post('/activities/join', indexController_1.userActivityController.joinParticipant);
router.post('/activities/leave', indexController_1.userActivityController.leaveParticipant);
exports.default = router;
