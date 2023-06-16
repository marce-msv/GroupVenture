'use strict';

import { Request, Response, NextFunction } from 'express';
import { Activity, UserActivityParticipation } from '../models/associations';

const postActivity = async (req: Request, res: Response) => {
  const {
    title,
    date,
    meetingPoint,
    coordinates,
    typeOfActivity,
    aboutActivity,
    spots,
    telegramLink,
    createdBy,
  } = req.body;
  try {
    const activity = await Activity.create({
      title,
      date,
      meetingPoint,
      coordinates,
      typeOfActivity,
      aboutActivity,
      spots,
      telegramLink,
      createdBy,
    });
    res.status(201).json(activity);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const getActivities = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: UserActivityParticipation,
          attributes: ['userId'],
        },
      ],
    });

    if (!activities.length) {
      res.status(404).json({
        success: false,
        data: null,
        message: 'Activities not found.',
      });
      return next();
    }

    const processedActivities = activities.map((activity) => {
      let participations = (
        activity.dataValues.UserActivityParticipations as { userId: number }[]
      ).map((participation: { userId: number }) => participation.userId);

      const newActivity = Object.assign({}, activity.dataValues);
      newActivity.UserActivityParticipations = participations;

      return newActivity;
    });

    res.status(200).json({
      success: true,
      data: processedActivities,
    });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const getActivityInfo = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const activityId = req.params.id;

    const activity = await Activity.findOne({
      where: { id: activityId },
      include: [
        {
          model: UserActivityParticipation,
          attributes: ['userId'],
        },
      ],
    });

    if (!activity) {
      res.status(404).json({
        success: false,
        data: null,
        message: 'Activities not found.',
      });
      return next();
    }

    const participations = (
      activity.dataValues.UserActivityParticipations as { userId: number }[]
    ).map((participation: { userId: number }) => participation.userId);
    const newActivity = Object.assign({}, activity.dataValues);
    newActivity.UserActivityParticipations = participations;

    res.status(200).json(newActivity);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const deleteActivity = async function (req: Request, res: Response) {
  try {
    const id = req.params.id;
    console.log(id);
    if (!id)
      res.status(400).json({
        success: false,
        data: id,
        message: 'wrong id',
      });
    let activity = await Activity.destroy({ where: { id: id } });
    res.json(activity);
  } catch (err: any) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const editActivity = async function (req: Request, res: Response) {
  const { id, info } = req.body;
  console.log(req.body);
  try {
    const rowsAffected = await Activity.update(info, { where: { id: id } });
    const actUpdated = await Activity.findByPk(id);
    res.status(200).json(actUpdated);
  } catch (err: any) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export default { postActivity, getActivities, getActivityInfo, deleteActivity, editActivity };
