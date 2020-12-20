import { useContext } from "react";
import { EvolutionContext } from "contexts";
import { EvolutionContextValue } from "types";

export const useEvolution = (): EvolutionContextValue => {
  return useContext(EvolutionContext);
};
