import routes from 'express';
import { authMiddleware } from './middleware/auth.js';
const router = routes.Router();

import {
  usersController,
  activityController,
  userActivityController,
} from './controllers/indexController';

// User
router.post('/signup', usersController.postUser);
router.post('/login', usersController.login);
router.post('/logout', usersController.logout);
router.get('/profile/:id', authMiddleware, usersController.getUserInfo);
router.put('/profile/edit/:id', usersController.editUser);

// Activity
router.post('/addactivity', activityController.postActivity);
router.get('/activities', activityController.getActivities);
router.get('/:id', activityController.getActivityInfo);
router.delete('/delete/:id', activityController.deleteActivity);
router.put('/editactivity/:id', activityController.editActivity);

// User activity
router.post('/activities/join', userActivityController.joinParticipant);
router.post('/activities/leave', userActivityController.leaveParticipant);

export default router;
