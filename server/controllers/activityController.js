'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const associations_1 = require("../models/associations");
const postActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, date, meetingPoint, coordinates, typeOfActivity, aboutActivity, spots, telegramLink, createdBy, } = req.body;
    try {
        const activity = yield associations_1.Activity.create({
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
        const safeActivity = {
            title: activity.title,
            date: activity.date,
            meetingPoint: activity.meetingPoint,
            coordinates: activity.coordinates,
            typeOfActivity: activity.typeOfActivity,
            aboutActivity: activity.aboutActivity,
            spots: activity.spots,
            telegramLink: activity.telegramLink,
            createdBy: activity.createdBy,
        };
        res.status(201).json(safeActivity);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});
const getActivities = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activities = yield associations_1.Activity.findAll({
            include: [
                {
                    model: associations_1.UserActivityParticipation,
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
            let participations = activity.dataValues.UserActivityParticipations.map((participation) => participation.userId);
            const newActivity = Object.assign({}, activity.dataValues);
            newActivity.UserActivityParticipations = participations;
            return newActivity;
        });
        res.status(200).json({
            success: true,
            data: processedActivities,
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const getActivityInfo = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const activityId = req.params.id;
            const activity = yield associations_1.Activity.findOne({
                where: { id: activityId },
                include: [
                    {
                        model: associations_1.UserActivityParticipation,
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
            const participations = activity.dataValues.UserActivityParticipations.map((participation) => participation.userId);
            const newActivity = Object.assign({}, activity.dataValues);
            newActivity.UserActivityParticipations = participations;
            res.status(200).json(newActivity);
        }
        catch (err) {
            // console.log(err);
            res.status(500).json({ message: err.message });
        }
    });
};
const deleteActivity = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.id;
            // console.log(id);
            if (!id)
                res.status(400).json({
                    success: false,
                    data: id,
                    message: 'wrong id',
                });
            let activity = yield associations_1.Activity.destroy({ where: { id: id } });
            res.json(activity);
        }
        catch (err) {
            // console.log(err);
            res.status(400).json({ message: err.message });
        }
    });
};
const editActivity = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id, info } = req.body;
        try {
            yield associations_1.Activity.update(info, { where: { id: id } });
            const updatedActivity = yield associations_1.Activity.findByPk(id);
            res.status(200).json(updatedActivity);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    });
};
exports.default = { postActivity, getActivities, getActivityInfo, deleteActivity, editActivity };
