import { parseExpressApp } from "express-route-parser";
import request from "supertest"
import app from "../app"

const availableRoutes = parseExpressApp(app)

// Use the app object in your tests
describe('API', () => {
  it("must return available routes'", async () => {
    const res = await request(app).get('/all');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual(availableRoutes);
  });
});