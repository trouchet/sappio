import { timeScaler, convertTimeDouble } from '../time.js'
import { log } from '../logger.js'

const scaler_ = 60*60*24*7*30*12;

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});

describe("time", () => {
  it("should convert minute to second", () => {
    const value = convertTimeDouble(1, 'minute', 'second');

    expect(value).toBe(60);
  });

  it("should convert year to second", () => {
    const value = convertTimeDouble(1, 'year', 'second');
    expect(value).toBe(scaler_);
  });

  it("should convert second to year", () => {
    const value = convertTimeDouble(1, 'second', 'year');
    expect(value).toBeCloseTo(1/scaler_);
  });

});
