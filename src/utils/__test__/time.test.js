import { convertTimeDouble } from '../time';
import { raise } from '../logger';

const max_scaler = 60 * 60 * 24 * 7 * 30 * 12;

jest.mock('../logger');

describe('time', () => {
  afterEach(() => {
    // restore the spy created with spyOn
    jest.resetAllMocks();
  });

  it('should call mocked raise for invalid from scaler', () => {
    convertTimeDouble(1, 'minuteS', 'second');

    expect(raise).toHaveBeenCalled();
  });

  it('should call mocked raise for invalid to scaler', () => {
    convertTimeDouble(1, 'minute', 'secondS');

    expect(raise).toHaveBeenCalled();
  });

  it('should call mocked raise for string value', () => {
    convertTimeDouble('42', 'minute', 'second');

    expect(raise).toHaveBeenCalled();
  });

  it('should call mocked raise for negative nummeric value', () => {
    convertTimeDouble(-42, 'minute', 'second');

    expect(raise).toHaveBeenCalled();
  });

  it('should call mocked raise for nummeric from', () => {
    convertTimeDouble(1, 42, 'second');

    expect(raise).toHaveBeenCalled();
  });

  it('should call mocked raise for nummeric to', () => {
    convertTimeDouble(1, 'minute', 42);

    expect(raise).toHaveBeenCalled();
  });

  it('should convert minute to second', () => {
    const value = 1;
    const expected_value = 60;
    const from_unit = 'minute';
    const to_unit = 'second';

    const converted_value = convertTimeDouble(value, from_unit, to_unit);

    expect(converted_value).toBe(expected_value);
  });

  it('should convert seconds to minutes', () => {
    const value = 60;
    const expected_value = 1;
    const from_unit = 'second';
    const to_unit = 'minute';

    const converted_value = convertTimeDouble(value, from_unit, to_unit);

    expect(converted_value).toBe(expected_value);
  });

  it('should convert year to second', () => {
    const value = 1;
    const expected_value = max_scaler;
    const from_unit = 'year';
    const to_unit = 'second';

    const converted_value = convertTimeDouble(value, from_unit, to_unit);

    expect(converted_value).toBe(expected_value);
  });

  it('should convert second to year', () => {
    const value = 1;
    const expected_value = 1 / max_scaler;
    const from_unit = 'second';
    const to_unit = 'year';

    const converted_value = convertTimeDouble(value, from_unit, to_unit);

    expect(converted_value).toBe(expected_value);
  });

  it('should convert second to second', () => {
    const value = 1;
    const expected_value = value;
    const from_unit = 'second';
    const to_unit = 'second';

    const converted_value = convertTimeDouble(value, from_unit, to_unit);

    expect(converted_value).toBe(expected_value);
  });
});
