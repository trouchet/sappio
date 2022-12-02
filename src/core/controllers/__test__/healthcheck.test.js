import {
  mockRequest,
  mockResponse,
  mockNext,
} from "../../../utils/interceptor.js";

import pkg from "../../../config/app_info.js";

import { healthCheck } from "../healthcheck.js";

describe("healthcheck", () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it("should call mocked log for invalid from scaler", async () => {
    let req = mockRequest();
    let res = mockResponse();
    let next = mockNext();

    await healthCheck(req, res, next);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls.length).toBe(1);
  });
});
