import routes from "express"
import authMiddleware from "./middleware/auth.js";
const router = routes.Router();

const {
  usersController,
  activityController,
  userActivityController,
} = require("./controllers/indexController");

router.post("/addactivity", activityController.postActivity);
router.post("/signup", usersController.postUser);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.post("/activities/join", userActivityController.joinParticipant);
router.post("/activities/leave", userActivityController.leaveParticipant);
// router.get("/profile/:id", authMiddleware, usersController.getUserInfo);
router.get("/activities", activityController.getActivities);
router.get("/:id", activityController.getActivityInfo);
router.delete("/delete/:id", activityController.deleteActivity);
router.put("/profile/edit/:id", usersController.editUser);
router.put("/editactivity/:id", activityController.editActivity);

export default router;
