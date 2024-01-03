import { parseExpressApp } from 'express-route-parser';
import request from 'supertest';
import app from '#core/app';
import jwt_decode from 'jwt-decode';

const superapp = request(app);
const availableRoutes = parseExpressApp(app);

// Use the app object in your tests
describe('app', () => {
  it('test route /', async () => {
    const expectedStatus = 200;
    const response = await superapp.get('/');

    expect(response.status).toBe(expectedStatus);
    expect(response.header['content-type']).toEqual('text/html; charset=utf-8');
  });
  it('test route /healthcheck', async () => {
    const expectedStatus = 200;
    const expectedJSONProperties = ['start', 'now', 'uptime', 'message', 'version'];

    const response = await superapp.get('/healthcheck');

    const jsonBody = JSON.parse(response.text);

    expect(response.status).toStrictEqual(expectedStatus);
    expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
    expect(Object.keys(jsonBody)).toStrictEqual(expectedJSONProperties);
  });
  it('test route /token', async () => {
    const expectedStatus = 200;
    const expectedJSONProperties = ['iat', 'exp', 'jwtToken'];
    const payload = { key: 'value' };

    const response = await superapp.post('/token').send(payload);

    const jsonBody = JSON.parse(response.text);

    expect(response.status).toBe(expectedStatus);
    expect(response.header['content-type']).toBe('application/json; charset=utf-8');
    expect(Object.keys(jsonBody)).toStrictEqual(expectedJSONProperties);
    
    // FIXME: Check if the token is valid 
    // expect(jwt_decode(jsonBody.jwtToken)).toStrictEqual(payload);
  });
  it("must return available routes'", async () => {
    const res = await superapp.get('/all');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toStrictEqual(availableRoutes);
  });
});
