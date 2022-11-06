import { log, logger } from "./logger.js";
import { log_message } from "quivero-api/utils/logging/logger.js";

const timeHierarchy = [
  "second",
  "minute",
  "hour",
  "day",
  "week",
  "month",
  "year",
];
const timeScaler = [60, 60, 24, 7, 30, 12];

export const convertTimeDouble = (value, from, to) => {
  const fromIndex = timeHierarchy.indexOf(from);
  const toIndex = timeHierarchy.indexOf(to);
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

  return timeScaler.slice(fromIndex, toIndex).reduce(reduce_fun, value);
};
