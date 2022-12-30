import {
  mockRequest,
  mockResponse,
  mockNext
} from '../../../utils/interceptor'

import { healthCheck } from '../healthcheck'

describe('healthcheck', () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks()
  })

  it('should call mocked log for invalid from scaler', async () => {
    const req = mockRequest()
    const res = mockResponse()
    const next = mockNext()

    await healthCheck(req, res, next)

    expect(res.send).toHaveBeenCalledTimes(1)
    expect(res.send.mock.calls.length).toBe(1)
  })
})
