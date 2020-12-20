import React, { useReducer } from "react";
import { Evolution, EvolutionEvent, Population } from "lib/evolution";
import {
  getConditionsControlValues,
  getConditionsFromConditionsValues,
  getConfigurationControlValues,
  saveConditionsControlValues,
  saveConfigurationControlValues,
} from "utils";
import {
  EvolutionContextValue,
  EvolutionContextState,
  EvolutionActionType,
  EvolutionAction,
} from "types";

const initialConfiguration = getConfigurationControlValues();
const initialConditions = getConditionsControlValues();

const evolution = new Evolution(initialConfiguration.nbIndividuals);
evolution.conditions = getConditionsFromConditionsValues(initialConditions);
evolution.crossoverRate = initialConfiguration.crossoverRate;
evolution.mutationRate = initialConfiguration.mutationRate;
evolution.updateRate = initialConfiguration.updateRate;

const initialContextState: EvolutionContextState = {
  population: evolution.population,
  isRunning: false,
  conditions: initialConditions,
  configuration: initialConfiguration,
};

const addNewPopulationListener = (
  listener: (population: Population) => void
): void => {
  evolution.addListener(EvolutionEvent.NewPopulation.toString(), listener);
};

export const EvolutionContext = React.createContext<EvolutionContextValue>({
  dispatch: () => {},
  addNewPopulationListener,
  ...initialContextState,
});

const evolutionReducer: React.Reducer<
  EvolutionContextState,
  EvolutionAction
> = (state, { type, payload }) => {
  switch (type) {
    case EvolutionActionType.START:
      evolution.start();
      return { ...state, isRunning: evolution.isRunning };
    case EvolutionActionType.STOP:
      evolution.stop();
      return { ...state, isRunning: evolution.isRunning };
    case EvolutionActionType.UPDATE_CONFIGURATION:
      if (!payload?.configuration) {
        return state;
      }
      evolution.crossoverRate = payload.configuration.crossoverRate;
      evolution.mutationRate = payload.configuration.mutationRate;
      evolution.updateRate = payload.configuration.updateRate;
      evolution.populationSize = payload.configuration.nbIndividuals;
      saveConfigurationControlValues(payload.configuration);
      return { ...state, configuration: payload.configuration };
    case EvolutionActionType.UPDATE_CONDITIONS:
      if (!payload?.conditions) {
        return state;
      }
      evolution.conditions = getConditionsFromConditionsValues(
        payload.conditions
      );
      saveConditionsControlValues(payload.conditions);
      return { ...state, conditions: payload.conditions };
    default:
      throw new Error(`Action not supported`);
  }
};

export const EvolutionProvider: React.FunctionComponent = (props) => {
  const [state, dispatch] = useReducer(evolutionReducer, initialContextState);

  return (
    <EvolutionContext.Provider
      value={{ dispatch, addNewPopulationListener, ...state }}
    >
      {props.children}
    </EvolutionContext.Provider>
  );
};
