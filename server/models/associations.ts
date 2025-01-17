import User from "./user";
import Activity from "./activity";
import UserActivityParticipation from "./userActivityParticipation";

User.hasMany(Activity, {
  foreignKey: "createdBy",
});

User.belongsToMany(Activity, {
  through: UserActivityParticipation,
  foreignKey: "userId",
});

Activity.belongsTo(User, {
  foreignKey: "createdBy",
});
Activity.belongsToMany(User, {
  through: UserActivityParticipation,
  foreignKey: "activityId",
});
Activity.hasMany(UserActivityParticipation, {
  foreignKey: "activityId",
});

export { User, Activity, UserActivityParticipation };
