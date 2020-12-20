import { Individual } from "./Individual";
import { Population } from "./Population";
import { Conditions, EvolutionEvent } from "../types";
import {
  defaultCrossoverRate,
  defaultMutationRate,
  defaultUpdateRate,
} from "../constants";
import { EventEmitter } from "events";

export class Evolution extends EventEmitter {
  private _population: Population;
  private _timer?: NodeJS.Timeout;
  private _updateRate = defaultUpdateRate;
  private _crossoverRate = defaultCrossoverRate;
  private _mutationRate = defaultMutationRate;
  private _conditions?: Conditions;

  constructor(populationSize: number) {
    super();
    this._population = new Population(populationSize);
  }

  get population(): Population {
    return this._population;
  }

  get individuals(): Individual[] {
    return this._population.individuals;
  }

  get isRunning(): boolean {
    return !!this._timer;
  }

  set conditions(conditions: Conditions) {
    this._conditions = conditions;
  }

  set crossoverRate(crossoverRate: number) {
    this._crossoverRate = crossoverRate ? crossoverRate : defaultCrossoverRate;
  }

  set mutationRate(mutationRate: number) {
    this._mutationRate = mutationRate ? mutationRate : defaultMutationRate;
  }

  set populationSize(newPopulationSize: number) {
    this._population.updateSize(newPopulationSize);
  }

  set updateRate(updateRate: number) {
    this._updateRate = updateRate ? updateRate : defaultUpdateRate;
    if (!this._timer) {
      return;
    }
    this.stop();
    this.start();
  }

  get updateRate(): number {
    return this._updateRate;
  }

  start(): void {
    if (this._timer) {
      return;
    }
    this._timer = setInterval(() => {
      if (!this._conditions) {
        return;
      }
      this._population.evaluate(this._conditions);
      this._population.optimize(this._crossoverRate, this._mutationRate);
      this.emit(EvolutionEvent.NewPopulation.toString(), this._population);
    }, this._updateRate);
  }

  stop(): void {
    if (!this._timer) {
      return;
    }
    clearInterval(this._timer);
    this._timer = undefined;
  }
}
