const express = require('express') ;
const request = require('supertest') ;
const router = require('../router.js') ;
const { Sequelize } = require("sequelize") ;
// const User = require('../models/user') ;
const { describe, it } = require('node:test') ;

const database = 'test';

describe('User controllers tests', () => {
  const app = express();

  app.use(express.json());
  app.use(router);
  // const request = supertest(app);

  beforeAll(async () => {
    const sequelize = new Sequelize(database, "postgres", "2603", {
      host: "localhost",
      dialect: "postgres",
      port: 5432,
      logging: false,
    });

    await sequelize.sync();
    console.log('Testing testing  1 2 3')
  })

  // afterEach(() => console.log('finished running a test'));
  // it('is a subtest', () => {
  //   assert.ok('some relevant assertion here');
  // });

  // it('Testing how tests works', async () => {
  //   console.log('This is it')
  // })

  it('Should return 401 error for invalid user auth', async () => {
    const { body } = await request(server)
      .patch('/api/favorites/')
      .set('Authorization', 'Bearer ' + testToken + 'X')
      .expect('Content-Type', /json/)
      .send({ favoriteId: dbListing.id })
      .expect(401);
    expect(body.error).toBe(USER_NOT_AUTHENTICATED);
    console.log(body);
  });
});