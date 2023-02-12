import { request } from "supertest";
import router from "../root";

describe(
    'routes',
    () => {
        it('test route /', async () => {
            const expectedStatus = 200;

            const response = await request(router).get('/healthcheck');

            expect(response.statusCode).toBe(expectedStatus);
            expect(response.header['content-type']).toEqual(expectedJSONProperties);
        });
        it('test route /healthcheck', async () => {
            const expectedStatus = 200;
            const expectedJSONProperties = [
                'uptime', 'message', 'now', 'version'
            ];

            const response = await request(router).get('/healthcheck');

            expect(response.statusCode).toBe(expectedStatus);
            expect(response.header['content-type']).toEqual(expectedJSONProperties);
        });
        it('test route /token', async () => {
            const expectedStatus = 200;
            const expectedJSONProperties = [ 'jwt_token', 'payload' ];

            const response = await request(router).get('/token');

            expect(response.statusCode).toBe(expectedStatus);
            expect(response.header['content-type']).toEqual(expectedJSONProperties);
        });
    }
)
