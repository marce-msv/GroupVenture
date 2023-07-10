'use strict';

import { DataTypes, Model, BuildOptions } from 'sequelize';
import sequelize from './modelDB.js';

export interface ActivityAttributes {
  id?: number;
  title: string;
  createdBy: number;
  date: string;
  meetingPoint: string;
  coordinates: any;
  typeOfActivity: string;
  aboutActivity: string;
  spots: number;
  telegramLink: string;
  UserActivityParticipations?: { userId: number }[] | number[];
}

export interface ActivityModel extends Model<ActivityAttributes>, ActivityAttributes {}
export class ActivityClass extends Model<ActivityModel, ActivityAttributes> {}

export type ActivityStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ActivityModel;
};

const Activity = <ActivityStatic>sequelize.define('Activity', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  meetingPoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinates: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  typeOfActivity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  aboutActivity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spots: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  telegramLink: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Activity;
