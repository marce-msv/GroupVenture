'use strict';

import { DataTypes, Model, BuildOptions } from 'sequelize';
import sequelize from './modelDB';

export interface UserAttributes {
  id?: number;
  avatar: string;
  firstName: string;
  lastName: string;
  age: number;
  password: string;
  email: string;
  infoAboutUser: string;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class UserClass extends Model<UserModel, UserAttributes> {}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

const User = <UserStatic>sequelize.define('User', {
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  infoAboutUser: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default User;
