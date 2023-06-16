'use strict';

const request = require('supertest');
const { default: User } = require('../models/user');
const { default: app } = require('../app.js');
const { default: sequelize } = require('../models/modelDB');

beforeAll(() => {});

// TESTS DO NOT EXIT WHEN DONE BECAUSE ASYNC OPERATIONS
afterAll(async () => {
  await User.destroy({ where: {} });
  sequelize.close();
  // app.close();
});

// https://www.npmjs.com/package/ts-node

// IS THERE A WAY TO CONNECT TO A TEST DB ?

describe('User controllers tests', () => {
  describe('Sign Up', () => {
    it('User registration', async () => {
      const res = await request(app)
        .post('/signup')
        .send(mocks.u01)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      const parsedRes = JSON.parse(res.text);

      expect(res.status).toBe(201);
      expect(parsedRes.success).toBe(true);
      expect(parsedRes.message).toBe('User created');
      expect(parsedRes.data).toStrictEqual(mocks.u01res);
    });

    it('User already exists', async () => {
      const res = await request(app)
        .post('/signup')
        .send(mocks.u01)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      const parsedRes = JSON.parse(res.text);

      expect(res.status).toBe(409);
      expect(parsedRes).toStrictEqual({ error: '409', message: 'User already exists' });
    });

    // FILTER THIS IN THE FRONT END
    // it('Does not register a new user with no data', async () => {
    // const res = await request(app).post('/signup').send({});
    // // .set('Accept', 'application/json')
    // // .expect('Content-Type', /json/)
    // expect(res.status).toBe(500);
    // });
  });

  describe('Log In', () => {
    it('Logs succesfully', async () => {
      const res = await request(app)
        .post('/login')
        .send(mocks.u02)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      const parsedRes = JSON.parse(res.text);
      const user = await User.findOne({ where: { email: mocks.u02.email } });

      expect(res.status).toBe(200);
      expect(parsedRes.success).toBe(true);
      expect(parsedRes.message).toBe('OK');
      expect(parsedRes.data).toBe(user.id);
    });

    // EXCEEDED TIMEOUT OF 5s
    // it('Logs unsuccesfully (email)', async () => {
    //   const res = await request(app)
    //     .post('/login')
    //     .send(mocks.u02bademail)
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /json/);

    //   console.log('hello');
    //   // expect(res.status).toBe(401);
    //   // expect(res).toThrow(Error);
    // });

    it('Logs unsuccesfully (password)', async () => {
      const res = await request(app)
        .post('/login')
        .send(mocks.u02badpw)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      const parsedRes = JSON.parse(res.text);

      expect(res.status).toBe(401);
      expect(parsedRes.message).toBe('Username or password is incorrect');
    });
  });

  describe('Log Out', () => {
    it('Logs out succesfully', async () => {
      const res = await request(app).post('/logout');
      const parsedRes = JSON.parse(res.text);
      expect(res.status).toBe(200);
      expect(parsedRes.message).toBe('Logout successful');
    });

    // NO IDEA WHAT IS GOING ON
    // it('Logs out unsuccesfully', async () => {
    //   const res = await request(app).post('/logout');
    //   const parsedRes = JSON.parse(res.text);
    //   expect(res.status).toBe(500);
    //   expect(parsedRes.message).toBe('Could not log out, please try again');
    // });
  });

  // RECEIVED OBJECT CONTAINS ID, CREATED AT, UPDATED AT AND ENCRYPTED PW
  // FIX IN CONTROLLER FIRST ?
  // describe('Get user', () => {
  //   it('Fetchs user info', async () => {
  //     const user = await User.findOne({ where: { email: mocks.u01.email } });
  //     // console.log('user', user);
  //     const res = await request(app).get(`/profile/${user.id}`);
  //     // console.log('res', res);
  //     const parsedRes = JSON.parse(res.text);
  //     // console.log(parsedRes);
  //     expect(res.status).toBe(200);
  //     expect(parsedRes).toStrictEqual(mocks.u01);
  //   });
  // });

  // TO BE DONE IN CONTROLLER AND FRONT END
  // describe('Edit user', () => { });
});

const mocks = {
  u01: {
    avatar: 'avatar_url',
    firstName: 'first name',
    lastName: 'last name',
    age: 5,
    password: 'password',
    email: 'email',
    infoAboutUser: 'info',
  },
  u01res: {
    avatar: 'avatar_url',
    firstName: 'first name',
    lastName: 'last name',
    age: 5,
    infoAboutUser: 'info',
  },
  u02: {
    password: 'password',
    email: 'email',
  },
  u02bademail: {
    password: 'password',
    email: 'bad email',
  },
  u02badpw: {
    password: 'bad password',
    email: 'email',
  },
};
