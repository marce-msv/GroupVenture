import { Request, Response, NextFunction } from 'express';
import { UserActivityParticipation } from '../models/associations';

const joinParticipant = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId, activityId } = req.body;
    console.log(req.body.userId);
    console.log(req.body.activityId);
    
    console.log('here1');
    if (!userId || !activityId) {
      res.status(404).json({
        success: false,
        data: null,
        message: 'Bad request.',
      });
      return next();
    }

    console.log('here2');
    await UserActivityParticipation.create({
      userId,
      activityId,
    });

    console.log('here3');
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

export default { joinParticipant, leaveParticipant };
