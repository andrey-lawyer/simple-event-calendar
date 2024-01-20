export const formatNumber = (value: number) => {
  const formattedValue = value.toString().padStart(2, "0");
  return formattedValue;
};
