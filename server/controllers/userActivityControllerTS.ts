import { Request, Response, NextFunction } from 'express';
// @ts-ignore
import { UserActivityParticipation } from '../models/associations';

const joinParticipant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, activityId } = req.body;
    console.log('here');
    if (!userId || !activityId) {
      res.status(404).json({
        success: false,
        data: null,
        message: 'Bad request.',
      });
      return next();
    }

    await UserActivityParticipation.create({
      userId,
      activityId,
    });

    res.status(200).json({
      success: true,
      data: null,
      message: 'User joined the activity.',
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

const leaveParticipant = async (req: Request, res: Response) => {
  try {
    const { userId, activityId } = req.body;

    if (!userId || !activityId) {
      res.status(404).send({
        success: false,
        data: null,
        message: 'Bad request.',
      });
      return;
    }

    await UserActivityParticipation.destroy({
      where: {
        userId: userId,
        activityId: activityId,
      },
    });

    res.status(200).json({
      success: true,
      data: null,
      message: 'User left the activity.',
    });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export { joinParticipant, leaveParticipant };
