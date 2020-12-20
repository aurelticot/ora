import { Conditions } from "../types";
import { Gene } from "./Gene";
import { Species } from "./Species";

export class Individual {
  public readonly id;
  private _fitness = 1;
  private _genome: Gene;
  private _species: Species;

  constructor(id: number) {
    this.id = id;
    this._genome = new Gene();
    this._species = Species.getSpecies(this._genome);
  }

  get species(): Species {
    return this._species;
  }

  get fitness(): number {
    return this._fitness;
  }

  get genome(): Gene {
    return this._genome;
  }

  pair(referenceIndividual: Individual): void {
    this._genome.pair(referenceIndividual.genome);
    this._species = Species.getSpecies(this._genome);
  }

  mutate(): void {
    this._genome.mutate();
    this._species = Species.getSpecies(this._genome);
  }

  evaluate(conditions: Conditions): number {
    this._fitness = Math.abs(
      this._genome.tempTolerance - conditions.temperature.normalizedValue
    );
    return this._fitness;
  }
}
