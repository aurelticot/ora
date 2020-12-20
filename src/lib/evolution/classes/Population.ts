import { Conditions } from "../types";
import { Individual } from "./Individual";
import { defaultNbIndividuals } from "../constants";

const select = (individuals: Individual[]): Individual => {
  const size = individuals.length;
  let index1 = Math.round(Math.random() * size) - 1;
  index1 = index1 < 0 ? 0 : index1;
  let index2 = Math.round(Math.random() * size) - 1;
  index2 = index2 < 0 ? 0 : index2;
  return individuals[index1].fitness < individuals[index2].fitness
    ? individuals[index1]
    : individuals[index2];
};

const crossover = (
  crossedBatch: Individual[],
  referenceBatch: Individual[],
  crossoverRate: number
): void => {
  crossedBatch.forEach((individual) => {
    if (Math.random() < crossoverRate) {
      const parentIndividu = select(referenceBatch);
      individual.pair(parentIndividu);
    }
  });
};

const mutate = (mutatedBatch: Individual[], mutationRate: number) => {
  mutatedBatch.forEach((individual) => {
    if (Math.random() < mutationRate) {
      individual.mutate();
    }
  });
};

export class Population {
  private _individuals: Individual[];

  constructor(size = defaultNbIndividuals) {
    this._individuals = [...Array(size).keys()].map((index) => {
      return new Individual(index + 1);
    });
  }

  get individuals(): Individual[] {
    return this._individuals;
  }

  evaluate(conditions: Conditions): void {
    this._individuals.forEach((individual) => {
      individual.evaluate(conditions);
    });
  }

  optimize(crossoverRate: number, mutationRate: number): void {
    this._individuals.sort((a, b) => a.fitness - b.fitness);
    const nbIndividuals = this._individuals.length;
    const tierSize = Math.round(nbIndividuals / 3);
    const tierA = this._individuals.slice(0, tierSize + 1);
    const tierB = this._individuals.slice(tierSize + 1, 2 * tierSize + 1);
    crossover(tierB, tierA, crossoverRate);
    const tierC = this._individuals.slice(2 * tierSize + 1, nbIndividuals + 1);
    crossover(tierC, tierB, crossoverRate);
    mutate(tierC, mutationRate);
    this._individuals = [...tierA, ...tierB, ...tierC];
  }

  updateSize(newSize: number): void {
    const currentSize = this._individuals.length;
    if (newSize < currentSize) {
      // remove some individus
      this._individuals = [
        ...[...this._individuals]
          .sort((a, b) => a.id - b.id)
          .slice(0, newSize + 1),
      ];
    }
    if (newSize > currentSize) {
      // add some individus
      const newIndividus = [...Array(newSize - currentSize).keys()].map(
        (index) => {
          return new Individual(currentSize + index + 1);
        }
      );
      this._individuals = [...this._individuals, ...newIndividus];
    }
  }
}
