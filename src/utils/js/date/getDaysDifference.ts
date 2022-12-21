export const getDaysDifference = (start: Date, end: Date) => {
  const difference = end?.getTime() - start?.getTime();
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

  return totalDays;
};
