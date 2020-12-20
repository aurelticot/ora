import { ConfigurationControlValues, ConditionsControlValues } from "types";
import {
  defaultCrossoverRate,
  defaultMutationRate,
  defaultUpdateRate,
  defaultNbIndividuals,
  Conditions,
  minTemperature,
  maxTemperature,
  normalizeTemperature,
} from "lib/evolution";

export const getConfigurationControlValues = (): ConfigurationControlValues => {
  const extractedConfiguration = window.localStorage.getItem("configuration");

  return extractedConfiguration
    ? (JSON.parse(extractedConfiguration) as ConfigurationControlValues)
    : {
        nbIndividuals: defaultNbIndividuals,
        updateRate: defaultUpdateRate,
        crossoverRate: defaultCrossoverRate,
        mutationRate: defaultMutationRate,
      };
};

export const getConditionsControlValues = (): ConditionsControlValues => {
  const extractedConditions = window.localStorage.getItem("conditions");

  return extractedConditions
    ? (JSON.parse(extractedConditions) as ConditionsControlValues)
    : {
        temperature: 20,
      };
};

export const saveConfigurationControlValues = (
  configuration: ConfigurationControlValues
): void => {
  window.localStorage.setItem("configuration", JSON.stringify(configuration));
};

export const saveConditionsControlValues = (
  conditions: ConditionsControlValues
): void => {
  window.localStorage.setItem("conditions", JSON.stringify(conditions));
};

export const getConditionsFromConditionsValues = (
  conditionsControlValues: ConditionsControlValues
): Conditions => {
  return {
    temperature: {
      value: conditionsControlValues.temperature,
      normalizedValue: normalizeTemperature(
        conditionsControlValues.temperature,
        minTemperature,
        maxTemperature
      ),
    },
  };
};
