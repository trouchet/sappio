import log from '#utils/logger';
import {
  getErrorMessage,
  getHttpStatusCode,
  isErrorStatusCode,
  logErrorMessage
} from '../error-handler';

jest.mock('#utils/logger.js');

let result, expectation, data;

describe('utils.error-handler', () => {
  it('must call logErrorMessage', async () => {
    logErrorMessage('Fire!');
    expect(log).toHaveBeenCalled();
  });
  it('must call isErrorStatusCode', async () => {
    result = isErrorStatusCode(200);
    expectation = false;

    expect(result).toEqual(expectation);

    result = isErrorStatusCode(500);
    expectation = true;

    expect(result).toEqual(expectation);
  });
  it('must call isErrorStatusCode', async () => {
    result = getErrorMessage({});
    expectation = {
      message: 'An error occured. We were unable to recover the error message.',
      stack: 'An error occured. We were unable to recover the error stack.',
    };

    expect(result).toStrictEqual(expectation);

    result = getErrorMessage({ message: 'Fire!' });
    expectation = {
      message: 'Fire!',
      stack: 'An error occured. We were unable to recover the error stack.',
    };

    expect(result).toStrictEqual(expectation);

    result = getErrorMessage({ stack: 'Someone turning all air conditioners on! :-(' });
    expectation = {
      message: 'An error occured. We were unable to recover the error message.',
      stack: 'Someone turning all air conditioners on! :-(',
    };

    expect(result).toStrictEqual(expectation);

    result = getErrorMessage({
      message: 'Fire!',
      stack: 'Someone turning all air conditioners on! :-(',
    });
    expectation = {
      message: 'Fire!',
      stack: 'Someone turning all air conditioners on! :-(',
    };

    expect(result).toStrictEqual(expectation);
  });
  it('must call logErrorMessage', async () => {
    data = {
      error: {status: 500},
      response: {},
    };
    
    result = getHttpStatusCode(data);
    expectation = 500;
    
    expect(result).toEqual(expectation);

    data = { 
      error: {status: 200}, 
      response: {statusCode: 500},
    };
    
    result = getHttpStatusCode(data);
    expectation = 500;
    
    expect(result).toEqual(expectation);

    data = {};
    
    result = getHttpStatusCode(data);
    expectation = 500;
    
    expect(result).toEqual(expectation);
  });
  
});
