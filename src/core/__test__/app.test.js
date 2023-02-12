import request from 'supertest';
import log from '../../utils/logger';
import app from '../app';

jest.mock("../utils/logger.js");

describe('app', () => {
  it('test route /', async () => {
    const expectedStatus = 200;
    const expectedContentType = 'text/html; charset=utf-8';

    const response = await request(app).get('/');
    
    expect(response.statusCode).toBe(expectedStatus);
    expect(response.header['content-type']).toEqual(expectedContentType);
    expect(log).toHaveBeenCalled(1);
  });
});
