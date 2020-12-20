import React, { useEffect, useState } from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Individual, SpeciesColor } from "lib/evolution";
import { useEvolution } from "hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "100%",
  },
  grid: ({ nbIndividuals }: { nbIndividuals: number }) => {
    const gridLength = Math.round(Math.sqrt(nbIndividuals ? nbIndividuals : 1));
    return {
      width: "100%",
      height: "100%",
      display: "grid",
      gridTemplateColumns: `repeat(${gridLength}, [col] ${100 / gridLength}%)`,
      gridTemplateRows: `repeat(${gridLength}, [row] ${100 / gridLength}%)`,
    };
  },
  gridItem: {
    padding: "0",
  },
  green: {
    background: theme.palette.success.main,
  },
  blue: {
    background: theme.palette.info.main,
  },
  red: {
    background: theme.palette.error.main,
  },
}));

export const DisplaySection: React.FunctionComponent<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const [individuals, setIndividuals] = useState<Individual[]>([]);
  const { addNewPopulationListener } = useEvolution();

  useEffect(() => {
    addNewPopulationListener((population) => {
      setIndividuals(population.individuals);
    });
  }, []);

  const classes = useStyles({ nbIndividuals: individuals.length });
  return (
    <Box
      className={`${classes.root} ${props.className ? props.className : ""}`}
    >
      <Box className={classes.grid}>
        {[...individuals]
          .sort((a, b) => a.id - b.id)
          .map((individual) => {
            const colorClass =
              individual.species.color === SpeciesColor.Green
                ? classes.green
                : individual.species.color === SpeciesColor.Blue
                ? classes.blue
                : classes.red;
            return (
              <Box
                key={individual.id}
                className={`${classes.gridItem} ${colorClass}`}
              />
            );
          })}
      </Box>
    </Box>
  );
};
