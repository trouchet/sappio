import log from './logger.js';
import _ from 'lodash';

const timeHierarchy = ['second', 'minute', 'hour', 'day', 'week', 'month', 'year'];

export const timeScaler = [60, 60, 24, 7, 30, 12];

const errorMsg = `Item _ITEM_ must belong to list [ ${timeHierarchy} ]`;

export const convertTimeDouble = (value, from_unit_str, to_unit_str) => {
  if (typeof value !== 'number' || value < 0) {
    log('error', 'Value must be a positive number!');
    return;
  }

  if (typeof from_unit_str !== 'string' || typeof to_unit_str !== 'string') {
    log('error', `From and to unit strings must belong to list [ ${timeHierarchy} ]`);
    return;
  }

  let fromIndex = timeHierarchy.indexOf(from_unit_str);
  let toIndex = timeHierarchy.indexOf(to_unit_str);

  if (fromIndex === -1) {
    log('error', errorMsg.replace('_ITEM_', from_unit_str));
  } else if (toIndex === -1) {
    log('error', errorMsg.replace('_ITEM_', to_unit_str));
  } else {
    let reduce_fun = [];
    if (fromIndex > toIndex) {
      reduce_fun = (a, b) => a * b;
    } else {
      reduce_fun = (a, b) => a / b;
    }

    let scalers = [];
    if (toIndex > fromIndex) {
      scalers = timeScaler.slice(fromIndex, toIndex);
    } else if (toIndex < fromIndex) {
      const reversedtimeScaler = _.reverse([...timeScaler]);

      toIndex = timeScaler.length - toIndex;
      fromIndex = timeScaler.length - fromIndex;

      scalers = reversedtimeScaler.slice(fromIndex, toIndex);
    } else {
      return value;
    }

    return scalers.reduce(reduce_fun, value);
  }
};
