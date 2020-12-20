export enum SpeciesColor {
  "Red",
  "Green",
  "Blue",
}

export interface Conditions {
  temperature: ConditionValues;
}

export interface ConditionValues {
  value: number;
  normalizedValue: number;
}

export enum EvolutionEvent {
  "NewPopulation",
}
