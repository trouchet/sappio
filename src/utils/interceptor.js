export const mockRequest = () => {
  const req = {};

  req.body = jest.fn().mockReturnValue(req);
  req.params = jest.fn().mockReturnValue(req);

  return req;
};

export const mockResponse = () => {
  const res = {};

  res.get = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);

  return res;
};

export const mockNext = () => {
  return jest.fn();
};
