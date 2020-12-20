export const normalizeTemperature = (
  temperature: number,
  minTemperature: number,
  maxTemperature: number
): number => {
  return (temperature - minTemperature) / (maxTemperature - minTemperature);
};

export const denormalizeTemperature = (
  normalizedTemperature: number,
  minTemperature: number,
  maxTemperature: number
): number => {
  return (
    normalizedTemperature * (maxTemperature - minTemperature) + minTemperature
  );
};
