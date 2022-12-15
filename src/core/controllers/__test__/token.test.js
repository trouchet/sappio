import {
  mockRequest,
  mockResponse,
  mockNext,
} from "../../../utils/interceptor";

import { getToken } from "../token";

describe("token", () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it("should call mocked log for invalid from scaler", async () => {
    let req = mockRequest();
    const res = mockResponse();
    let next = mockNext();

    await getToken(req, res, next);

    expect(res.send).toHaveBeenCalledTimes(1);
    expect(res.send.mock.calls.length).toBe(1);
  });
});
