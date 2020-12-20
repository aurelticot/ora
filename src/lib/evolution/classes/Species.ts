import { Gene } from "./Gene";
import { SpeciesColor } from "../types";
import {
  maxTemperatureThreshold,
  minTemperatureThreshold,
  maxTemperature,
  minTemperature,
} from "../constants";
import { normalizeTemperature } from "../utils";

export abstract class Species {
  public readonly color: SpeciesColor;
  constructor(color: SpeciesColor) {
    this.color = color;
  }

  public static getSpecies = (genome: Gene): Species => {
    const normalizedMax = normalizeTemperature(
      maxTemperatureThreshold,
      minTemperature,
      maxTemperature
    );
    const normalizedMin = normalizeTemperature(
      minTemperatureThreshold,
      minTemperature,
      maxTemperature
    );
    return genome.tempTolerance >= normalizedMax
      ? new RedSpecies()
      : genome.tempTolerance <= normalizedMin
      ? new BlueSpecies()
      : new GreenSpecies();
  };
}

export class GreenSpecies extends Species {
  constructor() {
    super(SpeciesColor.Green);
  }
}

export class BlueSpecies extends Species {
  constructor() {
    super(SpeciesColor.Blue);
  }
}

export class RedSpecies extends Species {
  constructor() {
    super(SpeciesColor.Red);
  }
}
