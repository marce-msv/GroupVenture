'use strict';

import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const sequelize = new Sequelize(
  process.env.DB_NAME || 'GroupVenture',
  process.env.DB_USER || 'postgres',
  process.env.DB_PW || 'admin',
  {
    host: 'localhost',
    dialect: 'postgres',
    port: Number(process.env.DB_PORT) || 5432,
    logging: false,
  }
);

(async () => {
  try {
    await sequelize.sync();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Not connected to the database:', error);
  }
})();

export default sequelize;
