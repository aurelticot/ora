export class Gene {
  private _tempTolerance: number;

  constructor(tempTolerance?: number) {
    this._tempTolerance = tempTolerance ? tempTolerance : Math.random();
  }

  get tempTolerance(): number {
    return this._tempTolerance;
  }

  pair(referenceGene: Gene): void {
    this._tempTolerance =
      (this._tempTolerance + referenceGene._tempTolerance) / 2;
  }

  mutate(): void {
    const direction = Math.random() > 0.5 ? 1 : -1;
    const newValue = this._tempTolerance + (direction * Math.random()) / 10;
    this._tempTolerance =
      newValue > 1
        ? 2 - newValue
        : newValue < 0
        ? Math.abs(newValue)
        : newValue;
  }
}
