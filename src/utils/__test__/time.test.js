import { 
  timeScaler, 
  convertTimeDouble, 
  getTimestampTimezone
} from "../time.js";
import { log } from "../logger.js";

const max_scaler = 60 * 60 * 24 * 7 * 30 * 12;

jest.mock("../logger.js");

describe("time", () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
  });

  it("should call mocked log for invalid from scaler", () => {
    convertTimeDouble(1, "minuteS", "second");

    expect(log).toHaveBeenCalled();
  });

  it("should call mocked log for invalid to scaler", () => {
    convertTimeDouble(1, "minute", "secondS");

    expect(log).toHaveBeenCalled();
  });

  it("should call mocked log for string value", () => {
    convertTimeDouble('42', "minute", "second");

    expect(log).toHaveBeenCalled();
  });

  it("should call mocked log for negative nummeric value", () => {
    convertTimeDouble(-42, "minute", "second");

    expect(log).toHaveBeenCalled();
  });

  it("should call mocked log for nummeric from", () => {
    convertTimeDouble(1, 42, "second");

    expect(log).toHaveBeenCalled();
  });

  it("should call mocked log for nummeric to", () => {
    convertTimeDouble(1, "minute", 42);

    expect(log).toHaveBeenCalled();
  });

  it("should convert minute to second", () => {
    const value = 1;
    const expected_value = 60;
    const from_unit = "minute";
    const to_unit = "second";

    const converted_value = convertTimeDouble(1, from_unit, to_unit);

    expect(converted_value).toBe(expected_value);
  });
  
  it("should convert seconds to minutes", () => {
    const value = 60;
    const expected_value = 1;
    const from_unit = "second";
    const to_unit = "minute";

    const converted_value = convertTimeDouble(value, from_unit, to_unit);
    
    expect(converted_value).toBe(expected_value);
  });

  it("should convert year to second", () => {
    const value = 1;
    const expected_value = max_scaler;
    const from_unit = "year";
    const to_unit = "second";

    const converted_value = convertTimeDouble(value, from_unit, to_unit);
    
    expect(converted_value).toBe(expected_value);
  });

  it("should convert second to year", () => {
    const value = 1;
    const expected_value = 1 / max_scaler;
    const from_unit = "second";
    const to_unit = "year";

    const converted_value = convertTimeDouble(value, from_unit, to_unit);
    
    expect(converted_value).toBe(expected_value);
  });
  
  it("should convert second to second", () => {
    const value = 1;
    const expected_value = value;
    const from_unit = "second"
    const to_unit = "second";

    const converted_value = convertTimeDouble(value, from_unit, to_unit);
    
    expect(converted_value).toBe(expected_value);
  });
});
