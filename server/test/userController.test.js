const request = require('supertest');

const { default: app } = require('../app.js');

beforeAll(() => {});

describe('User controllers tests', () => {
  it('Testing to see if Jest works', () => {
    expect(1).toBe(1);
  });

  it('Gets the test endpoint', async () => {
    const res = await request(app).get('/test');
    console.log(res.text);
    expect(res.status).toBe(200);
  });

  it('Gets the test endpoint', async () => {
    const res = await request(app).get('/notfound');
    console.log(res.text);
    expect(res.status).toBe(404);
  });
});
