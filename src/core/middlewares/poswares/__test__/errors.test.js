import error_middlewares, { errorFormatConfig } from '../errors';
import { assert, spy, stub } from 'sinon';
import { getErrorMessage, getHttpStatusCode, logErrorMessage } from '#cutils/error-handler.js'; 

jest.mock('#cutils/error-handler.js');

let error, request, response, next, sendSpy, typeSpy;

const errorHandlerMiddleware = error_middlewares[0];

describe('error-middlewares', () => {
  beforeEach(() => {
    sendSpy = spy();
    typeSpy = stub();

    error = { message: 'Fire!', stack: 'Someone turned all the fans!' };
    request = {};
    errorResponse = spy(); 
    response = {
        status: spy(),
        format: spy(),
        json: spy(),
        type: (type_value) => {
            typeSpy(type_value);
            return {
                send: sendSpy,
            };
        },
    };
    next = spy();
  });
  it('should call log and get error message on sent header', () => {
    response['headersSent'] = true;

    errorHandlerMiddleware(error, request, response, next);
    expect(logErrorMessage).toHaveBeenCalled();
    expect(getErrorMessage).toHaveBeenCalled();

    assert.calledOnce(next);
  });
  it('should call log and get error message on sent header', () => {
    response['headersSent'] = false;

    errorHandlerMiddleware(error, request, response, next);
    
    expect(logErrorMessage).toHaveBeenCalled();
    expect(getErrorMessage).toHaveBeenCalled();
    expect(getHttpStatusCode).toHaveBeenCalled();

    assert.calledOnce(next);
    assert.calledOnce(response.status);
    assert.calledOnce(response.format);
  });
  it('should call sinon mocker functions on error configuration', () => {
    const config = errorFormatConfig(response, errorResponse);

    config['application/json']();
    config['default']();

    assert.calledOnce(response.json);
    assert.calledOnce(sendSpy);
  });
});
