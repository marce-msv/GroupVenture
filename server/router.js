"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { usersController, activityController, userActivityController, } = require("./controllers/indexController");
router.post("/addactivity", activityController.postActivity);
router.post("/signup", usersController.postUser);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/profile/:id", authMiddleware, usersController.getUserInfo);
router.put("/profile/edit/:id", usersController.editUser);


router.post("/activities/join", userActivityController.joinParticipant);
router.post("/activities/leave", userActivityController.leaveParticipant);
// router.get("/profile/:id", authMiddleware, usersController.getUserInfo);
router.get("/activities", activityController.getActivities);
router.delete("/delete/:id", activityController.deleteActivity);
router.put("/editactivity/:id", activityController.editActivity);
exports.default = router;
