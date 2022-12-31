import request from "supertest";
import app from "../app";

/**
 * Mocked Express Request object.
 */
let req;

/**
 * Mocked Express Response object.
 */
let res;

/**
 * Mocked Express Next function.
 */
const next = jest.fn();

describe("app", () => {
  /**
   * Reset the `req` and `res` object before each test is ran.
   */
  beforeEach(() => {
    req = {
      params: {},
      body: {},
    };

    res = {
      data: null,
      code: null,
      status(status) {
        this.code = status;
        return this;
      },
      send(payload) {
        this.data = payload;
      },
    };

    next.mockClear();
  });

  it("test route /", async () => {
    const expectedStatus = 200;
    const expectedContentType = "text/html; charset=utf-8";

    const response = await request(app).get("/");

    expect(response.statusCode).toBe(expectedStatus);
    expect(response.header["content-type"]).toEqual(expectedContentType);
  });
});
