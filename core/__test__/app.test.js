import request from 'supertest'
import app from '../app.js'

describe('app', () => {
  test("test root route", done => {
    request(app)
      .get("/")
      .expect("Content-Type", 'text/html; charset=utf-8')
      .expect(200, done);
  });
})


