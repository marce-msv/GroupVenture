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
Object.defineProperty(exports, "__esModule", { value: true });
const associations_1 = require("../models/associations");
const joinParticipant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield associations_1.UserActivityParticipation.create({
            userId,
            activityId,
        });
        res.status(200).json({
            success: true,
            data: null,
            message: 'User joined the activity.',
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
const leaveParticipant = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield associations_1.UserActivityParticipation.destroy({
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
});
exports.default = { joinParticipant, leaveParticipant };
