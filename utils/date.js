export const getTimestampTimezone = (timestamp) => {
  return new Date(timestamp).getTimezoneOffset();
};
