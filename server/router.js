const router = require("express").Router();
const authMiddleware = require("./middleware/auth");
const {
  usersController,
  activityController,
  userActivityController,
} = require("./controllers/indexController");

router.post("/signup", usersController.postUser);
router.post("/login", usersController.login);
router.post("/logout", usersController.logout);
router.get("/profile/:id", authMiddleware, usersController.getUserInfo);
router.put("/profile/edit/:id", usersController.editUser);


router.post("/activities/join", userActivityController.joinParticipant);
router.post("/activities/leave", userActivityController.leaveParticipant);

router.get("/:id", activityController.getActivityInfo);
router.get("/activities", activityController.getActivities);
router.delete("/delete/:id", activityController.deleteActivity);
router.put("/editactivity/:id", activityController.editActivity);
router.post("/addactivity", activityController.postActivity);

module.exports = router;
