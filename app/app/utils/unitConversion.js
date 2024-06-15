export const convertSecondsToHours = (seconds) => {
  return new Date(seconds * 1000).toISOString().substr(11, 8);
};
export const convertMetersToKilometers = (meters) => {
  return (meters / 1000).toFixed(2);
};
