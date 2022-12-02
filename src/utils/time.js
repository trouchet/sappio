import { log, log_message } from "./logger.js";
import _ from "lodash";

const timeHierarchy = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "year",
];

export const timeScaler = [60, 60, 24, 7, 30, 12];

export const convertTimeDouble = (value, from, to) => {
  let fromIndex = timeHierarchy.indexOf(from);
  let toIndex = timeHierarchy.indexOf(to);
  const errorMsg = "Item _ITEM_ must belong to list [" + timeHierarchy + "]";

  if (fromIndex === -1) {
    log("error", errorMsg.replace("_ITEM_", from));
  }

  if (toIndex === -1) {
    log("error", errorMsg.replace("_ITEM_", to));
  }

  let reduce_fun = [];
  if (fromIndex >= toIndex) {
    reduce_fun = (a, b) => a * b;
  } else {
    reduce_fun = (a, b) => a / b;
  }

  let scalers = [];
  if (toIndex > fromIndex) {
    scalers = timeScaler.slice(fromIndex, toIndex);
  } else if (toIndex < fromIndex) {
    toIndex = timeScaler.length - toIndex;
    fromIndex = timeScaler.length - fromIndex;

    scalers = _.reverse(timeScaler).slice(fromIndex, toIndex);
  } else {
    return value;
  }

  return scalers.reduce(reduce_fun, value);
};
