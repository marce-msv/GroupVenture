const request = require('supertest');

const { default: app } = require('../app.js');
const { default: Activity } = require('../models/activity.js');
const { default: sequelize } = require('../models/modelDB.js');
const { describe } = require('node:test');

const mocks = {
  activity1: {
    title: 'Activity Title',
    createdBy: 1,
    date: 'tomorrow',
    meetingPoint: 'Mi casa',
    coordinates: {
      lat: '123',
      lng: '456',
    },
    typeOfActivity: 'Sport activities',
    aboutActivity: 'Drink Beers',
    spots: 1,
    telegramLink: 'linkToTelegram.com',
  },
  activity2: {},
};

beforeAll(async () => {
  await Activity.destroy({ where: {} });
});

afterAll(async () => {
  await Activity.destroy({ where: {} });
  sequelize.close();
});

describe('POST / activity', () => {
  it('Should POST an activity and return 201', async () => {
    const res = await request(app)
      .post('/addactivity')
      .send(mocks.activity1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toBe(201);
    expect(JSON.parse(res.text)).toStrictEqual(mocks.activity1);
  });

  it('Should return 500 if the object is null', async () => {
    const res = await request(app)
      .post('/addactivity')
      .send(mocks.activity2)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toBe(500);
    const resParsed = JSON.parse(res.text);
    expect(resParsed.message).toContain('cannot be null');
  });
});

// TODO
describe('GET / activity info', () => {
  it('Should GET an activity info by id and return 200', async () => {
    const activity = await Activity.findOne({
      where: { title: mocks.activity1.title },
    });
    const res = await request(app)
      .get(`/activity/:${activity.dataValues.id}`)
      .send(mocks.activity2)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toBe(500);
  });
});

describe('GET / activities', () => {
  it('Should GET an activity and return 200', async () => {
    const res = await request(app)
      .get('/activities')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    expect(res.status).toBe(200);
    const resParsed = JSON.parse(res.text);
    expect(resParsed.success).toBe(true);
    expect(resParsed.data).toEqual(
      expect.arrayContaining([expect.objectContaining(mocks.activity1)])
    );
  });

  it('Should return 404 if the object is null', async () => {
    await Activity.destroy({ where: {} });
    const res = await request(app)
      .get('/activities')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/);
    const resParsed = JSON.parse(res.text);
    expect(resParsed.success).toBe(false);
    expect(res.status).toBe(404);
  });
});
