import app from '../app';
import startServer from '../server';

jest.mock("../app.js");

let result, expectation;

describe('server', () => {
  beforeEach(
    () => {
      jest.resetAllMocks();
      jest.clearAllMocks();
    }
  ); 
  it('call mocked log once', async () => {
    result = startServer(3000);
    expectation = 1;

    expect(app).toHaveBeenCalled(expectation);
  });
});
