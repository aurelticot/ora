import React from "react";
import { Population } from "lib/evolution";

export interface ConfigurationControlValues {
  nbIndividuals: number;
  updateRate: number;
  mutationRate: number;
  crossoverRate: number;
}

export interface ConditionsControlValues {
  temperature: number;
}

export interface ControlValues {
  configuration: ConfigurationControlValues;
  conditions: ConditionsControlValues;
}

export interface EvolutionContextState {
  population: Population;
  isRunning: boolean;
  conditions: ConditionsControlValues;
  configuration: ConfigurationControlValues;
}

export interface EvolutionContextValue extends EvolutionContextState {
  dispatch: React.Dispatch<EvolutionAction>;
  addNewPopulationListener: (
    listener: (oppulation: Population) => void
  ) => void;
}

export enum EvolutionActionType {
  "START",
  "STOP",
  "UPDATE_CONDITIONS",
  "UPDATE_CONFIGURATION",
}

export interface EvolutionAction {
  type: EvolutionActionType;
  payload?: {
    conditions?: ConditionsControlValues;
    configuration?: ConfigurationControlValues;
  };
}
