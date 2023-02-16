import error_middlewares from "../errors"
import sinon from 'sinon';
import { getErrorMessage, getHttpStatusCode, logErrorMessage } from '#cutils/error-handler.js';

jest.mock('#cutils/error-handler.js');

let error, request, response, next;

const errorHandlerMiddleware = error_middlewares[0];

describe('error-middlewares', () => {
  beforeEach(() => {
    error = {'message': "Fire!", "stack": "Someone turned all the fans!"}; 
    request = {}; 
    response = {
        status: sinon.spy(),
        format: sinon.spy(),
        json: sinon.spy(),
        type: sinon.spy(),
    }; 
    next = sinon.spy();
  });
  it('should call log and get error message on sent header', () => {
    response["headersSent"] = true;

    errorHandlerMiddleware(error, request, response, next);
    
    expect(logErrorMessage).toHaveBeenCalled();
    expect(getErrorMessage).toHaveBeenCalled();
    sinon.assert.calledOnce(next);
  });
  it('should call log and get error message on sent header', () => {
    response["headersSent"] = false;

    errorHandlerMiddleware(error, request, response, next);
    
    expect(logErrorMessage).toHaveBeenCalled();
    expect(getErrorMessage).toHaveBeenCalled();
    expect(getHttpStatusCode).toHaveBeenCalled();
    sinon.assert.calledOnce(next);
    sinon.assert.calledOnce(response.status);
    sinon.assert.calledOnce(response.format);
  });
});
