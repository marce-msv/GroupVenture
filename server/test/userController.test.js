'use strict';

const request = require('supertest');
const { default: User } = require('../models/user');
const { default: app } = require('../app.js');
const { default: sequelize } = require('../models/modelDB');

beforeAll(async () => {
  await User.destroy({ where: {} });
});

afterAll(async () => {
  await User.destroy({ where: {} });
  sequelize.close();
});

describe('User controllers tests', () => {
  //
  describe('Sign Up', () => {
    //
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
      expect(parsedRes.data).toMatchObject(mocks.u01res);
    });
    //
    it('User already exists', async () => {
      const res = await request(app)
        .post('/signup')
        .send(mocks.u01)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      const parsedRes = JSON.parse(res.text);
      expect(res.status).toBe(409);
      expect(parsedRes.message).toBe('User already exists');
    });
    //
    it('User with no email', async () => {
      const res = await request(app)
        .post('/signup')
        .send({})
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      const parsedRes = JSON.parse(res.text);
      expect(res.status).toBe(409);
      expect(parsedRes.message).toBe('Missing input email');
    });
    //
    it('User with no password', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ email: 'email' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      const parsedRes = JSON.parse(res.text);
      expect(res.status).toBe(409);
      expect(parsedRes.message).toBe('Missing input password');
    });
    //
    it('User without required data', async () => {
      const res = await request(app)
        .post('/signup')
        .send({ email: 'email no data', password: 'password' })
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      const parsedRes = JSON.parse(res.text);
      expect(res.status).toBe(500);
      expect(parsedRes.message).toContain('cannot be null');
    });
    //
  });
  //
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
    //
    it('Logs unsuccesfully (email)', async () => {
      const res = await request(app)
        .post('/login')
        .send(mocks.u02bademail)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);
      const parsedRes = JSON.parse(res.text);
      expect(res.status).toBe(401);
      expect(parsedRes.message).toBe('Username or password is incorrect');
    });
    //
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
    //
  });
  //
  describe('Log Out', () => {
    //
    it('Logs out succesfully', async () => {
      const res = await request(app).post('/logout');
      const parsedRes = JSON.parse(res.text);
      expect(res.status).toBe(200);
      expect(parsedRes.message).toBe('Logout successful');
    });
    //
    // NO IDEA HOW TO DEAL WITH UNSUCESSFUL LOG OUT
    // it('Logs out unsuccesfully', async () => {
    //   const res = await request(app).post('/logout');
    //   const parsedRes = JSON.parse(res.text);
    //   expect(res.status).toBe(500);
    //   expect(parsedRes.message).toBe('Could not log out, please try again');
    // });
    //
  });
  //
  // HOW TO TEST THE AUTHENTICATION MIDDLEWARE ?
  describe('Get user', () => {
    //
    it('Fetchs user info', async () => {
      const user = await User.findOne({ where: { email: mocks.u01.email } });
      const res = await request(app).get(`/profile/${user.id}`);
      const parsedRes = JSON.parse(res.text);
      expect(res.status).toBe(200);
      expect(parsedRes).toStrictEqual({ ...mocks.u01res, email: user.email, id: '' + user.id });
    });
    //
    it('Does not fetch with wrong id ', async () => {
      const res = await request(app).get(`/profile/potatoe`);
      const parsedRes = JSON.parse(res.text);
      expect(res.status).toBe(400);
      expect(parsedRes.message).toBe('Bad user request');
    });
    //
  });
  //
  // HOW IS THIS CONTROLLER WORKING ?
  // describe('Edit user', () => {});
  //
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
  u01resInfo: {
    avatar: 'avatar_url',
    firstName: 'first name',
    lastName: 'last name',
    age: 5,
    email: 'email',
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
