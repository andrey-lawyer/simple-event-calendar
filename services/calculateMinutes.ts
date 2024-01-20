export const calculateMinutes = (hours: string, minutes: string) => {
  return parseInt(hours) * 60 + parseInt(minutes);
};

export const convertMinutesToTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60) + 8;
  const minutes = totalMinutes % 60;

  return {
    hours: hours.toString(),
    minutes: minutes.toString(),
  };
};

export const convertDurationToTime = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return {
    hours: hours.toString(),
    minutes: minutes.toString(),
  };
};
