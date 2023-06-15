"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const activity_1 = __importDefault(require("./activity"));
const userActivityParticipation_1 = __importDefault(require("./userActivityParticipation"));
user_1.default.hasMany(activity_1.default, {
    foreignKey: "createdBy",
});
user_1.default.belongsToMany(activity_1.default, {
    through: userActivityParticipation_1.default,
    foreignKey: "userId",
});
activity_1.default.belongsTo(user_1.default, {
    foreignKey: "createdBy",
});
activity_1.default.belongsToMany(user_1.default, {
    through: userActivityParticipation_1.default,
    foreignKey: "activityId",
});
activity_1.default.hasMany(userActivityParticipation_1.default, {
    foreignKey: "activityId",
});
// UserActivityParticipation.belongsTo(Activity, {
//   foreignKey: "activityId",
// });
exports.default = { User: user_1.default, Activity: activity_1.default, UserActivityParticipation: userActivityParticipation_1.default };
